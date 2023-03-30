const express = require("express");
const { getAllUser } = require("../../../service/user");
const { withAsyncError } = require("../../utils");
const router = express.Router();
const {verify} = require("../../utils/jwt");

router.get("/all", withAsyncError(async function (req, res) {
    const userId = verify(req);
    const page = + req.query.page
    const size = + req.query.size
    const keyword = req.query.keyword
    return getAllUser({
        page,
        size,
        userId,
        keyword
    })
}))





module.exports = router;


