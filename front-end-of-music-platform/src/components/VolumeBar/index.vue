<template>
  <div class="volume-wrapper" @mousemove="handleDragMove">
    <div class="volume-bg-bar" ref="volumeBar">
      <div
        class="volume-inner-bar"
        :style="{
          height: height + 'px',
        }"
      ></div>
      <span
        class="volume-circle"
        @mousedown="handleDragStart"
        :style="{
          bottom: height + 'px',
        }"
      ></span>
    </div>
    <!-- 音量调节跟进度条思路一致 -->
    <!-- 有空的话，可以考虑一下提取公共代码 -->
  </div>
</template>

<script>
// 做一个比较通用的组件
// 这个组件不仅可以用于调节音量，反正就对外抛出事件volumePercentage，事件回调参数是百分比
// 至于做什么？我管不着，爱咋地咋地。
// 提供事件 volumePercentage(百分比)
export default {
  props: {
    initHeight: {
      type: Number,
      required: true,
      // 做一下校验
    }, // 要求传进来小数
  },
  data() {
    return {
      height: 0,
    };
  },
  created() {
    this.handleFunc = () => {
      if (this.isDrag) {
        this.isDrag = false;
      }
    };
    document.addEventListener("mouseup", this.handleFunc);
  },
  mounted() {
    // this.barHeight = this.$refs.volumeBar.offsetHeight; // 获取的高度为0？

    // 我以为是获取时机的问题，所以我把对象保存到window,但结果几乎所有位置和高度宽度的属性值都为0

    this.barHeight = parseFloat(window.getComputedStyle(this.$refs.volumeBar,null)['height']);
    this.height = this.initHeight * this.barHeight; // 初始化数据
  },
  methods: {
    handleDragStart(e) {
      this.isDrag = true; // 普通属性，用于区分是否在进行拖拽

      this.startHeight = this.height;
      this.lastY = e.clientY;
    },
    handleDragMove(e) {
      if (!this.isDrag) {
        // 没有进行拖拽
        return;
      }
      const moveY = -(e.clientY - this.lastY);
      let curHeight = this.startHeight + moveY;
      // 进行边界处理
      curHeight = curHeight < 0 ? 0 : curHeight;
      curHeight = curHeight > this.barHeight ? this.barHeight : curHeight;

      // 反映到真实DOM
      this.height = curHeight;

      // 抛出事件
      this.$emit("volumePercentage", curHeight / this.barHeight);
    },
  },
  beforeDestroy() {
    document.removeEventListener("mouseup", this.handleFunc);
  },
};
</script>

<style lang="less">
@import "~@/styles/myStyle.less";
.volume-wrapper {
  width: 29px;
  height: 114px;
  position: absolute;
  z-index: 100;
  background: url("../../assets/volume-panel.png") no-repeat;
  .volume-bg-bar {
    cursor: pointer;
    position: absolute;
    left: 12px;
    top: 11px;
    width: 5px;
    height: 90px;
    .volume-inner-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 5px;
      height: 50%;
      background: @blue;
    }
    .volume-circle {
      // 跟音乐进度条一样 最好不要用伪元素
      position: absolute;
      left: 0;
      // top: calc(100% - 50%);
      // 动态操控
      transform: translateX(-32%) translateY(50%);
      width: 12px;
      height: 12px;
      background: #fff;
      border-radius: 50%;
      cursor: pointer;
    }
  }
}
</style>