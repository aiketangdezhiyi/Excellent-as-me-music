const User = require("./User"); // 用户名
const Song = require("./Song"); // 歌曲信息

const Favorites = require("./Favorites"); // 收藏夹
const Sheet = require("./Sheet"); // 收藏夹信息

const Follow = require("./Follow"); // 关注信息
// 建立关联

User.hasMany(Song); // 一个用户可以上传很多条歌曲
User.hasMany(Favorites) // 一个用户可以有多个收藏夹 用户一开始都有一个默认的收藏夹
Favorites.hasMany(Sheet); // 每个收藏夹有多条歌单信息
Song.hasMany(Sheet); // 歌曲一对一歌单信息


Follow.belongsTo(User,{
    foreignKey : "fromId"
})
Follow.belongsTo(User,{
    foreignKey : "attentionId"
})
