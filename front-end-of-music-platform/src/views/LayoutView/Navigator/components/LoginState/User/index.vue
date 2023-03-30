
<template>
  <el-dropdown placement="bottom" :hide-timeout="500" @command="handleCommand">
    <div class="avatar-container el-dropdown-link">
      <el-avatar fit="contain" :size="50" :src="avatarUrl"></el-avatar>
      <span class="avatar-name">{{ username ? username : user }}</span>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="personCenter">个人中心</el-dropdown-item>
      <el-dropdown-item command="logout">退出登录 </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
// 个人中心
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("User", ["user", "username", "avatarUrl"]),
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

<style lang="less" scoped>
.avatar-container {
  display: flex;
  margin-top: 12px;
}
.avatar-name {
  display: block;
  width: 85px;
  padding-top: 5px;
  font-size: 0.85rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #777;
  margin-left: 0.85rem;
  padding-top: 16px;
  cursor: pointer;
}
</style>