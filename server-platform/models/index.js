const { Sequelize } = require("sequelize");

module.exports = new Sequelize("music_db", "root", "123456", {
  host: "localhost", // 连接的服务器路径
  dialect: "mysql", // 数据库类型
  logging: null, // 是否打印日志
  pool: {
    max: 8,
    min: 0,
    acquire: 30000, // 连接时间超过30000毫秒就会抛出错误
    idle: 10000, // 连接超过10000毫秒没有被连接就被释放
  },
}); // 连接数据库

// 正式上线就做一个日志记录

// https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor
