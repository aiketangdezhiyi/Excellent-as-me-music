<template>
  <div
    :class="{
      'fit-drop': userId,
    }"
  >
    <el-dropdown v-if="userId" @command="handleCommand">
      <router-link class="login text-ellipsis" :to="{ name: 'OwnHome' }">{{
        username
      }}</router-link>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="personCenter">个人中心</el-dropdown-item>
        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <router-link :to="{ name: 'Login' }" class="login text-ellipsis" v-else
      >登录</router-link
    >
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("User", ["userId", "username"]),
  },
  methods: {
    handleCommand(commandItem) {
      //   点击某项触发
      if (commandItem === "logout") {
        // 退出登录
        this.$store.dispatch("User/logout").then(() => {
          window.location.href = "/";
        });
      } else if (commandItem === "personCenter") {
        this.$router.push({
          name: "OwnHome",
        });
      }
    },
  },
};
</script>

<style lang="less"  scoped>
@import "~@/styles/myStyle.less";
.fit-drop {
  padding-top: 18px;
  line-height: normal;
}
.login {
  font-size: 16px;
  width: 100%;
  display: inline-block;
  color: hsla(0, 0%, 100%, 0.65);
  cursor: pointer;
}

@media screen and (max-width: 700px) {
  .login {
    color: #1a1a1a;
  }
}
</style>