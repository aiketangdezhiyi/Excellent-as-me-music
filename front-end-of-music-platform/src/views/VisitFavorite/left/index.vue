<template>
  <div class="left-view-container">
    <div class="header">
      <h2><span>Ta</span> <span>Di</span> 歌单</h2>
    </div>
    <div class="favorite-context-container">
      <FavItem
        @change="changeFavorite(item)"
        :active="item.favorite.id === activeFavorite.favorite.id"
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
    ...mapState("Visit", ["favoriteList", "activeFavorite"]),
  },
  async created() {},
  methods: {
    changeFavorite(item) {
      this.$store.commit("Visit/setActiveFavorite", item);
    },
  },
  watch: {
    favoriteList() {
      // 当收藏夹数据更新后实时获取最新展示的数据
      // const newItem = this.favoriteList.find(it=>it.favorite.id === this.activeFavorite.favorite.id);
      // if(newItem) {
      //   this.$store.commit("Favorite/setActiveItem",newItem);
      // }
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
    display: flex;
    justify-content: space-between;
    padding-right: 11px;
    h2 {
      font-weight: normal;
      font-size: 21px;
      letter-spacing: 3px;
      padding-bottom: 18px;
      color: #fff;
      text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
      border-bottom: 1px solid #eee;
      & > span {
        font-size: 30px;
      }
      & > span:nth-child(2) {
        font-size: 25px;
      }
    }
    i {
      font-size: 18px;
      line-height: 54px;
    }
  }
}
</style>