<template >
  <div @click="handleMaskClick" ref="mask" class="mask flex-center">
    <div
      class="show-favorite-container"
      :style="{
        width: width + 'px',
      }"
    >
      <div class="header">{{ title }}</div>
      <div class="main">
        <slot></slot>
      </div>
      <div class="footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
// 展示收藏夹信息 添加增加收藏夹内容
export default {
  props: {
    width: {
      type: Number,
      default: 395,
    },
    title: {
      type: String,
      default: "确认提示",
    },
  },
  methods: {
    handleMaskClick(e) {
      if (this.$refs.mask === e.target) {
        this.$emit("maskClick"); // 遮罩层被点击时
      }
    },
  },
};
</script>

<style lang="less" scoped>
.mask {
  background: rgba(0, 0, 0, 0.65);
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 9999;
  .show-favorite-container {
    width: 395px;
    border-radius: 4px;
    background: #fff;
    overflow: hidden;
    .header {
      position: relative;
      padding: 0 20px;
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      color: #222;
      border-bottom: 1px solid #e5e9ef;
      text-align: left;
    }
    .footer {
      text-align: center;
      margin: 0 36px;
    }
  }
}
</style>