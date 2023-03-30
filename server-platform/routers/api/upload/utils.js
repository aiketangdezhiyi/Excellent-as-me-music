const path = require("path");
const { getRandomString } = require("../../utils");
const multer = require("multer");

// 传入上传到服务器的路径 返回一个storage对象
exports.getStorage = function(absPath) {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, absPath)
        }, // 注意: 如果你提供的 destination 是一个函数，你需要负责创建文件夹。 确保文件夹存在。
        filename: function (req, file, cb) { // filename 用于确定文件夹中的文件名的确定
            const ext = path.extname(file.originalname);
            // 歌曲名 和 专辑 以及歌词 都应该由客户端上传
            cb(null, file.originalname.replace(ext, "") + "." + getRandomString() + ext);
            // 文件名用一个随机字符串是为了防止重名文件上传到文件夹进行覆盖
        }
    })
    return storage;
}



// 传入storage对象，该上传对象允许的上传ext数组allowExt以及单文件大小限制limitFileSize，返回一个upload对象
exports.getMulterUpload = function(storage, allowExt = [".mp3"], limitFileSize = 5 * 1024 * 1024) {
    let upload = multer({
        storage,
        fileFilter: function (req, file, cb) {
            // 这个函数应该调用 cb 用boolean值来
            // 指示是否应接受该文件
            const ext = path.extname(file.originalname);
            if (allowExt.includes(ext)) {
                cb(null, true);
            } else {
                cb(null, new Error(`${file.originalname} is not a allow file type in${allowExt}`));
            }
        },
        limits: {
            fileSize: limitFileSize
        }
    })

    return upload;
}

// 默认上传路径在public目录下，传入一个文件夹名字，返回保存在服务器绝对路径
exports.getStoragePath = function (filename) {
    const absPath = path.resolve(__dirname,"../../../public/" + filename); // 上传路径
    return absPath; 
}