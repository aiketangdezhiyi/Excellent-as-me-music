<template>
  <div class="user-container">
    <h2 class="header">
      <span>账号安全</span>
    </h2>
    <div class="form-wrapper">
      <FormComp />
    </div>
  </div>
</template>

<script>
import FormComp from "./FormComp";
export default {
  components: {
    FormComp,
  },
  created() {
    document.title = "账号安全";
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/myStyle.less";
.user-container {
  min-height: 465px;
  padding: 18px 27px;
  .header {
    font-weight: normal;
    height: 30px;
    border-bottom: 1px solid #eee;
    margin-bottom: 60px;
    text-align: center;
    color: #fff;
    text-shadow: 0 0 1px @blue, 0 -1px 3px @blue, 0 -5px 10px @blue,
      0 3px 3px @cyan, 0 6px 10px @cyan;
    span {
      font-size: 28px;
      height: 60px;
      line-height: 60px;
      display: inline-block;
      background-color: #fff;
      padding: 0 27px;
    }
  }
  .form-wrapper {
    width: 50%;
    margin: 0 auto;
  }
}
</style>