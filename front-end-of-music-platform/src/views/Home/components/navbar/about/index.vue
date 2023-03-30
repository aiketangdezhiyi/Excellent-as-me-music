<template>
  <ul class="about-wrapper">
    <li
      @mouseover="showWrapper(item, index)"
      @mouseleave="showIndex = -1"
      v-for="(item, index) in aboutInfos"
      :key="item.name"
    >
      <a :href="item.src">{{ item.name }}</a>
      <div
        v-if="item.hasImage"
        :class="{
          active: index === showIndex,
        }"
        class="showWrapper"
      >
        <img :src="item.src" />
      </div>
    </li>
  </ul>
</template>

<script>
import wxsrc from "@/assets/wx.jpg";
export default {
  props: {
    lastItemStyle: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      showIndex: -1, // 控制展现的元素
      aboutInfos: [
        {
          src: wxsrc,
          name: "微信",
          hasImage: true,
        },
      ],
    };
  },
  methods: {
    showWrapper(item, index) {
      this.showIndex = index;
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./animation.less");
.about-wrapper {
  width: 100%;
  height: 100%;
  display: flex;

  justify-content: space-around;
  li {
    position: relative;
    a {
      color: hsla(0, 0%, 100%, 0.65);
    }
    .showWrapper {
      position: absolute;
      width: 180px;
      z-index: 5000;
      left: 0;
      img {
        width: 100%;
        display: block;
        border: 1px solid #e7e6e7;
      }
      transform-origin: center top;
      transform: rotateX(90deg) translateX(-46%);
      top: 80%;
      transition: all 0.5s;
      &.active {
        transform: rotateX(0deg) translateX(-46%);
      }
      &::before {
        content: "";
        position: absolute;
        width: 10px;
        height: 10px;
        background-color: #fcfbfc;
        left: 50%;
        transform: rotatez(45deg);
        top: -4px;
        border-left: 1px solid #e7e6e7;
        border-top: 1px solid #e7e6e7;
      }
    }
  }
}
</style>