<template>
  <h2 class="i-main-title">
    <span class="text"><span>{{leftTitle}}</span><span>/</span>{{rightTitle}}</span>
    <span class="sub-title">{{subTitle}}</span>
  </h2>
</template>

<script>
export default {
  props: {
    leftTitle: String,
    rightTitle: String,
    subTitle: String,
  },
};
</script>

<style lang="less" scoped>
.i-main-title {
  text-align: center;
  font-weight: 500;
  font-size: 30px;
  line-height: 1.5em;
  .text span {
    font-family: Segoe UI Light, Microsoft YaHei, Arial, Helvetica, sans-serif;
    margin-right: 10px;
  }
  .sub-title {
    display: block;
    font-size: 16px;
    color: #919191;
  }
}
</style>