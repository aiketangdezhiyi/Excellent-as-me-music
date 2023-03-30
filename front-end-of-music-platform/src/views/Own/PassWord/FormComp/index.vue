<template>
  <el-form
    :model="userFormData"
    :rules="rules"
    label-width="100px"
    action="#"
    ref="formDom"
    :show-message="false"
  >
    <el-form-item label="账号">
      <el-input type="text" v-model="user" disabled></el-input>
    </el-form-item>
    <el-form-item label="原密码" prop="pwd">
      <el-input
        @focus="
          alterInfo.pwd.info = '';
          alterInfo.pwd.isShow = false;
        "
        v-model="userFormData.pwd"
        type="password"
      ></el-input>

      <AlertInfo :alterInfo="alterInfo.pwd"></AlertInfo>
    </el-form-item>
    <el-form-item label="你的新密码" prop="newPwd">
      <el-input
        @focus="
          alterInfo.newPwd.info = '';
          alterInfo.newPwd.isShow = false;
        "
        v-model="userFormData.newPwd"
        type="password"
        @input="input"
      ></el-input>
      <AlertInfo :alterInfo="alterInfo.newPwd"></AlertInfo>
    </el-form-item>
    <div class="strength-container">
      <StrengthComp :levelType="levelType" />
    </div>
    <el-form-item label="确认密码" prop="rePwd">
      <el-input
        @focus="
          alterInfo.rePwd.info = '';
          alterInfo.rePwd.isShow = false;
        "
        v-model="userFormData.rePwd"
        type="password"
      ></el-input>
      <AlertInfo :alterInfo="alterInfo.rePwd"></AlertInfo>
    </el-form-item>
    <el-form-item class="group-container">
      <button @click.prevent="handleChangePwd" class="form-reg-btn">
        确定修改密码
      </button>
    </el-form-item>
  </el-form>
</template>



<script>
import AlertInfo from "./AlertInfo";
import StrengthComp from "@/components/StrengthComp";
import { mapState } from "vuex";

function getValidate(_this, str = "新密码", prop = "newPwd") {
  return function (rule, value, cb) {
    var reg = /[\dA-Za-z_*-/]*/;
    if (value === "") {
      this.alterInfo[prop].info = str + "不能为空";
      cb(this.alterInfo[prop].info);
    } else if (value.length < 6 || value.length > 16) {
      this.alterInfo[prop].info = str + "必须为6-15位,可包括字母数字_*-/组成";
      cb(str + "必须为6-15位,可包括字母数字_*-/组成");
    } else {
      if (reg.test(value)) {
        this.alterInfo[prop].info = "";
        cb();
      } else {
        this.alterInfo[prop].info = str + "必须为6-15位,可包括字母数字_*-/组成";
        cb(str + "必须为6-15位,可包括字母数字_*-/组成");
      }
    }
    this.alterInfo[prop].isShow = true;
  }.bind(_this);
}
export default {
  components: {
    AlertInfo,
    StrengthComp, 
  },
  computed: {
    ...mapState("User", ["userId", "user"]),
  },
  data() {
    const validatePwd = getValidate(this, "旧密码", "pwd");
    const validateNewPwd = getValidate(this, "新密码", "newPwd");
    return {
      userFormData: {
        pwd: "",
        newPwd: "",
        rePwd: "",
      },
      alterInfo: {
        pwd: {
          info: "",
          isShow: false,
        },
        newPwd: {
          info: "", // 错误信息是什么
          isShow: false, // 是否展示错误信息
        },
        rePwd: {
          info: "",
          isShow: false,
        },
      },
      levelType: 0,
      rules: {
        pwd: [{ validator: validatePwd, trigger: "blur" }],
        newPwd: [{ validator: validateNewPwd, trigger: "blur" }],
        rePwd: [{ validator: this.validateRePwd, trigger: "blur" }],
      },
    };
  },
  methods: {
    validateRePwd(rule, value, cb) {
      if (value === "") {
        this.alterInfo.rePwd.info = "确认密码不能为空";
        cb("确认密码不能为空");
      } else if (value !== this.userFormData.newPwd) {
        this.alterInfo.rePwd.info = "两次输入的密码不一致";
        cb("两次输入的密码不一致");
      }

      this.alterInfo.rePwd.isShow = true;
      cb();
    },
    input() {
      var reg = /[\dA-Za-z_*-/]{6,15}/g;
      if (reg.test(this.userFormData.newPwd)) {
        this.levelType = 1;
        if (this.userFormData.newPwd.length >= 10) {
          this.levelType = 2;
        }
        if (this.userFormData.newPwd.length > 15) {
          this.levelType = 3;
        }
      } else {
        this.levelType = 0;
      }
      // 这里就不真的去计算密码的复杂度
      // 符合密码 并且长度 6 - 9  10 - 13  > 13
    },
    handleChangePwd() {
      this.$refs.formDom.validate(async (valid) => {
        if (valid) {
          // 校验成功
          const res = await this.$api.changePwd({
            user: this.user,
            newPwd: this.userFormData.newPwd,
            oldPwd: this.userFormData.pwd,
          });
          if (res.code === 200) {
            this.$message({
              message: "密码修改成功",
              type: "success",
              duration: 1500,
            });
            this.$store.dispatch("User/logout");
            setTimeout(() => {
              this.$router.push(`/login?returnUrl=${this.$route.fullPath}`);
            }, 1500);
          } else {
            this.$message({
              message: res.err,
              type: "error",
              duration: 1500,
            });
          }
        } else {
          this.$message({
            message: "你填的信息好像还有点小问题哦",
            type: "warning",
            duration: 1500,
          });
        }
      });
    },
  },
};
</script>



<style lang="less" scoped>
@import "~@/styles/myStyle.less";
/deep/ .el-input.is-disabled .el-input__inner {
  color: @blue;
  background: @lightblue;
  border-color: @blue;
}
/deep/ .el-form-item.is-error .el-input__inner {
  border-color: #aaa;
}
.el-input {
  display: inline-block;
  width: auto;
  /deep/ input {
    width: 248px;
    height: 24px;
    padding: 5px 10px;
    border: 1px solid #aaa;
    line-height: 24px;
    box-sizing: content-box;
    border-radius: 0;
    &:focus {
      border-color: @blue;
    }
  }
}
.strength-container {
  width: 270px;
  padding-left: 100px;
  height: 20px;
  margin-top: -15px;
  margin-bottom: 15px;
}
.form-reg-btn {
  color: #fff;
  width: 270px;
  height: 34px;
  background-image: linear-gradient(135deg, @blue 0, @cyan 100%);
  border-width: 0;
  box-shadow: 0 1px 3px rgba(191, 105, 0, 0.15);
  font-size: 14px;
  font-weight: 700;
  line-height: 34px;
  letter-spacing: 0.1em;
  text-align: center;
  border-radius: 2px;
  cursor: pointer;
  box-sizing: border-box;
  transition: box-shadow 0.3s;
  &:hover {
    box-shadow: 0 2px 3px rgba(191, 105, 0, 0.25);
  }
}
.group-container {
  margin-top: -5px;
}
a {
  color: #fe8c00;
  font-size: 13px;
}
</style>