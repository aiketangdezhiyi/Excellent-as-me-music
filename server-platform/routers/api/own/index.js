const express = require("express");
const { withAsyncError } = require("../../utils");
const router = express.Router();
const songService = require("../../../service/song");
const {verify} = require("../../utils/jwt");
router.get("/song", withAsyncError(async function (req, res) {

    const userId = verify(req);
    if(userId) {
        const {keyword,page,size, option = 0} = req.query;
        return songService.searchSongListWithUserId({
            UserId : userId,
            keyword,
            page,
            size,
            option
        })
    }
    else {
        throw new Error("userId non-existent");
    }
    
}))





module.exports = router;


