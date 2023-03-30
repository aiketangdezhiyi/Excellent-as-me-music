const express = require("express");
const path = require("path");
const app = express();
const staticAbsPath = path.resolve(__dirname, ".././public");
const history = require("connect-history-api-fallback");
const svgCaptcha = require("svg-captcha"); // 预设好的验证码库
// 使用内存中的canvas生成验证码 可以使用node-canvas

const session = require("express-session");

// app.use(
//   history({
//     rewrites: [
//       {
//         from: /(^\/avatar\/.*$|^\/mp3\/.*$|^\/favorite\/.*$|^\/animation\/.*$)/,
//         to: function (context) {
//           return context.parsedUrl.path;
//         },
//       },
//       {
//         from: /^\/api\/.*$/,
//         to: function (context) {
//           return context.parsedUrl.path;
//         },
//       },
//       {
//         from: /^\/home\/.*$/,
//         to: function (context) {
//           return context.parsedUrl.path;
//         },
//       },
//       {
//         from: /^\/$/,
//         to: function (context) {
//           return "/home/index.html";
//         },
//       },
//     ],
//   })
// ); // 单页面应用依然响应index.html

app.use(
  session({
    secret: "xs",
  })
);

app.get("/api/captcha", function (req, res) {
  const captcha = svgCaptcha.createMathExpr({
    noise: 4, // 干扰线条的数量
    background: "#fff",
    color: true,
  });
  req.session.captchaText = captcha.text;

  // 同一个用户发送过来的session-id一致，访问的session对象都是同一个
  res.type("svg");

  res.status(200).send(captcha.data);
}); // 获取验证码链接 https://hub.fastgit.org/produck/svg-captcha/blob/HEAD/README_CN.md

app.use(express.static(staticAbsPath)); // 静态资源服务器

app.use(express.json());

app.use(express.urlencoded());

app.use("/api/user", require("./api/user")); // 用户信息接口
app.use("/api/upload", require("./api/upload")); // 上传接口
app.use("/api/store", require("./api/store")); // 存储数据的
app.use("/api/own", require("./api/own")); // 个人中心对用户数据的接口
app.use("/api/favorite", require("./api/favorite")); // 歌单
app.use("/api/visit", require("./api/visit")); // 访问空间
app.use("/api/follow", require("./api/follow")); // 关注
app.use("/api/song", require("./api/song")); // 歌曲
app.use("/api/home", require("./api/home")); // 首页
app.use("/api/singer", require("./api/singer")); // 歌手

app.use("*", require("./middleWare/errorMiddleWare").errMiddleWare);

app.listen(9528);
