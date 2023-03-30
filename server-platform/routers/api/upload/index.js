const express = require("express");
const { withAsyncError} = require("../../utils");
const router = express.Router();
const {getMulterUpload,getStorage,getStoragePath}  = require("./utils");

// 我在想这个上传接口肯定不止图片或是歌曲这么多，万一后面还有呢？
// 提取出公共的工具函数

// api/upload/song
// 看起来舒服多了，对后续扩展接口也是很友好。

const uploadWithMp3 = getMulterUpload(getStorage(getStoragePath("mp3")),[".mp3",".wav"],15*1024*1024); // 爽
const uploadSongUrl = "/mp3"; // api/upload/song 的文件保存路径
router.post("/song",  uploadWithMp3.single("mp3"),withAsyncError(async function (req,res) {
    const url = uploadSongUrl + "/" + req.file.filename; // 返回到客户端
    // 并且在数据库中记录上传到服务器的路径以及对应原来歌曲的歌名等信息
    return url;
}) ) // 如果发生错误错误类型是multer.MulterError



const uploadWithAvatar = getMulterUpload(getStorage(getStoragePath("avatar")),[".jpg",".png",".webp"],5*1024*1024); // 爽
const uploadAvatarUrl = "/avatar"; // api/upload/avatar 的文件保存路径
router.post("/avatar",  uploadWithAvatar.single("picture"),withAsyncError(async function (req,res) {
    const url = uploadAvatarUrl + "/" + req.file.filename; // 返回到客户端
    // 并且在数据库中记录上传到服务器的路径以及对应原来歌曲的歌名等信息
    return url;
}) ) // 如果发生错误错误类型是multer.MulterError



const uploadWithFavorite = getMulterUpload(getStorage(getStoragePath("favorite")),[".jpg",".png",".webp"],5*1024*1024); // 爽
const uploadFavoriteUrl = "/favorite"; // api/upload/avatar 的文件保存路径
router.post("/favorite",  uploadWithFavorite.single("picture"),withAsyncError(async function (req,res) {
    const url = uploadFavoriteUrl + "/" + req.file.filename; // 返回到客户端
    // 并且在数据库中记录上传到服务器的路径以及对应原来歌曲的歌名等信息
    return url;
}) ) // 如果发生错误错误类型是multer.MulterError



module.exports = router;