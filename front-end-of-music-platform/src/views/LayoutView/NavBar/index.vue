<template>
  <div class="navbar-container">
    <div class="navbar-content">
      <ul class="own-nav">
        <li v-for="item in navItems" :key="item.name">
          <router-link :to="item.to">{{ item.name }}</router-link>
        </li>
      </ul>
      <span class="line"></span>
      <ul class="out-nav">
        <li v-for="item in externalLinks" :key="item.link">
          <a :href="item.link" target="_blank">{{ item.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { navItems, externalLinks } from "./config";
export default {
  data() {
    this.navItems = navItems;
    this.externalLinks = externalLinks;
    return {};
  },
};
</script>

<style lang="less" scoped>
.navbar-container {
  width: 100%;
  height: 55px;
  background-color: #2c323b;
  position: relative;
  z-index: 999;
  .navbar-content {
    width: 1140px;
    margin: 0 auto !important;
    display: flex;
    ul.own-nav {
      display: flex;
      height: 100%;
      li {
        height: 100%;
        line-height: 55px;
        a {
          color: #fff;
          padding: 0 25px;
          height: 100%;
          display: inline-block;
          &:hover,
          &.router-link-exact-active {
            background-color: #0c8ed9;
          }
        }
      }
    }
    .out-nav {
      display: flex;
      justify-content: space-between;
      li {
        height: 55px;
        line-height: 55px;
        a {
          padding: 0 18px;
          color: hsla(0, 0%, 100%, 0.65);
          font-size: 14px;
          &:hover {
            color: #e5d790;
          }
        }
      }
    }
    .line {
      width: 1px;
      height: 30px;
      background-color: hsla(0, 0%, 100%, 0.65);
      margin-right: 10px;
      margin-top: 12.5px;
    }
  }
}
</style>