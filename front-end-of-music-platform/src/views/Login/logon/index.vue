<template>
  <el-form
    ref="formDom"
    :model="formDatas"
    label-width="80px"
    :rules="validator"
    :show-message="false"
  >
    <el-form-item prop="username" label="昵称">
      <el-input
        placeholder="请输入您的昵称"
        v-model="formDatas.username"
      ></el-input>
    </el-form-item>
    <el-form-item prop="user" label="账号">
      <el-input
        placeholder="请输入您的账号"
        v-model="formDatas.user"
      ></el-input>
    </el-form-item>
    <el-form-item prop="pwd" label="密码">
      <el-input
        placeholder="请输入您的密码"
        type="password"
        v-model="formDatas.pwd"
      ></el-input>
    </el-form-item>
    <el-form-item prop="repeatpwd" label="确认密码">
      <el-input
        placeholder="请输入确认密码"
        type="password"
        v-model="formDatas.repeatpwd"
      ></el-input>
    </el-form-item>
    <el-form-item prop="computedMath" style="height: 40px" label="验证码">
      <el-input
        placeholder="请输入验证码"
        v-model="formDatas.computedMath"
        type="text"
        style="
          width: 50%;
          display: inline-block;
          vertical-align: top;
          margin-right: 27px;
        "
      ></el-input
      ><img @click="changeCaptcha" style="height: 40px" :src="captchaSrc" />
    </el-form-item>
    <div class="btn-wrapper">
      <LoginButton
        title="注 册"
        @click.native="addUser"
        :isLoading="logonLoading"
      />
    </div>
  </el-form>
</template>

<script>
import LoginButton from "../components/LoginButton";
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
    this.validator = {
      username: [
        { required: true, message: "请填写昵称", trigger: "submit" },
        {
          min: 3,
          max: 5,
          message: "昵称长度在 3 到 6 个字符",
          trigger: "submit",
        },
      ],
      user: [
        { required: true, message: "请填写账号名", trigger: "submit" },
        {
          min: 6,
          max: 15,
          message: "账号长度在 6 到 15 个字符",
          trigger: "submit",
        },
      ],
      computedMath: [
        { required: true, message: "请填写验证码", trigger: "submit" },
      ],
      pwd: [
        {
          validator: this.$utils.handleCheckPwd,
          trigger: "submit",
          required: true,
        },
      ],
      repeatpwd: [
        {
          validator: (rules, val, callback) => {
            if (val === "") {
              callback(new Error("确认密码不能为空"));
            } else if (val !== this.$data.formDatas.pwd) {
              callback(new Error("两次密码不一致"));
            } else {
              callback();
            }
          },
          trigger: "submit",
        },
      ],
    };
    this.logonEvent = (e) => {
      if (e.key === "Enter") {
        this.addUser();
      }
    };
    return {
      formDatas: {
        username: "",
        user: "",
        pwd: "",
        repeatpwd: "",
        computedMath: "",
      },
      captchaSrc: `/api/captcha?a=${Math.random().toString().substring(2)}`, // 验证码地址
      logonLoading: false,
    };
  },
  mounted() {
    document.addEventListener("keydown", this.logonEvent);
  },
  methods: {
    changeCaptcha() {
      this.captchaSrc = `/api/captcha?a=${Math.random()
        .toString()
        .substring(2)}`;
    },
    addUser() {
      // 注册
      this.logonLoading = true;
      this.$refs.formDom.validate(async (isTrue, obj) => {
        // 验证表单
        if (!isTrue) {
          const errFileds = Object.getOwnPropertyNames(obj);
          const errMsg = obj[errFileds[0]][0].message;
          this.$message({
            // 提示错误信息
            message: errMsg,
            type: "warning",
            offset: 80,
          });
          this.logonLoading = false;
        } else {
          // 验证通过 发送请求 添加用户
          this.$store
            .dispatch("User/addUser", {
              username: this.formDatas.username,
              user: this.formDatas.user,
              pwd: this.formDatas.pwd,
              captcha: this.formDatas.computedMath,
            })
            .then((res) => {
              if (res.code === 200) {
                // 注册成功
                localStorage.setItem("user", res.data.user); // 存注册的账号
                this.logonLoading = false;
                this.$message({
                  message: "注册成功",
                  type: "success",
                  offset: 80,
                  duration: 1500,
                  onClose: () => {
                    this.$emit("logoned", true); // 告诉父组件注册过了，切换到登陆组件
                  },
                });
              } else {
                this.$message({
                  message: res.err,
                  type: "error",
                  offset: 80,
                });
                this.logonLoading = false;
              }
              this.changeCaptcha();
            })
            .catch((res) => {
              this.$message({
                message: res.err,
                type: "error",
                offset: 80,
              });
              this.changeCaptcha();
              this.logonLoading = false;
            });
        }
      });
    },
  },
  deactivated() {
    document.removeEventListener("keydown", this.logonEvent);
  },
  activated() {
    document.addEventListener("keydown", this.logonEvent);
  },
  destroyed() {
    document.removeEventListener("keydown", this.logonEvent);
  },
};
</script>

<style lang="less" scoped>
a {
  font-size: 0.85rem;
  margin-right: 1rem;
}
.btn-wrapper {
  margin-bottom: 10px;
  font-family: Merriweather, "Open Sans";

  .logon-btn {
    width: 100%;
    border-radius: 0;
    border: 1px solid lighten(#1890ff, 5%);
    color: #fff;
    margin-right: 10px;
    background-color: #1890ff;
    &:hover {
      background-color: #1890ff;
    }
  }
}
/deep/ .el-input__inner {
  border-radius: 0;
}
/deep/ .el-form-item__content {
  height: 40px;
  margin-bottom: 3px;
}
::v-deep
  .el-form-item.is-required:not(.is-no-asterisk)
  > .el-form-item__label:before {
  display: none;
}
</style>