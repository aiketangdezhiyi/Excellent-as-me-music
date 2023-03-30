// User 表
const sequelize = require("./index");
const { DataTypes } = require("sequelize"); // ORM框架

module.exports = sequelize.define("User", { // 建立模型
    username: { // 用户名
        type: DataTypes.STRING(50)
    },
    user : {
        type : DataTypes.STRING(50)
    },
    pwd: {
        type: DataTypes.STRING(50)
    },
    sex: {
        type: DataTypes.BOOLEAN,
        defaultValue : 1, // 1 男 0 女
    },
    exp : {
        type : DataTypes.INTEGER,
        defaultValue : 0
    },
    signature : {
        type: DataTypes.STRING(128),
        defaultValue : ""
    },
    avatarUrl: {
        // 头像地址
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue : "https://img0.baidu.com/it/u=3715484268,3310425559&fm=26&fmt=auto&gp=0.jpg" // 用户注册时不要求上传头像
    }
},{
    paranoid : true // 一般数据库中的数据都不会真正删除，而是做一个删除记录的列
});