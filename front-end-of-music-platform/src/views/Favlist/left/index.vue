<template>
  <div class="left-view-container">
    <div class="header">
      <span>我的收藏夹</span>
      <i class="el-icon-message"></i>
    </div>
    <div class="favorite-context-container">
      <FavItem
        @change="changeFavorite(item)"
        :active="item.favorite.id === activeItem.favorite.id"
        v-for="item in favoriteList"
        :key="item.favorite.id"
        :item="item"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import FavItem from "./FavItem";
export default {
  components: {
    FavItem,
  },
  computed: {
    ...mapState("Favorite", ["favoriteList", "activeItem"]),
  },
  async created() {
    if (this.favoriteList.length === 0) {
      // 如果收藏夹长度为0，认为没有获取数据
      // 发送请求
      await this.$store.dispatch("Favorite/getFavoriteList");
    }
    if (this.$route.params.favorite) {
      // 如果是跳转过来的 有指定收藏夹
      this.$store.commit("Favorite/setActiveItem", this.$route.params);
    } else {
      this.$store.commit("Favorite/setActiveItem", this.favoriteList[0]); // 默认展示的收藏夹
    }
  },
  methods: {
    changeFavorite(item) {
      this.$store.commit("Favorite/setActiveItem", item);
    },
  },
  watch: {
    favoriteList() {
      // 当收藏夹数据更新后实时获取最新展示的数据
      const newItem = this.favoriteList.find(
        (it) => it.favorite.id === this.activeItem.favorite.id
      );
      if (newItem) {
        this.$store.commit("Favorite/setActiveItem", newItem);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.left-view-container {
  width: 100%;
  min-height: 593px;
  .header {
    height: 54px;
    padding-left: 19px;
    line-height: 54px;
    font-size: 18px;
    color: #99a2aa;
    display: flex;
    justify-content: space-between;
    padding-right: 11px;
    i {
      font-size: 18px;
      line-height: 54px;
    }
  }
}
</style>