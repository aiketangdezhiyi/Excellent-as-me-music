<template>
  <div class="song-img-info">
    <img :src="songImgSrc" alt="" />
    <div class="down-btn-container">
      下载这首歌
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("Song", ["songImgSrc"]),
  },
};
</script>

<style lang="less" scoped>
.song-img-info {
  width: 260px;
  position: relative;
  z-index: 10;

  img {
    width: 260px;
    height: 260px;
    display: block;
  }

  .down-btn-container {
    margin: 27px auto;
    width: 230px;
    height: 50px;
    border-radius: 27px;
    border: 1px solid #ccc;
    line-height: 50px;
    font-size: 21px;
    text-align: center;
    color: #ccc;
    font-weight: 300;
    cursor: pointer;
    transition: .5s;

    &:hover {
      color: #fff;
      border-color: #fff;
    }
  }
}</style>