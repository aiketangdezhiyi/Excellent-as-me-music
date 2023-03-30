const jwt = require("jsonwebtoken");
const secret = "holdHappy"; // 私钥
const { findOneUser } = require("../../service/user");

/**
 * 颁发jwt令牌
 * @param {*} res
 * @param {*} payload 数据
 * @param {*} expire 过期时间 s
 */
exports.publish = function (res, payload, expire = 86400) {
  const jwtToken = jwt.sign(payload, secret, {
    expiresIn: expire,
  });
  res.header("authorization", jwtToken); // 适配浏览器端和其他端
};

// 验证用户信息返回用户唯一标识
exports.verify = function (req) {
  let token;
  token = req.headers.authorization;
  if (token) {
    //尝试中header中的authorization取

    // authorization: bearer token
    token = token.split(" ");
    token = token.length === 1 ? token[0] : token[1]; // 考虑到可能没有按照标准格式
  } else {
    return null;
  }
  try {
    const result = jwt.verify(token, secret); // 这个方法经过认证成功才会返回消息体

    return result.userId;
  } catch (err) {
    return null;
  }
};

/**
 * 认证jwt令牌
 * @param {*} req
 * @returns
 */
exports.whoAmI = function (req) {
  const userId = exports.verify(req);
  if (userId === null || userId === undefined) {
    return null;
  }
  try {
    return findOneUser(userId);
  } catch (err) {
    return null;
  }
};

// 验证用户信息通过req.headers.authorization
