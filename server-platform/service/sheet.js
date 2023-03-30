// 收藏夹
const Sheet = require("../models/Sheet");
const { getType, checkAllType, checkedArgumentsNotNull } = require("./utils/index.js");
const { findOneSong } = require("./song");
const { getUserPublicInfo } = require("./user");

/**
 * 根据给收藏夹id找到所有的歌单信息
 * @param {*} param0 
 * @returns 
 */
exports.findFavoriteSheets = async function ({ FavoriteId } = {}) {
    // 进行参数校验
    if (!checkedArgumentsNotNull(FavoriteId)) { // 检查参数是否缺失
        throw new TypeError("findFavoriteSheets has arguments is null or undefined");
    }
    if (!checkAllType([FavoriteId], [getType(1)])) { // 检查参数类型
        throw new TypeError("findFavoriteSheets has arguments type not expect");
    }


    let { count, rows } = await Sheet.findAndCountAll({
        where: {
            FavoriteId
        }
    })

    rows = rows.map(it => {
        return findOneSong({
            songId: it.SongId
        })
    })

    let data = await Promise.all(rows);

    data = data.map(it=>it.toJSON());

    // 找到所有歌曲的创作者

    const userInfos = await Promise.all(data.map(async it => {
        return getUserPublicInfo(it.UserId);
    }))

    for (let i = 0; i < data.length; i++) {
        data[i].userInfo = userInfos[i];  
    }

    return {
        count,
        rows: data
    };
}


exports.deleteSheetWithSong = async function ({SongId}) {
    // 进行参数校验
    if (!checkedArgumentsNotNull(SongId)) { // 检查参数是否缺失
        throw new TypeError("deleteSheetWithSong has arguments is null or undefined");
    }
    if (!checkAllType([SongId], [getType(1)])) { // 检查参数类型
        throw new TypeError("deleteSheetWithSong has arguments type not expect");
    }

    // 别人收藏夹的歌曲也会被删除
    return Sheet.destroy({
        where : {
            SongId
        }
    })

}