<template >
  <div
    class="sheet-wrapper p-r"
    :style="{
      width: size + 'px',
    }"
  >
    <div
      class="sheet-img"
      :style="{
        backgroundImage: `url(${src})`,
        width: size + 'px',
        height: size + 'px',
      }"
    ></div>
    <div
      class="sheet-mask p-a"
      :style="{
        width: size + 'px',
        height: size + 'px',
        'line-height': size + 'px',
      }"
    >
      <span>去看这个歌单</span>
    </div>
    <p>
      <span class="title text-ellipsis">{{ title }}</span>
      <span class="state">公开</span>
    </p>
    <span class="fav-count">{{ count }}</span>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default:
        "https://s1.hdslb.com/bfs/static/jinkela/space/assets/playlistbg.png",
    },
    count: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: "默认收藏夹",
    },
    size: {
      type: Number,
      default: 160,
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/myStyle.less";
.sheet-wrapper {
  display: inline-block;
  cursor: pointer;
  .sheet-img {
    width: 160px;
    height: 160px;
    box-sizing: border-box;
    background-position: center;
    background-size: cover;
    border: 1px solid #ccd0d7;
    box-shadow: -1px -1px 3px rgba(0, 0, 0, 0.5),
      inset 1px 1px 3px rgba(0, 0, 0, 0.5), 1px 1px 3px rgba(0, 0, 0, 0.5);
    border-radius: 4px;
  }

  .sheet-mask {
    opacity: 0;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-size: 16px;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    text-align: center;
    transition: opacity 0.3s ease-in;
    & > span {
      display: inline-block;
      transition: opacity .5s ease-in 0.3s, transform .5s ease-in 0.3s;
      opacity: 0;
      transform: scale(0.8);
    }
  }
  &:hover .sheet-mask {
    opacity: 1;
    font-size: 16px;
    & > span {
      opacity: 0.8;
      transform: scale(1);
    }
  }
  p {
    margin-top: 10px;
    font-size: 18px;
    height: 24px;
    line-height: 24px;
    font-family: Microsoft Yahei UI Light, Microsoft Yahei Light;
    .title {
      font-size: inherit;
      transition: color 0.2s ease-in;
      width: 80%;
      font-size: 16px;
      display: inline-block;
      &:hover {
        color: @blue;
      }
    }
    .state {
      color: #99a2aa;
      float: right;
      line-height: 24px;
      font-size: 12px;
    }
  }
  .fav-count {
    position: absolute;
    top: 10px;
    right: 10px;
    min-width: 12px;
    padding: 0 9px;
    line-height: 18px;
    font-size: 12px;
    text-align: center;
    font-family: Arial;
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 9px;
  }
}
</style>