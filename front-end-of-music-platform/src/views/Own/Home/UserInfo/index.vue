<template>
  <div class="info-header">
    <div class="avatar">
      <el-avatar :size="70" :src="avatarUrl"></el-avatar>
    </div>
    <div class="info">
      <div class="home-top-msg">
        <p class="username">{{ username }}</p>
        <WaHonorComp :exp="exp" />
      </div>

      <div class="home-mid-msg">
        <div class="left">LV{{ level }}</div>
        <div class="right"></div>
        <div class="point">
          <span class="cur">{{ exp }}</span
          >/<span class="max">{{ max }}</span>
        </div>
        <div class="btn-wrapper">
          <span @click="routerToInfo" class="home-to-update">修改资料</span>
          <span class="home-to-page" @click="routerToUploadSong"
            >上传歌曲<i
              style="margin-left: 2px; font-size: 10px"
              class="el-icon-arrow-right"
            ></i
          ></span>
        </div>
      </div>

      <div class="home-top-bp">
        <ExperienceCircle :size="20">
          <span class="bi wrapper-full flex-center">币</span>
        </ExperienceCircle>
        <span class="coin">0</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 应该设置一个默认头像，防止网络不好时出现的空白区
import honorInfo from "@/Information/honor";
import ExperienceCircle from "@/components/ExperienceCircle";
import WaHonorComp from "@/components/WaHonorComp";
export default {
  components: {
    ExperienceCircle,
    WaHonorComp,
  },
  data() {
    return {
      src: "",
      level: 1,
      max: 0,
    };
  },
  created() {
    let obj = null;
    const n = this.exp;
    for (let i = 0; i < honorInfo.length; i++) {
      obj = honorInfo[i];
      if (n >= obj.min && n < obj.max) {
        this.level = i + 1;
        break;
      }
    }
    this.max = obj.max;
  },
  computed: {
    ...mapState("User", ["avatarUrl", "sex", "exp", "username"]),
  },
  methods: {
    routerToInfo() {
      this.$router.push({
        name: "OwnChange",
      });
    },
    routerToUploadSong() {
      this.$router.push(
        {
          name: "OwnUpload",
        },
        () => {
          this.$nextTick(() => {
            this.eventBus.$emit("updateNavbar"); // 等待类样式加上后在进行激活样式的更新
          });
        }
      );
    },
  },
};
</script>

<style lang="less" scoped>
.info-header {
  margin: 20px 27px;
  padding-bottom: 80px;
  border-bottom: 1px solid #e5e9ef;
  display: flex;
  div {
    height: 80px;
    vertical-align: middle;
  }
  .avatar {
    margin-left: 2rem;
  }
  .info {
    margin-left: 2rem;
    flex: 1 1 0;
    .home-top-msg {
      display: flex;
      height: 30px;
      .username {
        font-size: 18px;
        font-weight: 700;
        vertical-align: middle;
        margin-right: 15px;
      }
    }
    .home-mid-msg {
      height: 25px;
      line-height: 25px;
      margin-top: 23px;
      position: relative;
      width: 100%;
      div {
        display: inline-block;
        height: 100%;
        background: #ff905a;
      }
      .left {
        width: 58px;
        border-radius: 4px 0 0 4px;
        border-top-right-radius: 8px 8px;
        border-bottom-right-radius: 8px 8px;
        font-weight: 700;
        color: #fff;
        text-align: center;
        box-sizing: border-box;
        font-size: 12px;
        cursor: default;
        display: inline-block;
      }
      .right {
        width: 280px;
        border-radius: 0 4px 4px 0;
        border-top-left-radius: 8px 8px;
        border-bottom-left-radius: 8px 8px;
        transform: translateX(-2px);
        margin-right: 15px;
      }
      .point {
        background: transparent;
        font-size: 12px;
        color: #99a2aa;
        span {
          margin: 0 3px;
        }
        .cur {
          color: #222;
        }
      }
      .btn-wrapper {
        position: absolute;
        background: transparent;
        right: 20px;
        font-size: 12px;
        span {
          width: 70px;
          height: 24px;
          display: inline-block;
          border-radius: 4px;
          border: 1px solid #ced3db;
          color: #6d757a;
          text-align: center;
          cursor: pointer;
          line-height: 24px;
          margin: 0 5px;
        }
      }
    }
    .home-top-bp {
      height: auto;
      margin-top: 12px;
      .coin {
        vertical-align: middle;
        margin-left: 8px;
        font-size: 14px;
        color: #222;
      }
    }
  }
}
.bi {
  font-size: 8px;
  font-weight: 700;
  color: #fff;
}
</style>