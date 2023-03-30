<template>
  <div>
      <UserInfo />
      <Task />
  </div>
</template>

<script>
import UserInfo from "./UserInfo";
import Task from "./Task";
export default {
  components: {
    UserInfo,
    Task
  },
  created () {
    document.title = "个人空间";
  }
};
</script>

<style lang="less" scoped>
</style>