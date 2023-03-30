<template>
  <div class="my-follow w-100">
    <NoDataComp title="你就没有什么人想关注的吗" v-if="myFollow.length === 0" />
    <FollowItemComp
      v-for="item in myFollow"
      :key="item.id"
      :userInfo="item.attentionUserInfo"
    ></FollowItemComp>
    <PagerComp
      :handleCurrentChange="handleCurrentChange"
      :page="pageConfig.page"
      :size="pageConfig.limit"
      :count="count"
    />
  </div>
</template>

<script>
import FollowItemComp from "@/components/FollowItemComp";
import NoDataComp from "@/components/NoDataComp";
import PagerComp from "@/components/PagerComp";
export default {
  components: {
    FollowItemComp,
    NoDataComp,
    PagerComp,
  },
  data() {
    return {
      myFollow: [],
      count: 0,
      pageConfig: {
        page: 1,
        limit: 27,
      },
    };
  },
  created() {
    this.getFollowData();
  },
  methods: {
    handleCurrentChange(page) {
      this.pageConfig.page = page;
    },
    async getFollowData() {
      this.$emit("loading", true);
      const res = await this.$api.getUserFollowStatus(
        this.pageConfig.page,
        this.pageConfig.limit
      );
      console.log("follow",res)
      if (res.code === 200) {
        this.myFollow = res.data.rows;
        this.count = res.data.count;
      }
      this.$emit("loading", false);
    },
  },
  watch : {
    pageConfig : {
      handler () {
        this.getFollowData();
      },
      deep : true
    }
  }
};
</script>

<style lang="less" scoped>
.my-follow {
  box-sizing: border-box;
  background: #fff;
}
</style>