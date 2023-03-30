
<template>
  <div class="avatar-container">
    <div class="avatar-content">
      <h2>设置一个您喜爱的头像:</h2>
      <p>（请选择图片文件，最佳尺寸400 x 400，支持JPG,JPEG,GIF,PNG）</p>
      <div class="preview">
        <p style="margin-bottom:8px">头像预览</p>
        <img :src="avatar" alt="" />
      </div>
      <el-upload
        class="upload-demo"
        ref="upload"
        name="picture"
        :action="actionUrl"
        :on-success="successUpload"
        :on-preview="handlePreview"
        :show-file-list="false"
      >
        <el-button
          style="background: #00a1d6"
          slot="trigger"
          size="small"
          type="primary"
          >选取文件</el-button
        >
        <span style="margin-left: 10px" slot="tip" class="el-upload__tip">
          只能上传jpg/png文件,建议比例1：1
        </span>
      </el-upload>
      <el-button
        @click="handleUpdateAvatar"
        title="如果觉得好看就更新头像吧"
        class="upload-btn"
        :loading="uploadLoading"
      >
        更新头像
      </el-button>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */

const defaultAvatar = "/avatar/defaultAvatar.jpg";
import { mapState } from "vuex";
export default {
  data() {
    return {
      avatar: defaultAvatar,
      actionUrl: "/api/upload/avatar",
      uploadLoading: false,
    };
  },
  computed: {
    ...mapState("User", ["userId"]),
  },
  created() {
    document.title = "我的头像";
  },
  methods: {
    handlePreview(file) {
      console.log(file);
    },
    async successUpload({ code, msg, data: url }, file) {
      if (code === 200) {
        this.avatar = url;
      } else {
        this.$message({
          // 有错误
          type: "error",
          message: msg,
          duration: 1000,
        });
      }
    },
    async handleUpdateAvatar() {
      // 更新头像
      this.uploadLoading = true;
      if (this.avatar !== defaultAvatar) {
        // 确实上传了新的头像
        await this.$api.updateAvatar({
          avatarUrl: this.avatar,
          UserId: this.userId,
        });
        await this.$store.dispatch("User/refresh");
        this.$message({
          message: "更新成功",
          duration: 1500,
          type : "success"
        });
        this.uploadLoading = false;
      } else {
        this.$message({
          message: "请上传头像后再更新头像",
          duration: 1500,
        });
        this.uploadLoading = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.avatar-container {
  display: flex;
  justify-content: center;
  padding: 2rem 0 5rem 0;
  .avatar-content {
    text-align: center;
    color: #00a1d6;
    h2 {
      font-weight: normal;
      height: 27px;
      line-height: 27px;
      font-size: 1.3rem;
    }
    & > p {
      font-size: 0.85rem;
      margin-bottom: 20px;
    }
    .preview {
      margin-bottom: 27px;
      p {
        color: #1a1a1a;
      }
      img {
        border-radius: 10px;
        width: 270px;
        height: 270px;
        box-shadow: -1px -1px 1px rgba(0, 0, 0, 0.2);
      }
    }
    .upload-btn {
      margin-top: 27px;
      border: 1px solid #00a1d6;
      color: #fff;
      width: 140px;
      padding: 10px 0;
      font-size: 14px;
      border-radius: 4px;
      cursor: pointer;
      background-color: #00a1d6;
      transition: 0.3s;
      &:hover {
        background-color: #00b5e5;
        border-color: #00b5e5;
      }
    }
  }
}
</style>