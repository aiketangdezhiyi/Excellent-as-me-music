// 访问空
const Favorites = require("../models/Favorites.js");
const Song = require("../models/Song.js");
const User = require("../models/User.js");
const { findOneFavorites } = require("./favorite.js");
const { getType, checkAllType, checkedArgumentsNotNull } = require("./utils/index.js");

/**
 * 获取用户信息
 * 不包含敏感信息
 * @param {*} param0 
 * @returns 
 */
exports.getVisitUserInfo = async function (UserId) {
    // 进行参数校验
    if (!checkedArgumentsNotNull(UserId)) { // 检查参数是否缺失
        throw new TypeError("getVisitUserInfo has arguments is null or undefined");
    }
    if (!checkAllType([UserId], [getType(1)])) { // 检查参数类型
        throw new TypeError("getVisitUserInfo has arguments type not expect");
    }

    const ins = await User.findOne({
        where: {
            id: UserId
        }
    });

    if (ins) {
        const { user, pwd, ...userInfo } = ins.toJSON(); // 不返回敏感信息
        return userInfo;

    } else {
        return null;
    }
}



/**
 * 返回访问用户的公开收藏夹信息及收藏夹内歌曲的信息
 * 歌单存在非创作歌曲而是自己上传的版权歌曲
 * @param {*} UserId 
 * @returns 
 */
exports.getVisitUserFavorite = async function (UserId,) {
    // 进行参数校验
    if (!checkedArgumentsNotNull(UserId)) { // 检查参数是否缺失
        throw new TypeError("getVisitUserFavorite has arguments is null or undefined");
    }
    if (!checkAllType([UserId], [getType(1)])) { // 检查参数类型
        throw new TypeError("getVisitUserFavorite has arguments type not expect");
    }


    const ins = await Favorites.findAll({
        where: {
            UserId,
            isPublic: 1
        }
    });

    const favoriteListPro = ins.map(it => {
        return findOneFavorites({
            FavoriteId: it.id
        })
    })
    const favoriteList = await Promise.all(favoriteListPro);
    return favoriteList;
}


/**
 * 返回用户最近上传的创作歌曲
 * 1 最近上传 2 按热度 3 按添加歌单
 * @param {*} UserId 
 * @returns 
 */
exports.getVisitUserUploadSong = async function (UserId,type = 1) {
    // 进行参数校验
    if (!checkedArgumentsNotNull(UserId)) { // 检查参数是否缺失
        throw new TypeError("getVisitUserUploadSong has arguments is null or undefined");
    }
    if (!checkAllType([UserId], [getType(1)])) { // 检查参数类型
        throw new TypeError("getVisitUserUploadSong has arguments type not expect");
    }

    let order = [];

    if(type === 1) {
        order.push(['createdAt', 'DESC'])
    } else if(type === 2) {
        order.push(["broadcast","DESC"]);
    } else {
        order.push(["collect","DESC"])
    }
    let songList = await Song.findAll({
        where: {
            UserId,
            creative: 1, // 创作歌曲
            status : 2 // 通过审核
        },
        order ,
    })

    const ins = await User.findOne({
        where: {
            id: UserId
        }
    });

    if (ins) {
        const { user, pwd, ...userInfo } = ins.toJSON(); // 不返回敏感信息
        songList = songList.map(it=>{
            const obj = it.toJSON()
            obj.userInfo = userInfo;
            return obj;
        })
    }

    

    return songList;
}

exports.handleVisitUser = async function (UserId) {
    if (!checkedArgumentsNotNull(UserId)) { // 检查参数是否缺失
        throw new TypeError("getVisitUserUploadSong has arguments is null or undefined");
    }
    if (!checkAllType([UserId], [getType(1)])) { // 检查参数类型
        throw new TypeError("getVisitUserUploadSong has arguments type not expect");
    }

    const songList =await exports.getVisitUserUploadSong(UserId);
    const favoriteList = await exports.getVisitUserFavorite(UserId);
    const userInfo = await exports.getVisitUserInfo(UserId);

    return {
        songList,
        favoriteList,
        userInfo
    }
}
