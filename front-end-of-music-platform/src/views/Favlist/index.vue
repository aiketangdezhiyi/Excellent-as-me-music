<template>
  <div class="w-full">
    <div class="favlist-container mx-auto">
      <div class="favlist-left">
        <LeftView />
      </div>
      <div class="favlist-right">
        <RightView />
      </div>
    </div>
  </div>
</template>

<script>
import LeftView from "./left";
import RightView from "./right";
export default {
  components: {
    LeftView,
    RightView
  },
  created() {
    document.title = "收藏夹";
  }
};
</script>

<style lang="less" scoped>
.w-full {
  background: #f4f5f7;
  padding-top: 27px;
  padding-bottom: 50px;
}
.favlist-container {
  width: 1140px;

  border-radius: 4px;
  font-size: 14px;
  background: #fff;
  color: #222;
  border: 1px solid #eee;
  display: flex;
  .favlist-left {
    width: 180px;
    border-right: 1px solid #eee;
  }
  .favlist-right {
    flex: 1 1 0;
  }
}
</style>