import Vue from 'vue'
import Vuex from 'vuex'
import User from "./User";
import Song from "./Song";
import Favorite from "./Favorite";
import Visit from "./Visit";

Vue.use(Vuex)

export default new Vuex.Store({
  modules : {
    User,
    Song,
    Favorite,
    Visit
  },
  strict: process.env.NODE_ENV !== 'production' // 开启严格模式，数据的改动必须通过mutation函数
})

// console.log(process.env.NODE_ENV);