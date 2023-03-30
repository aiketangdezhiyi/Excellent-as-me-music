<template>
  <div class="strength-wrapper p-r">
    <div class="top" ref="container">
      <span>弱</span><span ref="span">中</span><span>强</span>
    </div>
    <div
      class="bottom p-a"
      :style="{
        width: showWidth + 'px',
      }"
    >
      <span
        :style="{
          width: width + 'px',
        }"
        >弱</span
      ><span
        :style="{
          width: width + 'px',
        }"
        >中</span
      ><span
        :style="{
          width: width + 'px',
        }"
        >强</span
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    levelType: Number,
  },
  data() {
    return {
      width: 0,
    };
  },
  mounted() {
    this.width = this.$refs.span.offsetWidth;
  },
  computed: {
    showWidth() {
      let width = 0;
      if (this.levelType === 1) {
        width = this.width;
      } else if (this.levelType === 2) {
        width = this.width * 2 + 2;
      } else if (this.levelType === 3) {
        width = this.$refs.container.offsetWidth;
      }
      return width;
    },
  },
};
</script>

<style lang="less" scoped>
.strength-wrapper {
  width: 100%;
  .top {
    display: flex;
    width: 100%;
    span {
      flex: 1 1 auto;
    }
  }
  span {
    text-align: center;
    margin-right: 2px;
    height: 20px;
    font-size: 12px;

    line-height: 20px;
    color: #fff;
    background: #eeeeee;
  }
  .bottom {
    left: 0;
    bottom: 0;
    width: 0;
    white-space: nowrap;
    transition: width 0.5s;
    overflow: hidden;
    span {
      display: inline-block;
      background: #f76120;
    }
  }
}
</style>