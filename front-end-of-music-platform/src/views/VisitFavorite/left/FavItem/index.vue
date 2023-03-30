<template>
  <div
    class="fav-item-wrapper"
    :class="{
      active: active,
    }"
  >
    <span
      @click="handleClick"
      class="iconfont icon-yinleyule music-icon"
    ></span>
    <p @click="handleClick" class="title">{{ item.favorite.name }}</p>
    <div class="count" @click="handleClick">
      {{ item.data.count }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    active: Boolean,
  },
  data() {
    return {
      showChangeFavoriteDialog: false,
      favoriteItem: {},
    };
  },
  methods: {
    handleClick() {
      this.$emit("change", this.item);
    },
  },
};
</script>

<style lang="less" scoped>
.fav-item-wrapper {
  display: flex;
  height: 45px;
  line-height: 45px;
  padding-left: 20px;
  box-sizing: border-box;
  cursor: pointer;
  &:last-of-type {
    border-bottom: 1px solid #eee;
  }
  &.active,
  &:hover {
    background: #00a1d6;
    color: #fff;
    .music-icon,
    .title,
    .count {
      color: #fff;
    }
  }
  &.active {
    background-color: #00a1d6;
  }
  .music-icon {
    color: #999;
    font-size: 22px;
    vertical-align: middle;
    margin-right: 10px;
  }
  .title {
    line-height: 45px;
    width: 86px;
    margin-right: 5px;
    font-size: 14px;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgb(32, 43, 47);
    font-size: 14px;
  }
  .count {
    text-align: center;
    width: 32px;
    font-size: 12px;
    color: #99a2aa;
    vertical-align: middle;
    text-align: center;
    font-family: Arial;
  }
}
</style>