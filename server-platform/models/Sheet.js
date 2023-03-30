// User 表
const sequelize = require("./index");
const { DataTypes } = require("sequelize");

module.exports = sequelize.define("Sheet", { // 歌单与Favorite有一对多的关系
    // 该表与user建立关联，可以找到歌曲上传用户的信息
    FavoriteId: { // 属于哪个收藏夹
        type: DataTypes.INTEGER,
        allowNull: false
    },
    SongId: { // 这条歌曲的id
        type: DataTypes.INTEGER,
        allowNull: false
    },

});