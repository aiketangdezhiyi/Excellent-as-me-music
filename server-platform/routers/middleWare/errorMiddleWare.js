
const { getInfo } = require("../utils");
const multer = require('multer');
module.exports.errMiddleWare = function (err, req, res, next) {
    console.log("errMiddleWare");
    if(err instanceof multer.MulterError) {
        console.log(err); // 上传文件出错
        res.status(500).send(getInfo(err));
    } else if (err) {
        const errObj = err instanceof Error ? err.message : err;
        //发生了错误
        res.status(200).send(getInfo(errObj,401));
    } else {
        next();
    }
}