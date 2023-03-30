// 收藏夹
const Follow = require("../models/Follow");
const User = require("../models/User");
const { getType, checkAllType, checkedArgumentsNotNull } = require("./utils/index.js");

const getUserPublicInfo = async function (id) {
    // 导入./user.js 模块 null
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

// 获取关注状态
exports.getFollowStatus = async function ({ fromId, attentionId } = {}) {
    // 进行参数校验
    if (!checkedArgumentsNotNull(fromId, attentionId)) { // 检查参数是否缺失
        throw new TypeError("getFollowStatus has arguments is null or undefined");
    }
    if (!checkAllType([fromId, attentionId], [getType(1), getType(1)])) { // 检查参数类型
        throw new TypeError("getFollowStatus has arguments type not expect");
    }


    let ins = await Follow.findOne({
        where: {
            fromId,
            attentionId
        }
    })

    if (ins) {
        return true;
    } else {
        return false;
    }
}

// 添加关注状态
exports.addFollowStatus = async function ({ fromId, attentionId } = {}) {
    if (!checkedArgumentsNotNull(fromId, attentionId)) { // 检查参数是否缺失
        throw new TypeError("addFollowStatus has arguments is null or undefined");
    }
    if (!checkAllType([fromId, attentionId], [getType(1), getType(1)])) { // 检查参数类型
        throw new TypeError("addFollowStatus has arguments type not expect");
    }

    // 如果已经有关注就不再添加

    let hasFollowStatus = await Follow.findOne({
        where: {
            fromId,
            attentionId
        }
    })

    if (hasFollowStatus) {
        return hasFollowStatus;
    } else {
        const ins = Follow.create({
            fromId,
            attentionId
        })

        return ins;
    }



}

// 删除关注状态
exports.deleteFollowStatus = async function ({ fromId, attentionId } = {}) {
    if (!checkedArgumentsNotNull(fromId, attentionId)) { // 检查参数是否缺失
        throw new TypeError("deleteFollowStatus has arguments is null or undefined");
    }
    if (!checkAllType([fromId, attentionId], [getType(1), getType(1)])) { // 检查参数类型
        throw new TypeError("deleteFollowStatus has arguments type not expect");
    }
    return Follow.destroy({
        where: {
            fromId,
            attentionId
        }
    })
}

// 获取我的关注列表
exports.getUserFollowStatus = async function ({ fromId, limit = 30, page = 1 } = {}) {
    if (!checkedArgumentsNotNull(fromId, limit, page)) { // 检查参数是否缺失
        throw new TypeError("getUserFollowStatus has arguments is null or undefined");
    }
    if (!checkAllType([fromId, limit, page], [getType(1), getType(1), getType(1)])) { // 检查参数类型
        throw new TypeError("getUserFollowStatus has arguments type not expect");
    }

    let { count, rows } = await Follow.findAndCountAll({
        where: {
            fromId
        },
        offset: (page - 1) * limit,
        limit
    })

    rows = rows.map(async it => {
        const obj = it.toJSON();
        obj.attentionUserInfo = await getUserPublicInfo(obj.attentionId); // 被关注
        return obj;
    })

    rows = await Promise.all(rows);


    return {
        count,
        rows,
    }
}

// 获取一个用户的被关注状态
exports.getUserFollowMe = async function ({ attentionId, limit = 30, page = 1 } = {}) {
    if (!checkedArgumentsNotNull(attentionId, limit, page)) { // 检查参数是否缺失
        throw new TypeError("getUserFollowMe has arguments is null or undefined");
    }
    if (!checkAllType([attentionId, limit, page], [getType(1), getType(1), getType(1)])) { // 检查参数类型
        throw new TypeError("getUserFollowMe has arguments type not expect");
    }
    let { count, rows } = await Follow.findAndCountAll({
        where: {
            attentionId
        },
        offset: (page - 1) * limit,
        limit
    })

    rows = rows.map(async it => {
        const obj = it.toJSON();
        obj.fromUserInfo = await getUserPublicInfo(obj.fromId); // 被关注
        obj.mutual = await exports.getFollowStatus({
            fromId: attentionId,
            attentionId: obj.fromId
        }) // 是否互相关注
        return obj;
    })

    rows = await Promise.all(rows);


    return {
        count,
        rows,
    }
}


