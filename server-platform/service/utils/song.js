const { Op } = require("sequelize"); // 导入运算符

/**
 * 
 * @param {*} type 类型
 * @param {*} params 参数对象 
 */
exports.getOptions = function (type, { page, size, keyword, UserId }) {
    let findOption = { // 查找的配置对象
        where: {
            [Op.and]: [
                {
                    UserId: {
                        [Op.eq]: UserId
                    }
                },
                {
                    originName: {
                        [Op.like]: `%${keyword}%`
                    }
                }
            ],
            [Op.not] : [{ // 不查询正在审核或审核不通过的歌曲
                creative : 1
            },{
                status : {
                    [Op.in] : [0,1]
                }
            }]
        },
        offset: (+ page - 1) * size, // 一个类型把老子整了那么久
        limit: + size,

    }
    type = + type;
    switch (type) {
        case 0: { // 最近上传
            findOption.order = [['createdAt', 'DESC']]
        }
            break;
        case 1: { // 播放量最高 只找creative为true 并且按顺序
            findOption.order = [["broadcast"]];
            findOption.where[Op.and].push({
                creative: 1, // 创作歌曲
            })
        }
            break;
        case 2: { // 只看创作歌曲
            findOption.order = [['createdAt', 'DESC']]
            findOption.where[Op.and].push({
                creative: 1, // 创作歌曲
            })
        }
            break;
        default:
            break;
    }

    return findOption;

}


exports.getSearchOptions = function ({ page, size, keyword }) {
    let findOption = { // 查找的配置对象
        where: {
            originName: {
                [Op.like]: `%${keyword}%`
            },
            [Op.not] : [{ // 不查询正在审核或审核不通过的歌曲
                creative : 1
            },{
                status : {
                    [Op.in] : [0,1]
                }
            }]
        },
        offset: (+ page - 1) * size, // 一个类型把老子整了那么久
        limit: + size,
        order: [['createdAt', 'DESC'], ["broadcast"]]
    }


    return findOption;

}


exports.getKeyWordOptions = function ({ keyword }) {
    let findOption = { // 查找的配置对象
        where: {
            originName: {
                [Op.like]: `%${keyword}%`
            }
        },

    }
    return findOption;
}


exports.getKeyWordUserOptions = function ({ keyword }) {
    let findOption = { // 查找的配置对象
        where: {
            username: {
                [Op.like]: `%${keyword}%`
            }
        },

    }
    return findOption;
}