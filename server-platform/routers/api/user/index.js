const express = require("express");
const { withAsyncError } = require("../../utils");
const { addUser, login, updateAvatar, updateUserInfo, getPublicUserInfo, changePwd } = require("../../../service/user");
const { addFavorites } = require("../../../service/favorite");
const router = express.Router();
const { publish, whoAmI, verify } = require("../../utils/jwt");



router.post("/login", withAsyncError(async (req, res, next) => {
    const result = await login(req.body);

    if (result) {
        // 登录成功
        // jwt
        publish(res, { userId: result.userId });
    }
    req.session.userInfo = result; // 保存登录状态
    return result;
}))

// 注册
router.post("/adduser", withAsyncError(async (req, res, next) => {

    if (req.body.captcha === req.session.captchaText) {
        // 验证码相同
        const result = await addUser(req.body);
        const UserId = result.userId;
        await addFavorites({
            UserId
        }) // 注册完成默认为该用户生成一个默认歌单收藏夹
        return result;
    } else {
        throw new Error("验证码错误");
    }

}))


// 验证是否登录过
router.post("/whoami", withAsyncError(async (req, res, next) => {
    if (req.session.userInfo) {
        return req.session.userInfo;

    }
    return whoAmI(req);
}))

router.post("/logout", withAsyncError(async (req, res, next) => {
    if (req.session.userInfo) { // 清除用户缓存
        req.session.userInfo = null;
    }
    return true;
}))


router.post("/update/avatar", withAsyncError(async (req, res, next) => {

    return updateAvatar(req.body);

}))

// 更新信息
router.post("/update/info", withAsyncError(async (req, res, next) => {

    return updateUserInfo(req.body);

}))

// 获取歌曲提供者信息
router.get("/provider/info", withAsyncError(async (req, res, next) => {
    const id = + req.query.id;
    if (Number.isNaN(id)) {
        throw new Error("id is not valid number")
    }
    return getPublicUserInfo(id);

}))

// 修改密码
router.post("/change/pwd", withAsyncError(async function (req, res) {
    const userId = verify(req);
    const user = req.body.user;
    const newPwd = req.body.newPwd;
    const oldPwd = req.body.oldPwd;
    if (!userId) {
        throw new Error("userId non-existent");
    } else {
        return changePwd({
            id: userId,
            user,
            newPwd,
            oldPwd
        })
    }
}))


module.exports = router;