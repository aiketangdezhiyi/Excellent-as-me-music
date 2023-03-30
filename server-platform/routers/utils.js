/**
 * 给result返回一个格式统一的数据对象
 */
 exports.getResult = function (result,msg = 'success') {
    return {
        code: 200,
        msg,
        data: result
    }
}

exports.getInfo = function (err = "服务器xxx", errCode = 500) {
    return {
        code: errCode,
        err
    }
}

function isNull (obj) {
    return obj === undefined || obj === null;
}

exports.isNull = isNull;

/**
 * 这是一个高阶函数
 * 传一个函数，返回一个函数，在这个函数里会自定捕获异步错误，传到下一个express中间件
 */
 exports.withAsyncError = function (handle) {
    return async (req, res, next) => {
        res.header("Access-Control-Allow-Origin","*"); // 简单请求跨域处理
        try {
            const result = await handle(req, res, next);
            if(isNull(result)) {
                res.send(exports.getResult(result,"not found"));
                return;
            }
            if(result.msg === '该用户已经存在') {
                res.send(exports.getResult(result,"fail"));
                return;
            }
            res.send(exports.getResult(result));

        } catch (err) {
            console.log("err",err);
            next(err); // 手动的将error传到下一个express中间件
        }
    }
}

exports.getRandomString = function () {
    return Math.random().toString(36).substring(2);
}


