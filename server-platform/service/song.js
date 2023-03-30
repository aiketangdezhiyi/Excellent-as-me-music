const Song = require("../models/Song");
const { Op } = require("sequelize"); // 导入运算符
const { getType, checkAllType, checkedArgumentsNotNull } = require("./utils/index.js");
const { getOptions, getSearchOptions, getKeyWordOptions, getKeyWordUserOptions } = require("./utils/song");
const load = require("audio-loader"); // 歌曲加载器 用于获取歌曲的长度
const path = require("path");
const User = require("../models/User");
const fs = require("fs");
const Sheet = require("../models/Sheet");
// const { deleteSheetWithSong } = require("./sheet");
const serverPath = path.resolve(__dirname, "../public");

const deleteSheetWithSong = async function ({SongId}) {
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

// 添加一条歌曲
exports.addSong = async function ({ url, UserId, originName, duration = 0,type = 0 } = songInfo) {
    // 进行参数校验
    if (!checkedArgumentsNotNull(url, duration,UserId, originName)) {
        throw new TypeError("addSong has arguments is null or undefined");
    }
    const valueType = getType("");
    if (!checkAllType([url, UserId, duration,originName], [valueType, getType(1),getType(1), valueType])) {
        throw new TypeError("addSong has arguments type not expect");
    }



    const status = type === 0 ? -1 : 1; // 审核状态
    

    ins = await Song.create({
        url,
        UserId,
        originName,
        creative: type === 1 ? 1 : 0,
        status,
        duration
    });

    const obj = ins.toJSON();
    return obj;
}

/**
 * keyword 若关键词为空，搜索全部歌曲，进行分页操作
 * @param {*} param0 
 */
exports.searchSongListWithUserId = async function ({ UserId, page = 1, keyword, size = 10, option = 0 } = {}) {
    if (!checkedArgumentsNotNull(UserId)) {
        throw new TypeError("searchSongListWithUserId has arguments is null or undefined");
    }
    if (keyword == "" || keyword == null) {
        // 
        keyword = ""; // 默认全部

    }
    try {
        const findOption = getOptions(option, {
            UserId,
            page,
            size,
            keyword
        })

        let { count, rows } = await Song.findAndCountAll(findOption);

        let user = await User.findOne({
            where: {
                id: UserId
            }
        })

        user = user.toJSON();


        const userInfo = {
            id: user.id,
            username: user.username,
            avatarUrl: user.avatarUrl
        };



        rows = rows.map(it => {
            const obj = it.toJSON();
            obj.userInfo = userInfo;
            return obj
        });

        return {
            count,
            data: rows // 往歌曲信息里注入用户信息
        }


    } catch (err) {
        return null;
    }


}

exports.findOneSong = async function ({ songId }) {
    if (!checkedArgumentsNotNull(songId)) {
        throw new TypeError("findOneSong has arguments is null or undefined");
    }

    if (!checkAllType([songId], [getType(1)])) {
        throw new TypeError("findOneSong has arguments type not expect");
    }

    return await Song.findOne({
        where: {
            id: songId
        }
    })
}

exports.songDuration = async function ({ url }) {
    if (!checkedArgumentsNotNull(url)) {
        throw new TypeError("songDuration has arguments is null or undefined");
    }

    if (!checkAllType([url], [getType("")])) {
        throw new TypeError("songDuration has arguments type not expect");
    }
    const duration = await load(path.resolve(serverPath, "./" + url)).then(res => {
        return Math.round(res.duration);
    })

    return duration
}


// 查找歌曲
exports.searchSong = async function ({ page = 1, keyword, size = 10 } = {}) {

    if (!checkedArgumentsNotNull(page, size)) {
        throw new TypeError("searchSongListWithUserId has arguments is null or undefined");
    }

    if (keyword == "" || keyword == null) {
        // 
        keyword = ""; // 默认全部

    }

    try {
        const findOption = getSearchOptions({
            page,
            size,
            keyword
        })

        let { count, rows } = await Song.findAndCountAll(findOption);


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


exports.searchKeyWord = async function ({ keyword } = {}) {
    try {
        const findOption = getKeyWordOptions({
            keyword
        })

        let rows = await Song.findAll(findOption);

        rows = rows.map(it => {
            let originName = it.toJSON().originName;
            let idx = originName.lastIndexOf(".");
            if (idx > 0) {
                originName = originName.substring(0, idx);
            }
            idx = originName.indexOf("-");
            if (idx > 0) {
                return {
                    prop: "song",
                    title: originName.split("-")[1].trim()
                }
            } else {
                return {
                    prop: "song",
                    title: originName.trim()
                }
            }

        })
        if (rows.length < 5) {
            // 如果搜出来的长度＜5 再多加搜索个人名称
            const userRows = await User.findAll(getKeyWordUserOptions({ keyword }));
            rows.concat(userRows.map(it => {
                return {
                    title: it.toJSON().username,
                    prop: "user"
                }
            }))
        }


        return rows


    } catch (err) {
        return null;
    }


}

// 根据数组id 恢复歌曲数据
exports.recoverySong = async function (songList) {

    if (!checkedArgumentsNotNull(songList)) {
        throw new TypeError("recoverySong has arguments is null or undefined");
    }

    if (!checkAllType([songList], [getType([])])) {
        throw new TypeError("recoverySong has arguments type not expect");
    }


    try {

        let rows = await Song.findAll({
            where: {
                id: {
                    [Op.in]: songList
                }
            }
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
        return rows // 往歌曲信息里注入用户信息
    } catch (err) {
        return null;
    }
}


exports.changeSongName = async function ({ id, newSongName, userId }) {

    if (!checkedArgumentsNotNull(id, newSongName, userId)) {
        throw new TypeError("changeSongName has arguments is null or undefined");
    }

    if (!checkAllType([id, newSongName, userId], [getType(1), getType(""), getType(1)])) {
        throw new TypeError("changeSongName has arguments type not expect");
    }

    return Song.update({
        originName: newSongName
    }, {
        where: {
            id,
            UserId: userId
        }
    })
}

exports.changeSongToUnCreative = async function ({ id, userId }) {
    // 修改歌曲为非创作歌曲
    if (!checkedArgumentsNotNull(id, userId)) {
        throw new TypeError("changeSongToUnCreative has arguments is null or undefined");
    }

    if (!checkAllType([id, userId], [getType(1), getType(1)])) {
        throw new TypeError("changeSongToUnCreative has arguments type not expect");
    }

    return Song.update({
        creative: 0,
        status: -1
    }, {
        where: {
            id,
            UserId: userId
        }
    })
}

exports.changeLyric = async function ({ id,lyric,lyricProviderId }) {
    // 修改歌曲为非创作歌曲
    if (!checkedArgumentsNotNull( id,lyric,lyricProviderId)) {
        throw new TypeError("changeSongToUnCreative has arguments is null or undefined");
    }

    if (!checkAllType([ id,lyric,lyricProviderId], [getType(1),getType(""),getType(1)])) {
        throw new TypeError("changeSongToUnCreative has arguments type not expect");
    }
    // 准确来说需要验证提供者信息是否存在

    return Song.update({
        lyricProviderId,
        lyric
    }, {
        where: {
            id,
        }
    })
}


exports.applySongToCreative = async function ({ id, userId, userDesc = "" }) {
    // 申请创作歌曲
    if (!checkedArgumentsNotNull(id, userId)) {
        throw new TypeError("applySongToCreative has arguments is null or undefined");
    }

    if (!checkAllType([id, userId], [getType(1), getType(1)])) {
        throw new TypeError("applySongToCreative has arguments type not expect");
    }

    return Song.update({
        creative: 1,
        status: 1,
        userDesc
    }, {
        where: {
            id,
            UserId: userId
        }
    })
}

exports.applySongToCreative = async function ({ id, userId, userDesc = "" }) {
    // 申请创作歌曲
    if (!checkedArgumentsNotNull(id, userId)) {
        throw new TypeError("applySongToCreative has arguments is null or undefined");
    }

    if (!checkAllType([id, userId], [getType(1), getType(1)])) {
        throw new TypeError("applySongToCreative has arguments type not expect");
    }

    return Song.update({
        creative: 1,
        status: 1,
        userDesc
    }, {
        where: {
            id,
            UserId: userId
        }
    })
}


exports.deleteSong = async function ({ id, userId, url }) {
    // 删除歌曲文件和歌曲信息
    if (!checkedArgumentsNotNull(id, userId)) {
        throw new TypeError("deleteSong has arguments is null or undefined");
    }

    if (!checkAllType([id, userId], [getType(1), getType(1)])) {
        throw new TypeError("deleteSong has arguments type not expect");
    }

    const subPath = "../public"

    try {
        await fs.promises.unlink(path.resolve(__dirname, subPath + url))
    } catch(err) {
        console.log(err);
    }


    // 如果歌曲在收藏夹内就需要删除收藏夹信息

    await deleteSheetWithSong({
        SongId : id
    }) // 删除收藏夹信息

    return Song.destroy({
        where: {
            id,
            UserId: userId
        }
    })
}



