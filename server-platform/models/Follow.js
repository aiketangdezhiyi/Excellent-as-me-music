// User 表
const sequelize = require("./index");
const { DataTypes } = require("sequelize");

module.exports = sequelize.define("Follow", {
    fromId: { // 谁
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // 关注
    attentionId: { // 谁
        type: DataTypes.INTEGER,
        allowNull: false
    },

});