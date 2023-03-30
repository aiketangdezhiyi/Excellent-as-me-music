<template>
  <div class="favorite-right-view">
    <div>
      <h2><span>TA</span> <span>Di</span> 公开歌单</h2>
      <NoDataComp v-if="favoriteList.length === 0" title="Ta好像不怎么喜欢听歌的亚子" />
      <SheetWrapperComp
        v-for="item in favoriteList"
        @click.native="routerToFavorite(item)"
        :src="item.favorite.coverUrl"
        :title="item.favorite.name"
        :count="item.data.count"
        :key="item.id"
        :size="130"
      />
    </div>
  </div>
</template>

<script>
import SheetWrapperComp from "@/components/SheetWrapperComp";
import NoDataComp from "@/components/NoDataComp";
import { mapState } from "vuex";
export default {
  components: {
    SheetWrapperComp,
    NoDataComp,
  },
  computed: {
    ...mapState("Visit", ["favoriteList"]),
  },
  methods: {
    routerToFavorite(item) {
      const id = this.$route.params.id;
      this.$router.push({
        path: `/favorite/${id}`,
        query: {
          favoriteId : item.favorite.id // 当前正在访问的歌单id
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.favorite-right-view {
  float: right;
  width: 315px;
  padding: 15px 20px;
  box-sizing: border-box;
  background: #fff;
  border: 1px solid #eee;
  padding-bottom: 0;
  margin-bottom: 15px;
  border-radius: 0 5px 5px 0;
  & > div {
    h2 {
      font-weight: normal;
      font-size: 21px;
      letter-spacing: 3px;
      padding-bottom: 18px;
      text-shadow: 1px 1px 3px rgba(255, 255, 255, 1);
      span {
        font-size: 30px;
        color: #fff;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
      }
      span:nth-child(2) {
        font-size: 25px;
      }
    }
  }
  .sheet-wrapper {
    display: inline-block;
    margin-right: 12px;
    margin-bottom: 27px;
    &:nth-of-type(2n) {
      margin-right: 0;
    }
  }
}
</style>