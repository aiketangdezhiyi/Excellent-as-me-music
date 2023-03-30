const express = require("express");
const { withAsyncError } = require("../../utils");
const { verify } = require("../../utils/jwt");
const { getFollowStatus, addFollowStatus, deleteFollowStatus, getUserFollowStatus,getUserFollowMe } = require("../../../service/follow");
const router = express.Router();


// 获取关注状态
router.get("/status", withAsyncError(async function (req, res) {
    const userId = verify(req);
    const attentionId = + req.query.attentionId
    if (!userId) {
        return false;
    }
    if (Number.isNaN(attentionId)) {
        throw new Error("attentionId is not a valid number")
    }
    return getFollowStatus({
        fromId: userId,
        attentionId
    })
}))

// 添加关注
router.post("/add", withAsyncError(async function (req, res) {
    const userId = verify(req);
    const attentionId = + req.body.attentionId
    if (!userId) {
        throw new Error("userId non-existent");
    }
    if (Number.isNaN(attentionId)) {
        throw new Error("attentionId is not a valid number")
    }
    const ins = await addFollowStatus({
        fromId: userId,
        attentionId
    })
    if (ins) {
        return true
    } else {
        throw new Error("添加关注失败")
    }
}))

// 删除关注状态
router.post("/delete", withAsyncError(async function (req, res) {
    const userId = verify(req);
    const attentionId = + req.body.attentionId
    if (!userId) {
        throw new Error("userId non-existent");
    }
    if (Number.isNaN(attentionId)) {
        throw new Error("attentionId is not a valid number")
    }
    const ins = await deleteFollowStatus({
        fromId: userId,
        attentionId
    })
    if (ins[0] !== 0) {
        return true
    } else {
        throw new Error("删除关注失败")
    }
}))



// 获取一个用户的所有关注
router.get("/user/all", withAsyncError(async function (req, res) {
    const userId = verify(req);
    const page = + req.query.page;
    const limit = + req.query.limit;
    if (!userId) {
        throw new Error("userId non-existent");
    }
    return getUserFollowStatus({
        fromId: userId,
        page,
        limit

    })
}))

router.get("/me/all", withAsyncError(async function (req, res) {
    const userId = verify(req);
    const page = + req.query.page;
    const limit = + req.query.limit;
    if (!userId) {
        throw new Error("userId non-existent");
    }
    return getUserFollowMe({
        attentionId: userId,
        page,
        limit

    })
}))


module.exports = router;


