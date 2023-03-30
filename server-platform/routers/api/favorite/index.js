const express = require("express");
const { withAsyncError } = require("../../utils");
const { verify } = require("../../utils/jwt");
const { findOneFavorites, changeSongInFavorite, deleteFavorite, cancelSongFavorite, getFavoriteAuthor, addFavorites, findUserAllFavorites, changeFavoriteInfo, findUserAllFavoriteContext, getSongStatusInFavorite } = require("../../../service/favorite");
const router = express.Router();

// 获取某一个收藏夹的信息
router.get("/", withAsyncError(async function (req, res) {
    const FavoriteId = + req.query.favoriteId;
    if (typeof FavoriteId !== "number" || Number.isNaN(FavoriteId)) {
        throw new Error("FavoriteId except number and not NaN")
    }
    return findOneFavorites({
        FavoriteId
    })

}))

// 获取一个用户所有收藏夹的信息
router.get("/all", withAsyncError(async function (req, res) {
    const userId = verify(req);
    if (userId) {
        return findUserAllFavorites({
            UserId: userId
        })
    }
    else {
        throw new Error("userId non-existent");
    }
}))

// 获取一个用户的收藏夹目录信息
router.get("/context", withAsyncError(async function (req, res) {
    const userId = verify(req);
    if (userId) {
        return findUserAllFavoriteContext({
            UserId: userId
        })
    }
    else {
        throw new Error("userId non-existent");
    }
}))

// 询问某条歌曲在某个收藏夹的状态
router.get("/song/status", withAsyncError(async function (req, res) {
    const userId = verify(req);
    const songId = + req.query.songId;
    if (userId) {
        return getSongStatusInFavorite({
            UserId: userId,
            SongId: songId
        })
    }
    else {
        throw new Error("userId non-existent");
    }
}))

// 新增一个收藏夹
router.post("/add", withAsyncError(async function (req, res) {
    const userId = verify(req);

    const name = req.body.name;
    if (userId) {
        return addFavorites({
            UserId: userId,
            name
        })
    }
    else {
        throw new Error("userId non-existent");
    }
}))


// 个人空间歌词收藏状态信息改变
router.post("/change/confirm", withAsyncError(async function (req, res) {
    const userId = verify(req);

    const config = req.body.config;
    const SongId = + req.body.songId
    if (userId) {
        return changeSongInFavorite({
            UserId: userId,
            SongId,
            config
        })
    }
    else {
        throw new Error("userId non-existent");
    }
}))


// 修改收藏夹封面信息
router.post("/change/info", withAsyncError(async function (req, res) {
    const userId = verify(req);
    if (userId) {
        return changeFavoriteInfo(req.body);
    }
    else {
        throw new Error("userId non-existent");
    }
}))

// 获取收藏夹的作者
router.post("/author", withAsyncError(async function (req, res) {
    const user = await getFavoriteAuthor(req.body);
    return user.username
}))

// 取消收藏某条歌曲
router.post("/cancel/song", withAsyncError(async function (req, res) {
    const userId = verify(req);
    if (userId) {
        return await cancelSongFavorite(req.body);
    }
    else {
        throw new Error("userId non-existent");
    }

}))

// 删除某个收藏夹
router.post("/delete", withAsyncError(async function (req, res) {
    const userId = verify(req);
    // 不能直接删除,应该查看该收藏夹的创作者是否是该用户
    if (userId) {
        return await deleteFavorite({
            FavoriteId: req.body.FavoriteId,
            UserId: userId
        });
    }
    else {
        throw new Error("userId non-existent");
    }

}))

module.exports = router;


