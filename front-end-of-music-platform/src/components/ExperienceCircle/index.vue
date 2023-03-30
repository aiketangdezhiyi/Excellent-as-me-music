<template>
  <div
    class="circle-container"
    :style="{
      width: size + 'px',
      height: size + 'px',
    }"
  >
    <div
      class="circle-wrapper"
      :style="{
        width: size + 'px',
        height: size + 'px',
      }"
    >
      <div
        class="top"
        :style="{
          'border-top-left-radius': size / 2 + 'px',
          'border-top-right-radius': size / 2 + 'px',
          width: size + 'px',
          height: size / 2 + 'px',
          background : topColor
        }"
      ></div>
      <div
        class="bottom"
        :style="{
          'border-bottom-left-radius': size / 2 + 'px',
          'border-bottom-right-radius': size / 2 + 'px',
          width: size + 'px',
          height: size / 2 + 'px',
          background : bottomColor
        }"
      ></div>
    </div>
    <div class="center">
        <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 80,
    },
    topColor : {
      type : String,
      default : "#23bff2"
    },
    bottomColor : {
      type : String,
      default : "#00a1d6"
    }
  },
};
</script>

<style lang="less" scoped>
.circle-container {
  position: relative;
  display: inline-block;
  .circle-wrapper {
    border-radius: 50%;
    overflow: hidden;
    background: #f60;
    transform: rotate(-45deg);

  }
  .center {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>