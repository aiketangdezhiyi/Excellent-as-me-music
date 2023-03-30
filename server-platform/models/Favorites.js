// User 表
const sequelize = require("./index");
const { DataTypes } = require("sequelize");

module.exports = sequelize.define("Favorite", { // 收藏夹
    // 该表与user建立关联，可以找到歌曲上传用户的信息
    UserId : { // 这个收藏夹属于哪个用户的
        type: DataTypes.INTEGER
    },
    name: { // 收藏夹名称
        type: DataTypes.STRING(50),
        allowNull: false
    },
    coverUrl : { // 封面
        type : DataTypes.STRING(128),
        defaultValue : "/favorite/sheet_bg.webp"
    },
    isPublic : { // 是否是公开的收藏夹
        type : DataTypes.BOOLEAN,
        defaultValue : true
    }
},{
    paranoid : true // 一般数据库中的数据都不会真正删除，而是做一个删除记录的列
});