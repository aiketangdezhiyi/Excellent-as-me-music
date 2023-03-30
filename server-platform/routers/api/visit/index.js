const express = require("express");
const { handleVisitUser,getVisitUserUploadSong,getVisitUserFavorite } = require("../../../service/visit");
const { withAsyncError } = require("../../utils");
const router = express.Router();
const { verify } = require("../../utils/jwt");

const types = [1,2,3]; // 歌曲筛选条件的type值

router.get("/song/:id", withAsyncError(async function (req, res) {

    const visitId = + req.params.id;
    let type =( + req.query.type);

    
    if (Number.isNaN(visitId)) {
        throw new Error("你打开的方式不对")
    }

    if(!types.includes(type)) {
        // 如果为非正常请求
        // 默认返回最近上传
        type = 1;
    }

    return getVisitUserUploadSong(visitId,type); // 数据量比较庞大时进行分页


}))


router.get("/favorite/:id", withAsyncError(async function (req, res) {

    const visitId = + req.params.id;

    
    if (Number.isNaN(visitId)) {
        throw new Error("你打开的方式不对")
    }

    return getVisitUserFavorite(visitId); // 数据量比较庞大时进行分页


}))

router.get("/user/:id", withAsyncError(async function (req, res) {

    const userId = verify(req);
    const visitId = + req.params.id;
    if (Number.isNaN(visitId)) {
        throw new Error("你打开的方式不对")
    }
    
    if (userId == visitId) {// 如果是自己就返回一个信息提示自己访问自己空间，让客户端进行处理
        return -1;
    }

    return handleVisitUser(visitId);


}))


// 单独访问用户上传的歌曲
// 1 最近上传 2 按热度 3 按添加歌单






module.exports = router;


