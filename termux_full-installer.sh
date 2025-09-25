#!/usr/bin/env bash
# termux_ai_venv_node_es.sh
# Fully Termux-compatible installer: Python venv + Node + SSE + Node frontend + Ollama aliases + local ai script                                          
set -euo pipefail
IFS=$'\n\t'

# ------------------------
# 0. Safety + PATH
# ------------------------
if [ "$(id -u)" -eq 0 ]; then
  echo "Run as normal Termux user, not root."
  exit 1
fi

PROJECT_DIR="$HOME/termux_ai"
mkdir -p "$PROJECT_DIR"
cd "$PROJECT_DIR"

# Add useful directories to PATH
export PATH="$HOME/.local/bin:$HOME/.npm-global/bin:$HOME/.bin:$PATH"
export PATH="$PATH:/data/data/com.termux/files/usr/bin"

# ------------------------
# 1. Update Termux packages
# ------------------------
echo "=== Updating Termux packages ==="
pkg update -y
pkg upgrade -y

echo "=== Installing required packages ==="
pkg install -y curl wget git python nodejs clang make openssh

# ------------------------
# 2. Python venv
# ------------------------
python3 -m venv ./.env
source ./.env/bin/activate

pip install --upgrade pip setuptools wheel
pip install requests aiohttp flask

echo "Python venv activated at $PROJECT_DIR/.env"

# ------------------------
# 3. Node packages (Termux-safe)
# ------------------------
npm install -g pnpm vite serve node-fetch

# ------------------------
# 4. Ollama (optional)
# ------------------------
ARCH=$(uname -m || true)
OSNAME=$(uname -s || true)
OLLAMA_OK=false

if [ "$OSNAME" = "Linux" ] && ([ "$ARCH" = "x86_64" ] || [ "$ARCH" = "amd64" ]); then
  if ! command -v brew >/dev/null 2>&1; then
    echo "Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" </dev/null || true
    eval "$($HOME/.linuxbrew/bin/brew shellenv)" || true
  fi

  if command -v brew >/dev/null 2>&1; then
    brew update || true
    echo "Attempting to install ollama..."
    if brew install ollama; then
      OLLAMA_OK=true
    else
      echo "brew install ollama failed."
    fi
  fi
else
  echo "Skipping Ollama: OS=$OSNAME ARCH=$ARCH — likely unsupported."
fi

# ------------------------
# 5. Ollama model aliases
# ------------------------
OLLAMA_MODELS_DIR="$HOME/.ollama/models"
mkdir -p "$OLLAMA_MODELS_DIR"

if $OLLAMA_OK && command -v ollama >/dev/null 2>&1; then
  echo "Setting up Ollama model aliases..."

  [ -d "$OLLAMA_MODELS_DIR/deepseek-r1:1.5b" ] && cp -r "$OLLAMA_MODELS_DIR/deepseek-r1:1.5b" "$OLLAMA_MODELS_DIR/2244-1" || echo "Warning: deepseek-r1:1.5b not found"
  [ -d "$OLLAMA_MODELS_DIR/gemma3:1b" ] && cp -r "$OLLAMA_MODELS_DIR/gemma3:1b" "$OLLAMA_MODELS_DIR/core" || echo "Warning: gemma3:1b not found"
else
  echo "Ollama not installed or not supported — model aliasing skipped"
fi

# ------------------------
# 6. Python cooperative SSE server
# ------------------------
COOP_DIR="$PROJECT_DIR/ollama_coop"
mkdir -p "$COOP_DIR"

cat > "$COOP_DIR/coop_sse.py" <<'PYEOF'
#!/usr/bin/env python3
import asyncio
import json
import os
import shutil
from aiohttp import web

OUTPUT_DIR = os.path.join(os.getcwd(), "out")
os.makedirs(OUTPUT_DIR, exist_ok=True)

OLLAMA_AVAILABLE = shutil.which("ollama") is not None

def to_base5(n):
    s = ""
    if n == 0: return "0"
    while n > 0:
        s = str(n % 5) + s
        n //= 5
    return s

async def run_model(model_name, prompt, index, queue=None):
    transcript = []
    if not OLLAMA_AVAILABLE:
        for word in (prompt + " [fallback reply]").split():
            await asyncio.sleep(0.01)
            transcript.append(word)
            if queue: await queue.put(word)
            yield word
    else:
        proc = await asyncio.create_subprocess_exec(
            "ollama", "run", model_name, "--prompt", prompt,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.STDOUT
        )
        async for raw in proc.stdout:
            token = raw.decode().strip()
            transcript.append(token)
            if queue: await queue.put(token)
            yield token
        await proc.wait()

    meta = {"index": index, "model": model_name, "tokens_total": len(transcript)}
    txt_path = os.path.join(OUTPUT_DIR, f"out{to_base5(index)}_{model_name}.txt")
    json_path = os.path.join(OUTPUT_DIR, f"out{to_base5(index)}_{model_name}.json")
    with open(txt_path, "w") as f: f.write("\n".join(transcript))
    with open(json_path, "w") as f: json.dump(meta, f, indent=2)

async def sse_handler(request):
    resp = web.StreamResponse(status=200, reason='OK', headers={
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    })
    await resp.prepare(request)

    queue = asyncio.Queue()
    prompt_ds = request.query.get("prompt_ds", "Hello from 2244-1")
    prompt_gem = request.query.get("prompt_gem", "Hello from gemma3:1b")

    async def task_ds():
        async for token in run_model("2244-1", prompt_ds, 0, queue):
            await resp.write(f"event: token_ds\ndata: {token}\n\n".encode())
        await queue.put(None)

    async def task_gem():
        buffer = []
        while True:
            token = await queue.get()
            if token is None: break
            buffer.append(token)
            incremental_prompt = prompt_gem + " " + " ".join(buffer)
            async for t in run_model("gemma3:1b", incremental_prompt, 1):
                await resp.write(f"event: token_gem\ndata: {t}\n\n".encode())

    await asyncio.gather(task_ds(), task_gem())
    await resp.write_eof()
    return resp

app = web.Application()
app.router.add_get('/stream', sse_handler)

if __name__ == "__main__":
    web.run_app(app, port=8080)
PYEOF

chmod +x "$COOP_DIR/coop_sse.py"

# ------------------------
# 7. Node ES module frontend
# ------------------------
FRONT_DIR="$PROJECT_DIR/ollama_front"
mkdir -p "$FRONT_DIR/public"

cat > "$FRONT_DIR/index.mjs" <<'JSEOF'
import express from "express";
import fetch from "node-fetch";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(process.cwd(), "public")));

app.get("/stream-proxy", async (req, res) => {
  const url = "http://localhost:8080/stream?prompt_ds=Hi_DS&prompt_gem=Hi_Gem";
  const response = await fetch(url);
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    res.write(decoder.decode(value));
  }
  res.end();
});

app.listen(PORT, () => console.log(`Node ES module frontend running on http://localhost:${PORT}`));
JSEOF

cat > "$FRONT_DIR/public/index.html" <<'HTML'
<!doctype html>
<html>
  <head><meta charset="utf-8"><title>Ollama Coop Front</title></head>
  <body>
    <h1>Ollama Coop Front</h1>
    <pre id="log"></pre>
    <script>
      const log = document.getElementById('log');
      const es = new EventSource('/stream-proxy');
      es.addEventListener('token_ds', e => log.textContent += '[DS] ' + e.data + '\n');
      es.addEventListener('token_gem', e => log.textContent += '[GEM] ' + e.data + '\n');
      es.onerror = e => console.log('SSE error', e);
    </script>
  </body>
</html>
HTML

# ------------------------
# 8. Copy ./ai to /usr/local/bin and ~/.bin
# ------------------------
mkdir -p "$HOME/.bin"
if [ -f "./ai" ]; then
  cp ./ai /usr/local/bin/ || echo "Warning: /usr/local/bin not writable"
  cp ./ai "$HOME/.bin/"
  chmod +x /usr/local/bin/ai "$HOME/.bin/ai" || true
  echo "Copied ./ai to /usr/local/bin and ~/.bin"
else
  echo "Warning: ./ai not found in repo folder"
fi

# ------------------------
# 9. Completion message
# ------------------------
echo ""
echo "=== Installer finished ==="
echo ""
echo "Commands:"
echo "  1) Activate venv:"
echo "       source $PROJECT_DIR/.env/bin/activate"
echo "  2) Start cooperative SSE server:"
echo "       python3 $COOP_DIR/coop_sse.py"
echo "  3)
