const sequelize = require('./index');
require("./User"); // 用户
require("./Song"); // 歌曲信息
require("./Favorites"); // 收藏夹
require("./Sheet"); // 收藏夹信息
require("./Follow"); // 收藏夹信息

// require("./relation.js");  // 模型之间建立联系
// 先创建模型实例，再同步
sequelize.sync({
    alter : true
}).then(()=>{
    console.log("模型同步完成");
})