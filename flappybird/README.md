# 像素鸟 Flappy Bird

单文件 H5 像素鸟游戏，使用原版 Flappy Bird 素材（贴图 + 音效），还原原版 288×512 分辨率与手感参数。

## 玩

直接双击打开 `flappy.html` 即可（素材已 base64 内嵌，无需服务器、无需联网）。

- 点击 / 空格 / ↑ / W：拍翅
- C（准备界面）：切换鸟颜色（黄/蓝/红）
- 最高分保存在浏览器 localStorage

## 文件

| 文件 | 说明 |
|---|---|
| `flappy.html` | 最终成品（单文件，素材已内嵌） |
| `game.template.html` | 游戏源码模板（含 `@@占位符@@`） |
| `build.js` | 构建脚本：`node build.js` 把 `assets/` 内嵌生成 `flappy.html` |
| `assets/` | 原版素材：26 张贴图 + 5 个 ogg 音效 + LICENSE |

## 玩法参数（原版手感）

重力 0.5、拍翅 -9、管道速度 2px/帧、间隙 100px、间距 170px；每过 4 分管道切换昼夜；
撞击白闪 + 坠落动画；结算面板含 SCORE/BEST 与奖牌（10/20/30/40 分对应铜/银/金/白金）。

## 素材来源

[samuelcust/flappy-bird-assets](https://github.com/samuelcust/flappy-bird-assets)（原版素材，见 `assets/LICENSE`）。
