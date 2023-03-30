<template>
  <div class="follow-container w-100">
    <div class="header">
      <span
        class="my-follow-btn"
        :class="{
          active: isFollow,
        }"
        @click="isFollow = true"
        ><i class="music-iconfont icon-tianjiajiahaoyoutianjiapengyou"></i>
        我的关注</span
      >
      <span
        :class="{
          active: !isFollow,
        }"
        class="follow-me-btn"
        @click="isFollow = false"
      >
        <i class="music-iconfont icon-pengyou"></i> 关注我的</span
      >
    </div>

    <div class="content" v-loading="loading">
      <keep-alive :max="2" :include="['MyFollow', 'FollowMe']">
        <MyFollow @loading="loading = $event" v-if="isFollow" />
        <FollowMe @loading="loading = $event" v-else />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MyFollow from "./MyFollow";
import FollowMe from "./FollowMe";
export default {
  components: {
    MyFollow,
    FollowMe,
  },
  data() {
    return {
      isFollow: true, // true 我的关注 false 关注我的
      pageConfig: {
        page: 1,
        limit: 27,
      },
      loading: false,
    };
  },
  computed: {
    ...mapState("User", ["userId"]),
  },
  async created() {
    document.title = "我的关注";
    if (!localStorage.getItem("authorization")) {
      // 为了确保登录的实时性，从本地缓存来算
      // 避免用户直接页面刷新导致的vuex里的数据不实时
      // 如果未登录
      this.$message({
        message: "还未登录账号",
        duration: 1500,
        onClose: () => {
          this.$router.push(`/login?returnUrl=${this.$route.fullPath}`);
        },
      });
    }
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/myStyle.less";
.follow-container {
  min-height: 500px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 27px;
  .header {
    overflow: hidden;
    border-radius: 4px;
    margin: 0 auto;
    color: #333;
    border-bottom: 1px solid #eee;
    font-size: 18px;
    text-align: center;
    padding: 18px 0;
    span {
      display: inline-block;
      width: 180px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      cursor: pointer;
      transition: color 0.3s;
      &.active,
      &:hover {
        color: @blue;
      }
      i {
        font-size: 35px;
        height: 30px;
        line-height: 30px;
        margin-right: 5px;
      }
      &:nth-of-type(1) {
        border-right: 1px solid #ccc;
      }
    }
  }
}
</style>