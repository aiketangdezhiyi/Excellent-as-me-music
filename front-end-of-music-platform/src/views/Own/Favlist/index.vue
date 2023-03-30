<template>
  <div class="favlist-container">
    <h3 class="header">
      <router-link to="/" class="my-favlist-title">我的收藏夹</router-link>
      <span class="count">{{ favoriteList.length }}</span>
      <span class="add-new-favlist">新增收藏夹</span>
      <router-link class="more-link" to="/favlist"
        >更多<i class="el-icon-arrow-right"></i
      ></router-link>
    </h3>

    <div class="bottom" v-loading="loading">
      <div  v-if="favoriteList.length === 0">
        <NoDataComp></NoDataComp>
      </div>
      <div v-if="favoriteList.length > 0">
        <SheetWrapperComp
          v-for="(item, i) in favoriteList"
          @click.native="routerToFavorite(item)"
          :src="item.favorite.coverUrl"
          :title="item.favorite.name"
          :count="item.data.count"
          :key="i"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SheetWrapperComp from "@/components/SheetWrapperComp";
import NoDataComp from "@/components/NoDataComp";
export default {
  computed: {
    ...mapState("User", ["userId"]),
  },
  components: {
    SheetWrapperComp,
    NoDataComp,
  },
  data() {
    return {
      loading : false,
      favoriteList: [], // 收藏夹信息
    };
  },
  created() {
    document.title = "我的歌单";
    this.getData();
  },
  methods: {
    async getData() {
      this.loading = true;
      const data = await this.$store.dispatch("Favorite/getFavoriteList");
      if (Array.isArray(data)) {
        this.favoriteList = data;
      } else {
        this.$message({
          message: "啊嘞嘞，好像有点小问题",
          type: "warning",
          duration: 1500,
        });
      }
      this.loading = false;
    },
    routerToFavorite(item) {
      // 跳转到收藏夹
      this.$router.push({
        name: "Favlist",
        params: {
          ...item,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/myStyle.less";
.bottom {
  & > div {
    width: 100%;
    flex-wrap: wrap;
    display: flex;
    justify-content: flex-start
  }
}
.sheet-wrapper {
  margin-bottom: 28px;
  margin-right: 38px;
}
.favlist-container {
  min-height: 500px;
  padding: 27px 60px;
  .header {
    display: flex;
    font-size: 20px;
    font-weight: 400;
    line-height: 33px;
    padding: 0 0 15px;
    margin-bottom: 13px;
    position: relative;
    font-weight: normal;
    align-items: center;
    .my-favlist-title {
      color: inherit;
      vertical-align: middle;
      font-size: 23px;
      text-decoration: none;
      margin-right: 5px;
      transition: color 0.2s ease, background-color 0.2s ease;
      &:hover {
        color: @blue;
      }
    }
    .add-new-favlist {
      position: absolute;
      right: 100px;
      vertical-align: middle;
      cursor: pointer;
      white-space: nowrap;
      font-size: 12px;
      &::before {
        content: "";
        display: inline-block;
        width: 18px;
        height: 18px;
        position: relative;
        top: 6.5px;
        background: url("~@/assets/icon_splice.png") no-repeat;
        background-position: -59px 0;
      }
      &:hover {
        color: @blue;
      }
      &:hover::before {
        background-position: -59px -30px;
      }
    }
    .count {
      background: #f6fafb;
      border: 1px solid #ddd;
      border-radius: 3px;
      color: #777;
      display: inline-block;
      font-size: 12px;
      line-height: 18px;
      height: 18px;
      margin-left: 11px;
      padding: 0 5px;
      position: relative;
      vertical-align: middle;
      &::before {
        background-image: url(//s1.hdslb.com/bfs/static/jinkela/space/assets/icons.png);
        position: absolute;
        background-position: -215px -340px;
        content: "";
        left: -7px;
        top: -3px;
        height: 22px;
        width: 10px;
      }
    }
    .more-link {
      border: 1px solid #b8c0cc;
      border-radius: 4px;
      color: #6d757a;
      position: absolute;
      right: 10px;
      font-size: 12px;
      width: 55px;
      height: 24px;
      box-sizing: border-box;
      line-height: 22px;
      text-align: center;

      transition: border 0.2s ease;
      &:hover {
        color: @blue;
        border-color: @blue;
      }
    }
  }
}
</style>