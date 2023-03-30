<template>
  <span
    class="sex-wrapper iconfont flex-center"
    :class="{
      'icon-icmale': sex,
      'icon-icfemale': !sex,
    }"
  ></span>
</template>

<script>
export default {
  props: {
    sex: Boolean, // false female true male
  },
};
</script>

<style lang="less" scoped>
.sex-wrapper {
  width: 21px;
  height: 21px;
  background-color: #fff;
  border-radius: 50%;
  font-size: 21px;
  &.icon-icmale {
    color: #6CD4EF;
  }
  &.icon-icfemale {
    color: #ff758f;
  }
}
</style>