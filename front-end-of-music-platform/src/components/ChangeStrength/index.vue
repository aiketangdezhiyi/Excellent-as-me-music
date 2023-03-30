<template>
  <div class="p-r">
    <div class="wrapper p-a w-100">
      <span ref="span">弱</span><span>中</span><span>强</span>
    </div>
    <div
      class="wrapper p-a over"
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
    levelType: Number, // [0 ,1 , 2 , 3]
  },
  data() {
    return {
      width: 0,
    };
  },
  computed: {
    showWidth() {
      let width = 0;
      if (this.levelType === 1) {
        width = this.width * 1;
      } else if (this.levelType === 2) {
        width = this.width * 2 + 2;
      } else if (this.levelType === 3) {
        width = this.width * 3 + 4;
      }
      return width;
    },
  },
  mounted() {
    this.width = this.$refs.span.offsetWidth;
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  height: 20px;
  display: flex;
  span {
    flex: 1 1 0;
    text-align: center;
    font-size: 12px;
    height: 100%;
    line-height: 20px;
    width: 85px;
    margin-right: 2px;
    color: #fff;
    background: #eeeeee;
  }
  &.over {
    width: 0px;
    overflow: hidden;
    transition: width 1s;
    left: 0;
    span {
      flex: none;
      background: #f76120;
    }
  }
}
</style>