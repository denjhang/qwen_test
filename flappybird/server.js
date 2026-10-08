// 本地服务器: 静态服务 flappy.html + 接收游戏操作记录 POST /record -> recordings/*.json
// 用法: node server.js  (默认 http://127.0.0.1:8791)
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const REC_DIR = path.join(ROOT, "recordings");
fs.mkdirSync(REC_DIR, { recursive: true });

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".ogg": "audio/ogg",
  ".md": "text/plain; charset=utf-8",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8"
};

http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/record") {
    let body = "", size = 0, ok = true;
    req.on("data", c => { size += c.length; if (size <= 2e6) body += c; else ok = false; });
    req.on("end", () => {
      if (!ok) { res.writeHead(413); res.end("payload too large"); return; }
      let data;
      try { data = JSON.parse(body); } catch (e) { res.writeHead(400); res.end("bad json"); return; }
      const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
      const name = "run-" + (data.isAI ? "ai-" : "") + stamp + "-score" + (data.score | 0) + ".json";
      fs.writeFileSync(path.join(REC_DIR, name), JSON.stringify(data, null, 1));
      console.log("saved " + name + "  score=" + (data.score | 0) +
                  "  flaps=" + ((data.flaps || []).length));
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: true, file: name }));
    });
    return;
  }

  let url = req.url.split("?")[0];
  if (url === "/") url = "/flappy.html";
  const f = path.normalize(path.join(ROOT, decodeURIComponent(url.slice(1))));
  const rel = path.relative(ROOT, f);
  if (rel.startsWith("..") || path.isAbsolute(rel)) { res.writeHead(403); res.end("forbidden"); return; }
  let buf;
  try { buf = fs.readFileSync(f); } catch (e) { res.writeHead(404); res.end("404"); return; }
  res.writeHead(200, { "Content-Type": MIME[path.extname(f).toLowerCase()] || "application/octet-stream" });
  res.end(buf);
}).listen(8791, () => console.log("serving on http://127.0.0.1:8791  (recordings -> recordings/)"));
