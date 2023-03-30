<template>
  <div class="navbar-container w-100" :class="{
    scroll: isChangeNavbarBlack,
  }">
    <div class="navbar-wrapper mx-auto">
      <a href="/" class="yw-logo"> 勿忘我 </a>
      <ul class="navbar-link-wrapper">
        <li class="navbar-item"><a class="active" href="/">首页</a></li>
        <li class="navbar-item"><a href="http://yujiannixs.site">博客</a></li>
        <li class="navbar-item">
          <Wechat />
        </li>
        <li class="navbar-item">
          <a href="https://space.bilibili.com/34509109">bilibili</a>
        </li>

        <li class="navbar-item">
          <User />
        </li>
      </ul>

      <!-- 写两个的原因是因为如果动态判断屏幕尺寸更浪费效率 -->
      <ul ref="menuContainer" class="navbar-link-wrapper m-768" :style="{
        height: isShowHiddenMenu ? '300px' : 0,
      }">
        <li class="navbar-item"><a class="active" href="/">首页</a></li>
        <li class="navbar-item">
          <Wechat />
        </li>
        <li class="navbar-item">
          <a href="http://yujiannixs.site">博客</a>
        </li>
        <li class="navbar-item">
          <a href="https://space.bilibili.com/34509109">bilibili</a>
        </li>
        <li class="navbar-item">
          <User />
        </li>
      </ul>
      <TButtonComp @click.native="changeShow" />
    </div>
  </div>
</template>

<script>
import Wechat from "./about";
import User from "./user";
import TButtonComp from "@/components/TButtonComp";
import { getScrollOffset } from "@/utils/dom.js";
import { debounce } from "@/utils/optimize";

export default {
  components: {
    Wechat,
    TButtonComp,
    User,
  },
  data() {
    return {
      isChangeNavbarBlack: false,
      isShowHiddenMenu: false,
    };
  },
  mounted() {
    this.scrollEventWithDebounce = debounce(this.scrollEvent);
    document.addEventListener("scroll", this.scrollEventWithDebounce);
  },
  destroyed() {
    document.removeEventListener("scroll", this.scrollEventWithDebounce);
  },
  methods: {
    scrollEvent() {
      if (getScrollOffset().y > 10) {
        this.isChangeNavbarBlack = true;
      } else {
        this.isChangeNavbarBlack = false;
      }
    },
    changeShow() {
      this.isShowHiddenMenu = !this.isShowHiddenMenu;
    },
  },
};
</script>

<style lang="less" scoped>
.navbar-container {
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  transition: background-color 0.5s;

  &.scroll {
    background-color: #26282c;

    .navbar-wrapper {
      padding-top: 0;
    }

    a {
      &.active {
        border-bottom: 5px solid #f2b535;
        box-sizing: border-box;
      }
    }
  }

  .navbar-wrapper {
    width: 1140px;
    height: 60px;
    display: flex;
    align-items: center;
    padding-top: 15px;
    transition: all 0.5s;
    justify-content: space-between;

    .yw-logo {
      font-size: 40px;
      letter-spacing: 1px;
      color: #fff;
      text-shadow: -1px -1px 3px rgba(255, 255, 255, 0.9),
        1px 1px 3px rgba(0, 0, 0, 0.3);
    }

    .yw-logo img {
      display: block;
      width: 60px;
      height: 60px;
    }
  }

  .navbar-link-wrapper {
    margin-bottom: 0;
    height: 60px;

    &.m-768 {
      display: none;
    }

    .navbar-item {
      float: left;
      height: 100%;
      width: 80px;
      text-align: center;
      font-size: 18px;
      line-height: 60px;

      a {
        height: 100%;
        display: inline-block;
        color: hsla(0, 0%, 100%, 0.65);
        font-weight: 400;

        &.active,
        &:hover {
          color: #f2b535;
        }
      }
    }
  }
}

@media screen and (max-width: 1200px) and (min-width: 992px) {

  // 960
  .navbar-container .navbar-wrapper {
    width: 960px;
  }
}

@media screen and (max-width: 992px) and (min-width: 768px) {

  // 720
  .navbar-container .navbar-wrapper {
    width: 720px;
  }
}

@media screen and (max-width: 768px) and(min-width : 576px) {

  // 540
  .navbar-container .navbar-wrapper {
    width: 540px;
  }

  .navbar-container .navbar-wrapper {
    width: 85%;
    padding-top: 0;
  }

  .navbar-container .navbar-wrapper .navbar-link-wrapper {
    display: none;
  }

  .navbar-container .navbar-wrapper .navbar-link-wrapper {
    &.m-768 {
      display: block;
      position: fixed;
      width: 100vw;
      left: 0;
      top: 60px;
      height: 0;
      transition: height 0.5s;
      overflow: hidden;

      .navbar-item {
        float: none;
        width: 100%;
        height: 60px;
        text-align: center;
        background-color: rgba(255, 255, 255, 0.9);
        border-bottom: 1px solid #ccc;
        box-sizing: border-box;

        a {
          color: #333;
        }
      }
    }
  }
}

@media screen and (max-width: 576px) {

  // 95%
  .navbar-container .navbar-wrapper {
    width: 95%;
  }

  .navbar-container .navbar-wrapper {
    width: 540px;
  }

  .navbar-container .navbar-wrapper {
    width: 85%;
    padding-top: 0;
  }

  .navbar-container .navbar-wrapper .navbar-link-wrapper {
    display: none;
  }

  .navbar-container .navbar-wrapper .navbar-link-wrapper {
    &.m-768 {
      display: block;
      position: fixed;
      width: 100vw;
      left: 0;
      top: 60px;
      height: 0;
      transition: height 0.5s;
      overflow: hidden;

      .navbar-item {
        float: none;
        width: 100%;
        height: 60px;
        text-align: center;
        background-color: rgba(255, 255, 255, 0.9);
        border-bottom: 1px solid #ccc;
        box-sizing: border-box;

        a {
          color: #333;
        }
      }
    }
  }
}</style>