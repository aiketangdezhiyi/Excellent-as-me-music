<template>
  <div class="follow-item-container">
    <el-avatar
      @click.native="routerToHome"
      style="border: 1px solid #eee"
      :size="75"
      :src="userInfo.avatarUrl"
    >
    </el-avatar>
    <div class="h-info">
      <p class="h-info-1 d-flex">
        <span class="username text-ellipsis" @click="routerToHome">{{
          userInfo.username
        }}</span>
        <SexComp style="margin: 0 5px" :sex="userInfo.sex" />
        <WaHonorComp style="margin: 0 5px" :exp="userInfo.exp" />
      </p>
      <p
        class="h-info-2 text-ellipsis"
        :title="
          userInfo.signature ? userInfo.signature : 'Ta 好像还没有什么签名哦'
        "
      >
        {{
          userInfo.signature ? userInfo.signature : "Ta 好像还没有什么签名哦"
        }}
      </p>
      <p class="follow-btn-wrapper p-a">
        <el-button
          @click="handleFollow(isFollow)"
          class="follow-btn"
          :class="{
            followed: isFollow,
            unfollow: !isFollow,
          }"
          >{{ isFollow ? showTitle[0] : showTitle[1] }}</el-button
        >
      </p>
    </div>
  </div>
</template>

<script>
import WaHonorComp from "@/components/WaHonorComp";
import SexComp from "@/components/SexComp";
import { mapState } from "vuex";
export default {
  components: {
    WaHonorComp,
    SexComp,
  },
  props: {
    userInfo: Object,
    mutual: Boolean,
    mutualValid: Boolean, // mutual是否有效
    isSingerComp: Boolean,
  },
  computed: {
    ...mapState("User", ["userId"]),
  },
  data() {
    return {
      isFollow: false,
      showTitle: ["已关注", "关注"],
    };
  },
  async created() {
    if (this.mutualValid) {
      // 父组件是关注我的
      this.isFollow = this.mutual;
      this.showTitle = ["已互关", "互相关注"];
    }
    if (this.isSingerComp) {
      // 父组件是singer
      this.isFollow = this.userInfo.isFollow;
    }
  },
  methods: {
    routerToHome() {
      this.$router.push({
        path: `/visit/${this.userInfo.id}`,
      });
    },
    async handleFollow(isFollow) {
      if (isFollow) {
        // 取消关注
        const res = await this.$api.deleteFollowStatus(this.userInfo.id);
        if (res.code === 200) {
          this.isFollow = false;
        } else {
          this.$message({
            message: res.err,
            duration: 1500,
          });
        }
      } else {
        // 添加关注
        const res = await this.$api.addFollowStatus(this.userInfo.id);
        if (res.code === 200) {
          this.isFollow = true;
        } else {
          this.$message({
            message: res.err,
            duration: 1500,
          });
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/myStyle.less";
@import url("./follow.less");
.follow-item-container {
  border-bottom: 1px solid #eee;
  position: relative;
  line-height: 1;
  cursor: pointer;
  box-sizing: border-box;
  padding: 18px 27px;
  display: flex;
  .h-info {
    padding-top: 5px;
    margin-left: 30px;
    width: 67%;
    .h-info-1 {
      margin-bottom: 15px;
      align-items: center;
      .username {
        display: inline-block;
        margin-right: 5px;
        font-weight: 700;
        line-height: 18px;
        height: 30px;
        line-height: 30px;
        width: 80px;
        font-size: 18px;
        vertical-align: middle;
        color: #fff;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
      }
    }
    .h-info-2 {
      font-size: 14px;
      width: 100%;
      letter-spacing: 1px;
    }
  }
}
</style>