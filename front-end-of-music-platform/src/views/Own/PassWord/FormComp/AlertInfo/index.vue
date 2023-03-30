<template>
  <div v-show="alterInfo.isShow">
    <i :class="{ success: alterInfo.info === '' }"></i>
    <span>{{ alterInfo.info }}</span>
  </div>
</template>

<script>
export default {
  props: {
    alterInfo: Object,
  },
};
</script>

<style lang="less" scoped>
div {
  display: inline-block;
  margin-left: 5px;
  width: 0px;
  line-height: normal;
  white-space: nowrap;
  span {
    font-size: 12px;
  }
  i {
    vertical-align: sub;
    display: inline-block;
    background: url(https://s0.meituan.net/bs/file/?f=fe-sso-fs:build/assets/icons.c1b3784.png)
      no-repeat;
    background-position: 0 -296px;
    // 复合属性覆盖了子属性
    width: 17px;
    height: 17px;
    margin-right: 5px;
    &.success {
      background-position: 0 -453px;
    }
  }
}
</style>