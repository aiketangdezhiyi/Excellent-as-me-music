<template>
  <div class="change-container">
    <el-form
      style="width: 70%; margin: 0 auto"
      label-width="80px"
      ref="userForm"
      :model="userInfo"
    >
      <el-form-item label="昵称:" prop="name">
        <el-input
          class="my-el-input"
          style="width: 60%"
          v-model="userInfo.name"
          placeholder="你的昵称"
        ></el-input>
        <p class="info">注：修改一次昵称需要消耗6个优币</p>
      </el-form-item>
      <el-form-item label="账号:">
        <span class="user">{{ user }}</span>
      </el-form-item>
      <el-form-item label="性别:">
        <el-radio-group v-model="userInfo.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="我的签名:">
        <el-input
          placeholder="设置你的签名(∩_∩)"
          type="textarea"
          v-model="userInfo.signature"
        >
        </el-input>
      </el-form-item>
    </el-form>
    <div class="line"></div>
    <div class="text-center" style="margin-top: 27px">
      <el-button :loading="saveLoading" class="save-btn" @click="handleSave"
        >保存</el-button
      >
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      userInfo: {
        name: "",
        sex: 1,
        signature: "",
      },
      saveLoading: false,
    };
  },
  created() {
    document.title = "个人信息";
    this.userInfo.name = this.username;
    this.userInfo.sex = this.sex ? 1 : 0;
    this.userInfo.signature = this.signature;
  },
  computed: {
    ...mapState("User", ["sex", "username", "user", "signature", "userId"]),
  },
  methods: {
    async handleSave() {
      this.saveLoading = true;
      const name = this.userInfo.name;
      const reg = /^[\w\W]{2,6}$/;
      if (reg.test(name)) {
        // 通过验证
        const { code, data } = await this.$api.updateInfo({
          ...this.userInfo,
          UserId: this.userId,
        });
        if (code === 200) {
          this.$store.commit("User/setUserInfo", data); // 更新用户数据
          this.$message({
            message: "保存成功",
            type: "success",
            duration: 2000,
            center: true,
          });
          this.saveLoading = false;
        }
      } else {
        this.$message({
          message: "昵称长度在2到6个字符",
          type: "warning",
          duration: 2000,
          center: true,
        });
        this.saveLoading = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.change-container {
  padding: 3.5rem 50px;
  .info {
    color: #aaa;
  }
  .user {
    font-size: 14px;
    color: #898989;
  }
  .save-btn {
    width: 110px;
    background: #00a1d6;
    border-color: #4db3ff;
    color: #fff;
    padding: 10px 15px;
    border-radius: 4px;
  }
  .line {
    width: 95%;
    margin: 0 auto;
    padding: 30px 0 5px 0;
    border-bottom: 1px solid #e5e9ef;
  }
}
/deep/ .el-form-item {
  margin-bottom: 13px;
}
/deep/ .el-textarea__inner {
  min-height: 100px !important;
  resize: none;
  font-size: 16px;
}
/deep/ .my-el-input .el-input__inner {
  height: 30px;
  line-height: 30px;
}
/deep/ .el-input__inner {
  color: #1f2d3d;
  padding: 0 10px;
}
/deep/ .el-textarea__inner {
  padding: 5px 10px;
}
</style>