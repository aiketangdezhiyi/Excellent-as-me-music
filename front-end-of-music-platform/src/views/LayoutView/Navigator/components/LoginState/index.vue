<template>
  <div>
    <template v-if="!userId">
      <router-link
        :to="{
          name: 'Login',
        }"
        class="router-link"
        >登录</router-link
      >
    </template>
    <template v-else>
      <User />
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import User from "./User";
export default {
  data() {
    return {
      isLogon: true, // 是否已经注册过了
      dialogTableVisible: false, // 控制登录面板的出现与消失
    };
  },
  components: {
    User,
  },
  computed: {
    ...mapState("User", ["username", "userId"]),
  },
};
</script>

<style scoped>
.router-link {
  display: inline-block;
  width: 66px;
  height: 78px;
  line-height: 78px;
  text-align: center;
  color: #8982ff;
}
</style>

