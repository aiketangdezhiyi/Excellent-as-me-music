<template>
  <div class="visit-home-page" v-loading="loadingPage">
    <div class="visit-home-main" v-if="userInfo">
      <transition name="user" appear :duration="1500">
        <UserHeader v-if="userInfo" />
      </transition>

      <div class="w-100 clearfix">
        <transition name="song" appear :duration="1500">
          <SongLeft v-if="userInfo" />
        </transition>

        <transition name="favorite" appear :duration="1500">
          <FavoriteRight v-if="userInfo" />
        </transition>


      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import UserHeader from "./UserHeader";
import SongLeft from "./SongLeft";
import FavoriteRight from "./FavoriteRight";
export default {
  components: {
    UserHeader,
    SongLeft,
    FavoriteRight,
  },
  data() {
    return {
      loadingPage: false,
    };
  },
  computed: {
    ...mapState("User", ["userId"]),
    ...mapState("Visit", ["userInfo"]),
  },
  async created() {
    document.title = "访问空间";
    this.loadingPage = true;
    const id = +this.$route.params.id;
    if (typeof id !== "number" || Number.isNaN(id)) {
      // id格式不正确
      this.$router.push({
        name: "Home",
      });
      this.loadingPage = false;
      return;
    }
    document.getElementsByClassName("layout-container")[0].style.overflow = "hidden"
    setTimeout(function () {
      document.getElementsByClassName("layout-container")[0].style.overflow = "auto";
    }, 5000)
    if (id == this.userId) {
      // 如果访问的空间是自己的，就直接重定向到个人空间
      this.$router.push({
        name: "OwnHome",
      });
      this.loadingPage = false;
      return;
    }

    // 还有一种可能就是直接访问空间，导致用户状态还是未登录的
    // 这时候需要请求后台
    const data = await this.$store.dispatch("Visit/getVisitUserInfo", id);
    this.loadingPage = false;
    if (data === -1) {
      // 表示访问的是自己的空间
      this.$router.push({
        name: "OwnHome",
      });
      return;
    }

    document.title = this.userInfo.username + "的个人空间";
  },
};
</script>

<style lang="less" scoped>
@import url("./transition.less");

.visit-home-page {
  min-height: 100vh;
  background: #F6F9FF;

  .visit-home-main {
    width: 1140px;
    margin: 0 auto;
  }
}
</style>