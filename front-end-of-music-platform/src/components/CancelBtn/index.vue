<template>
  <el-button @click="$emit('click')" class="cancel-btn" :loading="loading">{{ content }}</el-button>
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
      default: "取消",
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/myStyle.less";
.cancel-btn {
  padding: 0 20px;
  line-height: 30px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  box-sizing: border-box;
  font-size: 12px;
  &:hover {
    color: @blue;
    border-color: @blue;
    background: transparent;
  }
}
</style>