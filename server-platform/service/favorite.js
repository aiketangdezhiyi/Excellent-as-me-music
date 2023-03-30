// 收藏夹
const Favorites = require("../models/Favorites");
const { Op } = require("sequelize"); // 导入运算符
const { getType, checkAllType, checkedArgumentsNotNull } = require("./utils/index.js");
const { findFavoriteSheets } = require("./sheet");
const Sheet = require("../models/Sheet");
const User = require("../models/User");

// 创建一个收藏夹
exports.addFavorites = async function ({ UserId, name = "默认歌单" } = {}) {
    // 进行参数校验
    if (!checkedArgumentsNotNull(UserId, name)) { // 检查参数是否缺失
        throw new TypeError("addFavorites has arguments is null or undefined");
    }
    if (!checkAllType([UserId, name], [getType(1), getType("")])) { // 检查参数类型
        throw new TypeError("addFavorites has arguments type not expect");
    }


    const ins = await Favorites.create({
        UserId,
        name,
    });

    const obj = ins.toJSON();
    return obj;
}

exports.findOneFavorites = async function ({ FavoriteId } = {}) {
    // 获取一个收藏夹以及收藏夹内的歌曲信息
    // 进行参数校验
    if (!checkedArgumentsNotNull(FavoriteId)) { // 检查参数是否缺失
        throw new TypeError("findOneFavorites has arguments is null or undefined");
    }
    if (!checkAllType([FavoriteId], [getType(1)])) { // 检查参数类型
        throw new TypeError("findOneFavorites has arguments type not expect");
    }



    const ins = await Favorites.findOne({
        where: {
            id: FavoriteId
        }
    });
    const data = await findFavoriteSheets({ FavoriteId }) // 找到这个收藏夹的所有歌曲


    return {
        favorite: ins,
        data
    };
}

/**
 * 找到一个用户所有的收藏夹信息
 * @param {*} param0 
 * @returns 
 */
exports.findUserAllFavorites = async function ({ UserId } = {}) {
    // 获取一个收藏夹以及收藏夹内的歌曲信息
    // 进行参数校验
    if (!checkedArgumentsNotNull(UserId)) { // 检查参数是否缺失
        throw new TypeError("findUserAllFavorites has arguments is null or undefined");
    }
    if (!checkAllType([UserId], [getType(1)])) { // 检查参数类型
        throw new TypeError("findUserAllFavorites has arguments type not expect");
    }

    const ins = await Favorites.findAll({
        where: {
            UserId
        }
    });

    const favoriteListPro = ins.map(it => {
        return exports.findOneFavorites({
            FavoriteId: it.id
        })
    })

    const data = await Promise.all(favoriteListPro)

    return {
        data
    };
}

/**
 * 找到用户所有的收藏夹目录信息
 * @param {*} param0 
 * @returns 
 */
exports.findUserAllFavoriteContext = async function ({ UserId } = {}) {
    // 获取一个收藏夹以及收藏夹内的歌曲信息
    // 进行参数校验
    if (!checkedArgumentsNotNull(UserId)) { // 检查参数是否缺失
        throw new TypeError("findUserAllFavoriteContext has arguments is null or undefined");
    }
    if (!checkAllType([UserId], [getType(1)])) { // 检查参数类型
        throw new TypeError("findUserAllFavoriteContext has arguments type not expect");
    }

    const ins = await Favorites.findAll({
        where: {
            UserId
        }
    });

    return ins;
}


/**
 * 获取歌曲收藏在用户的收藏夹
 * @param {*} param0 
 * @returns 
 */
exports.getSongStatusInFavorite = async function ({ UserId, SongId } = {}) {
    // 获取一个收藏夹以及收藏夹内的歌曲信息
    // 进行参数校验
    if (!checkedArgumentsNotNull(UserId, SongId)) { // 检查参数是否缺失
        throw new TypeError("getSongStatusInFavorite has arguments is null or undefined");
    }
    if (!checkAllType([UserId, SongId], [getType(1), getType(1)])) { // 检查参数类型
        throw new TypeError("getSongStatusInFavorite has arguments type not expect");
    }

    const ins = await Favorites.findAll({
        where: {
            UserId
        }
    });

    const favoriteArray = ins.map(it => it.id);

    res = await Sheet.findAll({
        where: {
            SongId
        }
    })

    // 我的想法是整合数据后返回一个id数组，这个id数组包括了这条歌曲所在的收藏夹，并且这个收藏夹是该用户的


    return res.filter(it => {
        return favoriteArray.includes(it.FavoriteId);
    });
}



/**
 * 修改歌曲在收藏夹的状态
 * @param {*} param0 
 * @returns 
 */
exports.changeSongInFavorite = async function ({ UserId, SongId, config } = {}) {
    // 获取一个收藏夹以及收藏夹内的歌曲信息
    // 进行参数校验
    if (!checkedArgumentsNotNull(UserId, SongId, config)) { // 检查参数是否缺失
        throw new TypeError("changeSongInFavorite has arguments is null or undefined");
    }
    if (!checkAllType([UserId, SongId], [getType(1), getType(1)])) { // 检查参数类型
        throw new TypeError("changeSongInFavorite has arguments type not expect");
    }

    const {
        lastExistButNowNoExist, // 之前存在但现在不存在的数组项
        lastNoExistButNowExist // 之前不存在但现在存在的数组项
    } = config;

    lastExistButNowNoExist // 要删除收藏夹

    const res1 = await Sheet.destroy({
        where: {
            [Op.and]: [
                { SongId },
                {
                    FavoriteId: {
                        [Op.in]: lastExistButNowNoExist
                    }
                }
            ]
        }
    })

    const res2 = await Sheet.bulkCreate( // 新增收藏夹信息
        lastNoExistButNowExist.map(id => ({
            FavoriteId: id,
            SongId: SongId
        }))
    )


    return {
        res1,
        res2
    }
}


/**
 * 修改收藏夹信息
 * @param {*} param0 
 * @returns 
 */
exports.changeFavoriteInfo = async function ({ uploadSrc, newTitle, favoriteId, isPublic } = {}) {
    if (!checkedArgumentsNotNull(uploadSrc, newTitle, favoriteId, isPublic)) { // 检查参数是否缺失
        throw new TypeError("changeFavoriteInfo has arguments is null or undefined");
    }
    if (!checkAllType([uploadSrc, newTitle, favoriteId, isPublic], [getType(""), getType(""), getType(1), getType(true)])) { // 检查参数类型
        throw new TypeError("changeFavoriteInfo has arguments type not expect");
    }

    return Favorites.update({
        coverUrl: uploadSrc,
        name: newTitle,
        isPublic: isPublic ? 1 : 0
    }, {
        where: {
            id: + favoriteId
        }
    })
}

// 获取收藏夹的作者信息
exports.getFavoriteAuthor = async function ({ UserId } = {}) {
    if (!checkedArgumentsNotNull(UserId)) { // 检查参数是否缺失
        throw new TypeError("getFavoriteAuthor has arguments is null or undefined");
    }
    if (!checkAllType([UserId], [getType(1)])) { // 检查参数类型
        throw new TypeError("getFavoriteAuthor has arguments type not expect");
    }

    return User.findOne({
        where: {
            id: UserId
        }
    })
}

// 取消收藏某条歌曲
exports.cancelSongFavorite = async function ({ FavoriteId, SongId } = {}) {
    if (!checkedArgumentsNotNull(FavoriteId, SongId)) { // 检查参数是否缺失
        throw new TypeError("cancelSongFavorite has arguments is null or undefined");
    }
    if (!checkAllType([FavoriteId, SongId], [getType(1), getType(1)])) { // 检查参数类型
        throw new TypeError("cancelSongFavorite has arguments type not expect");
    }

    return Sheet.destroy({
        where: {
            FavoriteId,
            SongId
        }
    })
}


// 删除某个收藏夹
exports.deleteFavorite = async function ({ FavoriteId, UserId } = {}) {
    if (!checkedArgumentsNotNull(FavoriteId, UserId)) { // 检查参数是否缺失
        throw new TypeError("deleteFavorite has arguments is null or undefined");
    }
    if (!checkAllType([FavoriteId, UserId], [getType(1), getType(1)])) { // 检查参数类型
        throw new TypeError("deleteFavorite has arguments type not expect");
    }

    const ins = await Favorites.findOne({ // 检验是否是用户本人发起的删除收藏夹的请求
        where: {
            UserId,
            id: FavoriteId
        }
    })
    try {
        let res = ins.toJSON();
        if(res.UserId !== UserId){
            // 非用户本人
            throw new Error("illegal author request delete")
        }

        await Sheet.destroy({
            where: {
                FavoriteId
            }
        }) // 删除收藏夹的收藏信息
    
        return Favorites.destroy({
            where: {
                id: FavoriteId
            }
        }) // 删除收藏夹的收藏信息

    } catch (e) {
        // 非用户发出的请求
        throw  new Error("illegal author request delete")
    }


    
}