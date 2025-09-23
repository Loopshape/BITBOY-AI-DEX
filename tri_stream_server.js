// tri_stream_server.js
const http = require("http");
const { spawn } = require("child_process");
const url = require("url");
const path = require("path");

const PORT = 8080;
const AI_BIN = path.resolve(process.env.HOME, "bin/ai");

http.createServer((req, res) => {
    let parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === "/ai") {
        const userPrompt = parsedUrl.query.prompt || "";
        if (!userPrompt) {
            res.writeHead(400, { "Content-Type": "text/plain" });
            res.end("Error: missing ?prompt=");
            return;
        }

        // SSE headers
        res.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        });
        res.write(`event: init\ndata: Starting Triumvirate for prompt: ${userPrompt}\n\n`);

        const aiProc = spawn(AI_BIN, [userPrompt], {
            env: { ...process.env, PATH: process.env.PATH },
        });

        // Stream stdout
        aiProc.stdout.on("data", (data) => {
            data.toString().split(/\r?\n/).forEach((line) => {
                if (line.trim() !== "") {
                    res.write(`data: ${line}\n\n`);
                }
            });
        });

        // Stream stderr as error events
        aiProc.stderr.on("data", (data) => {
            data.toString().split(/\r?\n/).forEach((line) => {
                if (line.trim() !== "") {
                    res.write(`event: error\ndata: ${line}\n\n`);
                }
            });
        });

        aiProc.on("close", (code) => {
            res.write(`event: end\ndata: Triumvirate finished with code ${code}\n\n`);
            res.end();
        });
    }

    else if (parsedUrl.pathname === "/" || parsedUrl.pathname === "/index.html") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`
<!doctype html>
<html>
<head><title>Triumvirate Agent Live</title></head>
<body>
  <h1>Triumvirate Mind (Web UI, Live Stream)</h1>
  <form onsubmit="launch(event)">
    <input type="text" id="prompt" size="60" placeholder="Enter request" />
    <button type="submit">Run</button>
  </form>
  <pre id="output"></pre>
  <script>
    function launch(e) {
      e.preventDefault();
      document.getElementById("output").innerText = "";
      const prompt = document.getElementById("prompt").value;
      const evtSource = new EventSource("/ai?prompt=" + encodeURIComponent(prompt));
      evtSource.onmessage = (e) => {
        document.getElementById("output").innerText += e.data + "\\n";
      };
      evtSource.addEventListener("error", (e) => {
        document.getElementById("output").innerText += "[ERR] " + e.data + "\\n";
      });
      evtSource.addEventListener("end", (e) => {
        document.getElementById("output").innerText += "\\n--- DONE ---\\n";
        evtSource.close();
      });
    }
  </script>
</body>
</html>`);
    }

    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
    }
}).listen(PORT, () => {
    console.log(`Triumvirate live stream server at http://localhost:${PORT}/`);
});
