const express = require("express");
const { getLevelTopUser, getRecentSong, getLevelTopSong, getLightStar } = require("../../../service/home");
const { withAsyncError } = require("../../utils");
const router = express.Router();
router.get("/hot/star", withAsyncError(async function (req, res) {
    // 返回等级最高前10个人
    return getLevelTopUser();

}))


router.get("/recent/song", withAsyncError(async function (req, res) {
    const page = + req.query.page
    const size = + req.query.size
    return getRecentSong({
        page,
        size
    })
}))

// 返回播放量最高的5条歌曲
router.get("/top/song", withAsyncError(async function (req, res) {
    return getLevelTopSong()
}))



router.get("/light/star", withAsyncError(async function (req, res) {
    return getLightStar()
}))


module.exports = router;


