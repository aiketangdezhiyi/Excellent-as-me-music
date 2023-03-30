<template>
  <el-pagination
    style="font-weight: normal; text-align: center; margin-top: 15px"
    background
    @current-change="handleCurrentChange"
    :current-page="page"
    :page-size="size"
    layout="total,  prev, pager, next, jumper"
    :total="count"
    :hide-on-single-page="true"
  >
  </el-pagination>
</template>

<script>
// 封装一个分页插件
export default {
  props: {
    handleCurrentChange: Function,
    page: Number,
    size: Number,
    count: Number,
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/myStyle.less";
/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: @blue;
}
</style>