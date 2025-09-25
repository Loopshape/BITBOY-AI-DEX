import subprocess
import asyncio
import json
import os

# ------------------------
# Paths & model names
# ------------------------
MODELS = ["2244-1", "gemma3:1b"]
OUTPUT_DIR = "out"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# mod8 -> base5 helper
def to_base5(n):
    if n==0: return "0"
    s=""
    while n>0:
        s=str(n%5)+s
        n//=5
    return s

# ------------------------
# Async function to run Ollama model
# ------------------------
async def run_model(model_name, prompt, index):
    out_json = os.path.join(OUTPUT_DIR, f"out{to_base5(index)}_{model_name}.json")
    out_txt = os.path.join(OUTPUT_DIR, f"out{to_base5(index)}_{model_name}.txt")
    cmd = ["ollama", "run", model_name, "--prompt", prompt]
    process = await asyncio.create_subprocess_exec(*cmd, stdout=asyncio.subprocess.PIPE)
    tokens=[]
    transcript=[]
    while True:
        line = await process.stdout.readline()
        if not line:
            break
        text = line.decode("utf-8").strip()
        tokens.append(text)
        transcript.append(text)
        print(f"[{model_name}] {text}")
    meta = {
        "index": index,
        "model": model_name,
        "tokens_total": len(" ".join(tokens).split()),
    }
    with open(out_txt, "w") as f: f.write("\n".join(transcript))
    with open(out_json, "w") as f: json.dump(meta, f, indent=2)
    return transcript

# ------------------------
# Cooperative run
# ------------------------
async def coop_run():
    prompt_ds = "Hello from deepseek-r1:1.5b"
    prompt_gem = "Hello from gemma3:1b"
    # run both models concurrently
    await asyncio.gather(
        run_model("2244-1", prompt_ds, 0),
        run_model("gemma3:1b", prompt_gem, 1)
    )

if __name__=="__main__":
    asyncio.run(coop_run())
