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
import { mapState } from "vuex";
export default {
  components: {
    LeftView,
    RightView,
  },
  computed: {
    ...mapState("Visit", ["favoriteList"]),
  },
  async created() {
    const favoriteId = +this.$route.query.favoriteId;
    document.title = "他的歌单";
    const id = +this.$route.params.id;

    if (this.favoriteList === null) {
      // 如果直接访问或没有请求
      // 请求单独请求客户端数据
      await this.$store.dispatch("Visit/getVisitFavoriteList", id);
    }

    if (!Number.isNaN(id)) {
      this.$store.commit("Visit/setActiveFavoriteWidthId", favoriteId); // 当前正在访问的歌单id
    }
  },
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