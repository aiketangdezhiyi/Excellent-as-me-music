// User 表
const sequelize = require("./index");
const { DataTypes } = require("sequelize");

module.exports = sequelize.define("Song", { // 建立模型
    // 该表与user建立关联，可以找到歌曲上传用户的信息
    UserId: {
        type: DataTypes.INTEGER
    },
    url: { // 保存在服务器的访问路径
        type: DataTypes.STRING(128),
        allowNull: false
    },
    originName: {
        // 原始文件的名字
        type: DataTypes.STRING,
        allowNull: false
    },
    lyric: {
        type: DataTypes.STRING(4096),
        allowNull: true
    },
    lyricProviderId: { // 歌词提供者
        type: DataTypes.INTEGER,
        allowNull: true
    },
    creative: { // 是否为创作歌曲
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    status: { // 审核状态 -1 非创作歌曲 0 创作歌曲审核不通过 1 创作歌曲审核中 2 创作歌曲审核通过
        type: DataTypes.TINYINT,
        defaultValue: -1
        // 当creative为true时此状态生效
    },
    broadcast: { // 播放量 
        type: DataTypes.BIGINT,
        defaultValue: 0
    },
    duration: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    collect: { // 被添加到歌单的数量
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    userDesc : { // 用户申请说明
        type: DataTypes.STRING(512),
        allowNull: true
    },
    respondDesc : { // 歌曲审核回应说明
        type: DataTypes.STRING(512),
        allowNull: true
    }
}, {
    paranoid: true // 一般数据库中的数据都不会真正删除，而是做一个删除记录的列
});