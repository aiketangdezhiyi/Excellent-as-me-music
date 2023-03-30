<template>
  <div
    :title="songName"
    class="rect-container p-r flex-center"
    :style="{
      width: width + 'px',
      height: height + 'px',
      backgroundColor: bgColor,
      fontSize: fontSize + 'px',
    }"
  >
    <span> Top {{ level }} </span>
    <p class="bottom-mask p-a text-ellipsis" :style="{
        'font-size' : subTitleSize + 'px'
    }">
      <span>{{ songName }}</span>
    </p>
    <div class="p-a flex-center mask wrapper-full">
      <i class="home-iconfont icon-24gl-playCircle"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 160,
    },
    height: {
      type: Number,
      default: 90,
    },
    bgColor: String,
    level: Number,
    fontSize: {
      type: Number,
      default: 18,
    },
    songName: String,
    subTitleSize: {
      type: Number,
      default: 12,
    },
  },
};
</script>

<style lang="less" scoped>
.rect-container {
  color: #fff;
  cursor: pointer;
  .bottom-mask {
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    font-size: 14px;
    width: 100%;
    height: 22%;
    
    span {
        width: 100%;
        position: absolute;
        top : 50%;
        text-align: center;
        transform: translateY(-50%);    
        
    }
  }
  .mask {
    opacity: 0;
    transition: opacity 0.5s;
    background: rgba(0, 0, 0, 0.3);
    i {
      font-size: 40px;
    }
  }
  &:hover .mask {
    opacity: 1;
  }
}
</style>