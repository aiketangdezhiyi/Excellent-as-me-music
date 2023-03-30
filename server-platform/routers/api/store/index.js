const express = require("express");
const { withAsyncError } = require("../../utils");
const router = express.Router();
const songService = require("../../../service/song");

router.post("/song", withAsyncError(async function (req, res) {
    const obj = await songService.addSong(req.body);
    if(obj) {
        return obj;
    } else {
        throw new Error("存储数据错误");
    }
}))




module.exports = router;