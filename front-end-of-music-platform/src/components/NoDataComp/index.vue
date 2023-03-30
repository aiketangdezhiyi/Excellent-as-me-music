<template functional>
  <div class="wrapper-full flex-center">
    <div>
      <img class="d-block" src="@/assets/nodata.png" alt="" />
      <p class="tip-text text-center" >{{ props.title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  functional: true,
  props: {
    title: {
      type: String,
      default: "没有数据",
    },
  },
};
</script>

<style lang="less" scoped>
.tip-text {
  font-size: 14px;
  color: #6d757a;
  margin-top : -27px;
  padding-bottom: 15px;
}
</style>