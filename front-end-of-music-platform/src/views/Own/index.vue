<template>
  <div class="own-container" ref="ownContainer">
    <div class="own-selecter-menu" @mouseleave="handleMouseLeave">
      <router-link
        ref="selectItem"
        @mouseover.native="handleMouseOver(i)"
        v-for="(item, i) in menu"
        :to="item.to"
        exact-active-class="own-active-link"
        :key="item.title"
        >{{ item.title }}</router-link
      >
      <div
        class="smooth-cursor"
        :style="{
          width: cursorConfig.width + 'px',
          left: cursorConfig.left + 'px',
          transition,
        }"
      ></div>
    </div>
    <div class="content">
      <div class="own-left-content">
        <el-avatar
          style="margin: 0 auto; margin-top: 27px; display: block"
          shape="square"
          :size="180"
          :src="avatarUrl"
        ></el-avatar>
        <p>昵称:{{ username }}</p>
        <p>(账号名:{{ user }})</p>
      </div>
      <div class="own-right-content">
        <transition name="slide" appear mode="out-in" :duration="500">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { ownLinkMenu } from "./config";

export default {
  data() {
    this.menu = ownLinkMenu;
    return {
      cursorConfig: {
        width: 100,
        left: 0,
      },
      transition: "none",
    };
  },
  mounted() {
    this.handleMouseLeave();
    window.requestAnimationFrame(() => {
      this.transition = `width 0.3s ease-in, left 0.3s ease-in`;
    });
  },
  computed: {
    ...mapState("User", ["avatarUrl", "username", "user"]),
  },
  methods: {
    handleMouseOver(i) {
      // 控制小滑线
      const linkDom = this.$refs.selectItem[i].$el;
      this.cursorConfig.left = linkDom.offsetLeft;
      this.cursorConfig.width = linkDom.offsetWidth;
    },
    handleMouseLeave() {
      // 鼠标离开的时候，小滑线回到激活位置
      const activeClass = "own-active-link";
      for (let i = 0; i < this.$refs.selectItem.length; i++) {
        if (this.$refs.selectItem[i].$el.classList.contains(activeClass)) {
          // 找到激活项
          this.handleMouseOver(i);
          break;
        }
      }
    },
  },
  watch: {
    "$route.path": function () {
      setTimeout(() => {
        this.handleMouseLeave();
      }, 0);
    },
  },
};
</script>

<style lang="less"  scoped>
@import "~@/styles/myStyle.less";
@import "~@/styles/slidetransition.less";

.own-container {
  width: 1140px;
  margin: 0 auto;
  margin-bottom: 30px; // test
  background: #fff;
  box-sizing: border-box;
  -webkit-user-select: auto; /* Safari */
  -ms-user-select: auto; /* IE 10+ and Edge */
  user-select: auto; /* Standard syntax */

  .own-selecter-menu {
    display: flex;
    text-align: center;
    position: relative;
    box-sizing: border-box;
    padding-left: 227px;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;

    a {
      font-size: 18px;
      // color: #fff;
      font-weight: 500;
      margin: 0 10px;
      display: block;
      height: 50px;
      line-height: 50px;
      &.own-active-link {
        // background: #2c323b !important;
        // color: #fff;
        color: @blue;
      }
      &:hover {
        color: @blue;
      }
    }
    .smooth-cursor {
      height: 5px;
      background: @blue;
      border-radius: 5px;
      position: absolute;
      bottom: 0;
      transform: translateY(50%);
    }
  }
  .content {
    width: 100%;
    display: flex;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
    .own-left-content {
      width: 227px;
      height: 10000px;
      margin-bottom: -9990px;
      background: #e2f4ff;
      box-shadow: inset -3px 0 3px #e1e1e1;
      p {
        text-align: center;
        color: #007ac1;
      }
    }
    .own-right-content {
      width: calc(100% - 227px);
      overflow: hidden;
      height: 100%;
    }
  }
}
</style>