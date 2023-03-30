<template>
  <div class="search-header-container p-r">
    <span v-if="title" class="title active">{{ title }}</span>
    <div class="user-btn-wrapper p-a">
      <el-button @click="$emit('playall')" type="primary"
        ><i class="el-icon-video-play"></i> 播放所有歌曲</el-button
      >
      <el-button @click="$emit('playselect')" type="primary"
        ><i class="el-icon-video-play"></i>播放选中歌曲</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String, // 显示在导航条的结果
    list: {
      // 该参数为如果有多个title的时候用 目前并未使用该参数
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/myStyle.less";
.search-header-container {
  width: 100%;
  height: 59px;
  line-height: 59px;
  border-bottom: 1px solid #f0f0f0;
  .title {
    display: inline-block;
    font-size: 1.3rem;
    width: 200px;
    text-align: center;
    height: 100%;
    color: #14a9ff;
  }
  .active {
    border-bottom: 1px solid #14a9ff;
  }
}
.user-btn-wrapper {
  right: 0;
  bottom: 0;
  i {
    font-size: 18px;
    vertical-align: middle;
    margin-right: 5px;
  }
  button {
      background-color : @blue;
      &:hover {
          background-color : lighten(@blue,5%);
      }
  }
}
</style>