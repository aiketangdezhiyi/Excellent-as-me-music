const express = require("express");
const { searchSong, searchKeyWord, recoverySong, findOneSong, changeSongName, changeSongToUnCreative, applySongToCreative, deleteSong, songDuration, changeLyric } = require("../../../service/song");
const { withAsyncError } = require("../../utils");
const { verify } = require("../../utils/jwt");
const router = express.Router();


// 根据关键词搜索歌曲
router.get("/search", withAsyncError(async function (req, res) {
    const page = + req.query.page
    const keyword = req.query.keyword
    const size = + req.query.size

    return searchSong({
        page,
        keyword,
        size
    })
}))

router.get("/find/one/:id",withAsyncError(async function (req, res) {
    const songId = + req.params.id;
    const userId = verify(req);
    if(userId === null) {
        throw new Error("没有权限");
    }
    return findOneSong({
        songId
    })
}))

// 根据关键字搜索关键词
router.get("/word/search", withAsyncError(async function (req, res) {
    const keyword = req.query.keyword

    return searchKeyWord({
        keyword
    })
}))

// 主页打开播放页播放歌曲 通过传递一个歌曲数组请求恢复数据
router.post("/recovery/id/array", withAsyncError(async function (req, res) {
    const songList = req.body.songList;
    return recoverySong(songList)
}))


// 修改歌名
router.post("/change/song/name", withAsyncError(async function (req, res) {
    const userId = verify(req);
    return changeSongName({
        ...req.body,
        userId
    })
}))

// 修改歌曲为非创作歌曲
router.post("/change/song/uncreative", withAsyncError(async function (req, res) {
    const userId = verify(req);
    return changeSongToUnCreative({
        ...req.body,
        userId
    })
}))

router.post("/change/lyric",withAsyncError(async function (req, res) {
    const userId = verify(req);
    if(userId === null ){
        throw new Error("抱歉没有权限");
    }
    return changeLyric({
        ...req.body,
        lyricProviderId : userId
    })
}));

// 请求歌曲名称
router.post("/len", withAsyncError(async function (req, res) {
    const userId = verify(req);
    if(userId === null) {
        throw new Error("没有权限");
    }
    return songDuration(req.body)
}))

// 歌曲申请为创作歌曲
router.post("/apply/song/creative", withAsyncError(async function (req, res) {
    const userId = verify(req);
    return applySongToCreative({
        ...req.body,
        userId
    })
}))


router.post("/delete", withAsyncError(async function (req, res) {
    const userId = verify(req);
    return deleteSong({
        ...req.body,
        userId
    })
}))


module.exports = router;


