<template>
  <el-form
    ref="formDom"
    :model="formDatas"
    label-width="80px"
    :rules="validator"
    :show-message="false"
    :hide-required-asterisk="true"
  >
    <el-form-item label="账号" prop="user">
      <el-input
        placeholder="请输入您的账号"
        v-model="formDatas.user"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pwd">
      <el-input
        placeholder="请输入您的密码"
        type="password"
        v-model="formDatas.pwd"
      ></el-input>
    </el-form-item>

    <div class="btn-wrapper">
      <LoginButton
        title="登 录"
        @click.native="handleLogin"
        :isLoading="isLoading"
      ></LoginButton>
    </div>
  </el-form>
</template>

<script>
import { mapState } from "vuex";
import LoginButton from "../components/LoginButton";
import { loginValidator } from "./config";
export default {
  components: {
    LoginButton,
  },
  props: {
    dialogTableVisible: {
      type: Boolean,
      require: true,
    },
  },
  data() {
    this.validator = loginValidator;
    this.loginEvent = (e) => {
      if (e.key === "Enter") {
        this.handleLogin();
      }
    };
    return {
      formDatas: {
        user: "",
        pwd: "",
      },
    };
  },
  created() {
    const user = localStorage.getItem("user");
    if (user) {
      this.$data.formDatas.user = user;
    }
  },
  computed: {
    ...mapState("User", ["isLoading"]),
  },
  mounted() {
    document.addEventListener("keydown", this.loginEvent);
  },
  methods: {
    async handleLogin() {
      this.$refs.formDom.validate(async (isTrue, obj) => {
        if (!isTrue) {
          // 表单验证不通过
          // 默认提示第一项信息
          const errFileds = Object.getOwnPropertyNames(obj);
          const errMsg = obj[errFileds[0]][0].message;
          this.$message({
            // 提示错误信息
            message: errMsg,
            type: "warning",
            offset: 80,
          });
        } else {
          const isLoginSuccess = await this.$store.dispatch("User/login", {
            user: this.$data.formDatas.user,
            pwd: this.$data.formDatas.pwd,
          });

          if (isLoginSuccess) {
            // 登录成功
            this.$message({
              // 提示登录成功信息
              message: "登录成功",
              type: "success",
              duration: 1500,
              offset: 80,
              onClose: () => {
                this.$router.push({
                  path: this.$route.query.returnUrl
                    ? this.$route.query.returnUrl
                    : "/",
                });
              },
            });
          } else {
            this.$message({
              // 提示错误信息
              message: "账号或密码不正确",
              type: "error",
              offset: 80,
            });
          }
        }
      });
    },
  },
  deactivated() {
    document.removeEventListener("keydown", this.loginEvent);
  },
  activated() {
    document.addEventListener("keydown", this.loginEvent);
  },
  destroyed() {
    document.removeEventListener("keydown", this.loginEvent);
  },
};
</script>

<style lang="less" scoped>
a {
  font-size: 0.85rem;
  margin-right: 1rem;
}
p {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #99a2aa;
  line-height: 16px;
  a {
    font-size: 12px;
    color: #00a1d6;
    margin-right: 0;
  }
}
::v-deep .el-form-item__label {
  text-align: right;
}
::v-deep .el-input__inner {
  background-color: hsla(0, 0%, 100%, 0.9);
  border-radius: 0;
}
::v-deep
  .el-form-item.is-required:not(.is-no-asterisk)
  > .el-form-item__label:before {
  display: none;
}
</style>