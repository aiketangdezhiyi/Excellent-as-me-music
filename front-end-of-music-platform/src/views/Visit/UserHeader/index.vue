<template>
  <div class="header-info-container w-100 p-r">
    <div
      class="header-bg"
      :style="{
        backgroundImage: `url(${userInfo.avatarUrl})`,
      }"
    ></div>
    <div class="h-user p-a">
      <el-avatar
        style="margin-left: 30px; border: 1px solid #eee"
        :size="95"
        :src="userInfo.avatarUrl"
      ></el-avatar>
      <div class="h-info">
        <p class="h-info-1 d-flex">
          <span class="username">{{ userInfo.username }}</span>
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
      </div>

      <p class="follow-btn-wrapper p-a">
        <el-button
          @click="handleFollow(isFollow)"
          class="follow-btn"
          :class="{
            followed: isFollow,
            unfollow: !isFollow,
          }"
          >{{ isFollow ? "已关注" : "关注" }}</el-button
        >
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import WaHonorComp from "@/components/WaHonorComp";
import SexComp from "@/components/SexComp";
export default {
  components: {
    WaHonorComp,
    SexComp,
  },
  computed: {
    ...mapState("Visit", ["userInfo"]),
    ...mapState("User", ["userId"]),
  },
  data() {
    return {
      isFollow: false, // 是否关注
    };
  },
  created() {
    this.getFollowStatus();
  },
  methods: {
    getFollowStatus() {
      // 获取关注状态
      this.$api
        .getFollowStatus(this.userInfo.id)
        .then(({ code, err, data }) => {
          if (code === 200) {
            this.isFollow = data;
          } else {
            this.$message({
              message: err,
              duration: 1500,
            });
          }
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
        if (this.userId) {
          const res = await this.$api.addFollowStatus(this.userInfo.id);
          if (res.code === 200) {
            this.isFollow = true;
          } else {
            this.$message({
              message: res.err,
              duration: 1500,
            });
          }
          // 已经登录
        } else {
          // 未登录
          this.$router.push(`/login?returnUrl=${this.$route.fullPath}`);
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/myStyle.less";
@import url("./follow.less");
.header-info-container {
  border-radius: 5px;
  overflow: hidden;
  height: 200px;
  border: 1px solid #eee;
  margin-bottom: 30px;
  .header-bg {
    background-size: cover;
    background-position-x: center;
    background-position-y: -100px;
    height: 200px;
    filter: blur(5px);
  }
  .h-user {
    left: 0;
    width: 100%;
    top: 100px;
    display: flex;
    height: 100px;
    .h-info {
      padding-top: 10px;
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
          font-size: 18px;
          vertical-align: middle;
          color: #fff;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
        }
      }
      .h-info-2 {
        font-size: 14px;
        width: 100%;
        color: #fff;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
        letter-spacing: 1px;
      }
    }
  }
}
</style>