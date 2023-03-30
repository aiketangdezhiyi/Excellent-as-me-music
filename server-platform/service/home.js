const Song = require("../models/Song.js");
const User = require("../models/User.js");
const { getType, checkAllType, checkedArgumentsNotNull } = require("./utils/index.js");

// 返回等级最高的前10个人
exports.getLevelTopUser = async function () {
    return User.findAll({
        limit: 10,
        attributes: ['id', 'username', 'sex', 'exp', 'signature', 'avatarUrl'],
        order: [['exp', 'DESC']]
    })
}

exports.getRecentSong = async function ({ page = 1, size = 10 } = {}) {

    if (!checkedArgumentsNotNull(page, size)) {
        throw new TypeError("getRecentSong has arguments is null or undefined");
    }


    try {
        let { count, rows } = await Song.findAndCountAll({ // 查找的配置对象
            where: {
                creative: 1,
                status: 2
            }, // 审核通过
            offset: (+ page - 1) * size, // 一个类型把老子整了那么久
            limit: + size,
            order: [['createdAt', 'DESC']]
        });


        rows = rows.map(async it => {
            const obj = it.toJSON();
            const oUser = await User.findOne({
                where: {
                    id: obj.UserId
                }
            });
            const { user, pwd, ...userInfo } = oUser.toJSON(); // 不返回隐私信息
            obj.userInfo = userInfo;
            return obj
        });

        rows = await Promise.all(rows)

        return {
            count,
            rows // 往歌曲信息里注入用户信息
        }


    } catch (err) {
        return null;
    }
}

exports.getLevelTopSong = async function () {
    let rows = await Song.findAll({
        where: {
            creative: 1,
            status: 2
        }, // 审核通过的创作歌曲
        limit: 9,
        order: [['broadcast', 'DESC']]
    })

    rows = rows.map(async it => {
        const obj = it.toJSON();
        const oUser = await User.findOne({
            where: {
                id: obj.UserId
            }
        });
        const { user, pwd, ...userInfo } = oUser.toJSON(); // 不返回隐私信息
        obj.userInfo = userInfo;
        return obj
    });

    rows = await Promise.all(rows)
    return rows;
}

exports.getLightStar = async function () {
    // 创作之星
    return User.findAll({
        limit: 3,
        attributes: ['id', 'username', 'sex', 'exp', 'signature', 'avatarUrl'],
        order: [['exp', 'DESC']]
    })
}