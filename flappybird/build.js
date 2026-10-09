// 将 assets/ 里的原版素材以 base64 内嵌进 game.template.html, 生成单文件 flappy.html
const fs = require("fs");
const path = require("path");

const dir = __dirname;
const A = f => path.join(dir, "assets", f);
const b64 = (f, mime) =>
  "data:" + mime + ";base64," + fs.readFileSync(A(f)).toString("base64");
const png = f => b64(f, "image/png");
const ogg = f => b64(f, "audio/ogg");

const tokens = {
  img_background_day: png("background-day.png"),
  img_background_night: png("background-night.png"),
  img_base: png("base.png"),
  img_pipe_green: png("pipe-green.png"),
  img_pipe_red: png("pipe-red.png"),
  img_message: png("message.png"),
  img_gameover: png("gameover.png"),
  img_medal_platinum: png("medal_platinum.png"),
  img_medal_gold: png("medal_gold.png"),
  img_medal_silver: png("medal_silver.png"),
  img_medal_bronze: png("medal_bronze.png"),
  img_yellowbird_upflap: png("yellowbird-upflap.png"),
  img_yellowbird_midflap: png("yellowbird-midflap.png"),
  img_yellowbird_downflap: png("yellowbird-downflap.png"),
  img_bluebird_upflap: png("bluebird-upflap.png"),
  img_bluebird_midflap: png("bluebird-midflap.png"),
  img_bluebird_downflap: png("bluebird-downflap.png"),
  img_redbird_upflap: png("redbird-upflap.png"),
  img_redbird_midflap: png("redbird-midflap.png"),
  img_redbird_downflap: png("redbird-downflap.png"),
  snd_wing: ogg("wing.ogg"),
  snd_point: ogg("point.ogg"),
  snd_hit: ogg("hit.ogg"),
  snd_die: ogg("die.ogg"),
  snd_swoosh: ogg("swoosh.ogg"),
};
for (let d = 0; d <= 9; d++) tokens["img_" + d] = png(d + ".png");

let html = fs.readFileSync(path.join(dir, "game.template.html"), "utf8");
for (const [k, v] of Object.entries(tokens)) {
  html = html.replaceAll("@@" + k + "@@", v);
}
const left = html.match(/@@\w+@@/g);
if (left) {
  console.error("未替换的占位符:", [...new Set(left)].join(", "));
  process.exit(1);
}
fs.writeFileSync(path.join(dir, "flappy.html"), html);
console.log("flappy.html 已生成,", (html.length / 1024).toFixed(0) + " KB");
