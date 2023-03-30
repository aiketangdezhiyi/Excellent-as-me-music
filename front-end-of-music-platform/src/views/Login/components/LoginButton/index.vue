<template>
  <el-button :loading="isLoading" class="login-btn"> {{ title }}</el-button>
</template>

<script>
export default {
  props: {
    title: String,
    isLoading: Boolean,
  },
};
</script>

<style scoped lang="less">
.login-btn {
  width: 100%;
  border-radius: 0px;
  border: 1px solid #1890ff;
  font-size: 18px;
  color: #fff;
  margin-right: 10px;
  background-color: #1890ff;
}
</style>