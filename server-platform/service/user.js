// 接口
const User = require("../models/User");
const md5 = require('md5');
const { checkedArgumentsNotNull, checkAllType, getType } = require("./utils/index.js");
const { getFollowStatus } = require("./follow");
const { Op } = require("sequelize");


// 添加一个用户
exports.addUser = async function ({ user, username, pwd } = {}) {
    // 防止传过来其它数据

    if (!checkedArgumentsNotNull(user, username, pwd)) {
        // 任意一个为空
        return null;
    }

    // 应该先看一下该用户是否已经存在
    let ins = await User.findOne({
        where: {
            user
        }
    });
    if (ins) {
        // 用户已经存在
        throw new Error("该用户已经存在");
    }


    ins = await User.create({
        user,
        username,
        pwd: md5(pwd) // 加密
    });

    const obj = ins.toJSON();
    return {
        userId: obj.id,
        user: obj.user
    }
}

// 登录接口
exports.login = async function ({ user, pwd } = {}) {
    if (!checkedArgumentsNotNull(user, pwd)) {
        // 任意一个为空
        return null;
    }

    const ins = await User.findOne({
        where: {
            user,
            pwd: md5(pwd)
        }
    });
    if (ins) {
        const obj = ins.toJSON()
        return {
            userId: obj.id,
            username: obj.username,
            avatarUrl: obj.avatarUrl,
            user: obj.user,
            exp: obj.exp,
            sex: obj.sex,
            signature: obj.signature
        };
    } else {
        return null;
    }
}

// 查找一个用户
exports.findOneUser = async function (userId = "") {
    const checked = checkedArgumentsNotNull(userId);
    if (!checked) {
        return null;
    }
    const ins = await User.findOne({
        where: {
            id: userId
        }
    })
    if (ins) {
        const obj = ins.toJSON()
        return {
            userId: obj.id,
            username: obj.username,
            avatarUrl: obj.avatarUrl,
            user: obj.user,
            exp: obj.exp,
            sex: obj.sex,
            signature: obj.signature
        };
    } else {
        return null;
    }
}


// 修改头像
exports.updateAvatar = async function ({ avatarUrl, UserId } = {}) {
    if (!checkedArgumentsNotNull(avatarUrl, UserId)) {
        return new Error("参数缺失");
    }

    const res = await User.update({
        avatarUrl,
    }, {
        where: {
            id: UserId
        }
    });

    return res;
}

// 修改个人信息 包括 昵称 性别 签名
exports.updateUserInfo = async function ({ name, sex, signature = "", UserId } = {}) {
    if (!checkedArgumentsNotNull(name, sex, UserId)) {
        return new Error("参数缺失");
    }

    const [res] = await User.update({
        username: name,
        sex,
        signature
    }, {
        where: {
            id: UserId
        }
    });

    if (res === 1) {
        // 更新成功返回最新的用户数据
        return exports.findOneUser(UserId);
    } else {
        return new Error("服务器错误")
    }
}




// 修改密码
exports.changePwd = async function ({ id, user, oldPwd, newPwd } = {}) {
    if (!checkedArgumentsNotNull(id, user, oldPwd, newPwd)) { // 检查参数是否缺失
        throw new TypeError("changePwd has arguments is null or undefined");
    }
    if (!checkAllType([id, user, oldPwd, newPwd], [getType(1), getType(""), getType(""), getType("")])) { // 检查参数类型
        throw new TypeError("changePwd has arguments type not expect");
    }
    const ins = await User.findOne({
        where: {
            id,
            user,
            pwd: md5(oldPwd)
        }
    })
    if (ins) {
        await User.update({
            pwd: md5(newPwd)
        }, {
            where: {
                id
            }
        });
        return true;
    } else {
        throw new Error("旧密码不对");
    }
}

// 分页获取有关键词的所有用户公开信息
exports.getAllUser = async function ({ page, size, userId, keyword = "" } = {}) {
    if (!checkedArgumentsNotNull(page, size)) { // 检查参数是否缺失
        throw new TypeError("getAllUser has arguments is null or undefined");
    }
    if (!checkAllType([page, size], [getType(1), getType(1)])) { // 检查参数类型
        throw new TypeError("getAllUser has arguments type not expect");
    }

    if (keyword == "" || keyword == null) {
        // 
        keyword = ""; // 默认全部

    }

    let { count, rows } = await User.findAndCountAll({
        where: {
            username: {
                [Op.like]: `%${keyword}%`
            },
            [Op.not] : {
                id : userId
            }
        },
        attributes: ['id', 'username', 'sex', 'exp', 'signature', 'avatarUrl'],
        offset: (page - 1) * size,
        limit: size,
    })
    if (userId) { // 往用户信息中注入关注信息isFollow
        // 已经登录
        rows = rows.map(async it => {
            const obj = it.toJSON();
            obj.isFollow = await getFollowStatus({
                fromId: userId,
                attentionId: obj.id
            })

            return obj
        })
        rows = await Promise.all(rows);
    } else {
        // 未登录
        rows = rows.map(it => {
            const obj = it.toJSON();
            obj.isFollow = false;
            return obj
        })
    }

    return { count, rows }
}


// 获取一个用户公开的信息
exports.getUserPublicInfo = async function (id) {
    if (!checkedArgumentsNotNull(id)) {
        return new Error("getUserPublicInfo has arguments is null or undefined");
    }
    if (!checkAllType([id], [getType(1)])) { // 检查参数类型
        throw new TypeError("getUserPublicInfo has arguments type not expect");
    }
    const user = await User.findOne({
        where: {
            id
        }
    })

    return {
        id: user.id,
        username: user.username,
        avatarUrl: user.avatarUrl,
        signature: user.signature,
        sex: user.sex,
        exp: user.exp
    }

}
