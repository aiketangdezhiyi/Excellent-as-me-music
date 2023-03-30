<template>
  <el-button @click="$emit('click')" class="confirm-btn" :loading="loading">{{ content }}</el-button>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
      default: "确认",
    },
  },
};
</script>

<style lang="less" scoped>
.confirm-btn {
  padding: 0 20px;
  margin-right: 20px;
  line-height: 30px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  box-sizing: border-box;
  font-size: 12px;
  color: #fff;
  background-color: #00a1d6;
  border-color: #00a1d6;

  &:hover {
    background-color: #00b5e5;
    color: #fff;
    border-color: #00b5e5;
  }
}
</style>