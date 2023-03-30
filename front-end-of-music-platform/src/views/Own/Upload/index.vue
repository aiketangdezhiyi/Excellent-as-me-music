
<template>
  <div class="upload-container p-r">
    <transition name="upload" mode="out-in" :duration="500">
      <div :key="1" v-if="!isUploaded">
        <img
          :class="{
            hide: !loading,
          }"
          style="width: 20%; margin-bottom: -100px"
          src="@/assets/loading.gif"
          alt=""
        />
        <p style="margin-bottom: 27px">
          亲，你可以在这里上传歌曲，然后到<span
            @click="routerToManageSong"
            style="color: #14a9ff; cursor: pointer"
            >我的上传歌曲</span
          >进行管理
        </p>
        <el-upload
          class="upload-demo"
          drag
          :show-file-list="false"
          :action="actionUrl"
          name="mp3"
          :limit="1"
          :on-success="successUpload"
          :before-upload="beforeUpload"
          :on-error="showErrorMessage"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将歌曲拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">上传歌曲，支持mp3</div>
        </el-upload>
      </div>
      <div :key="2" v-else>
        <h1>
          <span>歌曲信息</span>
        </h1>
        <el-form class="upload-form" label-width="130px">
          <el-form-item label="歌名：">
            <el-input v-model="uploadInfo.songName"></el-input>
          </el-form-item>
          <el-form-item label="歌长：">
            <el-input v-model="uploadInfo.songTime" disabled></el-input>
          </el-form-item>
          <el-form-item label="歌曲性质：">
            <el-radio-group v-model="type">
              <el-radio
                v-for="item in radioGroup"
                :key="item.value"
                :label="item.value"
                :title="item.title"
                >{{ item.label }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button
              @click="addSong"
              style="width: 100%; border-radius: 0"
              type="primary"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </transition>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */

import { mapState } from "vuex";
import { formatTime } from "../../../utils/time";
export default {
  data() {
    return {
      actionUrl: "/api/upload/song",
      type: 1,
      radioGroup: [
        {
          title:
            "创作歌曲包含自己唱的，作者同意的上传，或已经有版权的，此歌曲上传后需由管理员审核，若审核不过，将会默认转为他人歌曲",
          label: "创作歌曲",
          value: 1,
        },
        {
          title:
            "他人歌曲为他人歌曲，未经过他人同意上传，仅供自己在歌单内播放不会发布到平台上作为共享资源",
          label: "他人歌曲",
          value: 2,
        },
      ],
      loading: false,
      isUploaded: false,
      uploadInfo: {
        url: "",
        songName: "",
        songTime: "",
        duration: 0,
      },
    };
  },
  created() {
    document.title = "上传";
  },
  computed: {
    ...mapState("User", ["userId"]),
  },
  methods: {
    beforeUpload(file) {
      this.loading = true;
      const lastIndex = file.name.lastIndexOf(".");
      // 处理后缀名
      if (lastIndex >= 0) {
        this.uploadInfo.songName = file.name.substring(0, lastIndex);
      } else {
        this.uploadInfo.songName = file.name;
      }
    },
    showErrorMessage() {
      this.$message({
        message: "抱歉出错了哦",
        type: "error",
        duration: 1500,
      });
    },
    async successUpload({ code, data: url }, file) {
      if (code === 200) {
        // 歌曲上传成功
        // 获取歌长
        this.uploadInfo.url = url;
        const { code, data: duration } = await this.$api.requestSongLen({
          url,
        });

        if (code === 200) {
          this.uploadInfo.duration = duration;
          this.uploadInfo.songTime = formatTime(duration);
          this.loading = false;
          this.isUploaded = true;
        }
      } else {
        this.showErrorMessage();
      }
    },
    async addSong() {
      const { code, data } = await this.$api.storeSongInfo({
        url: this.uploadInfo.url,
        UserId: this.userId,
        originName: this.uploadInfo.songName,
        duration: this.uploadInfo.duration,
        type: this.type,
      });
      if (code === 200) {
        this.$message({
          message: "成功添加歌曲",
          type: "success",
          duration: 1500,
        });
      } else {
        this.$message({
          message: data,
          type: "error",
          duration: 1500,
        });
      }
    },
    routerToManageSong() {
      this.$router.push({
        name: "OwnSong",
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/myStyle.less";
.upload-container {
  width: 100%;
  height: 600px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  p {
    width: 100%;
  }
}

h1 {
  font-weight: 400;
  font-size: 1.5rem;
  span {
    display: inline-block;
    padding: 15px 15px;
    letter-spacing: 1px;
    color: #1a1a1a;
    border-bottom: 3px solid rgba(187, 239, 253, 0.3);
    background-color: rgba(187, 239, 253, 0.3);
  }
  margin-bottom: 30px;
}
.hide {
  opacity: 0;
}
.upload-form {
  width: 400px;
  text-align: left;
}

.upload-enter-active,
.upload-leave-active {
  transition: 0.5s ease-in;
}
.upload-enter {
  transform: translateY(100%);
  opacity: 0;
}
.upload-enter-to,
.upload-leave {
  transform: translateY(0);
  opacity: 1;
}
.upload-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
/deep/ .el-input__inner {
  border-radius: 0;
  border: 0;
  border-bottom: 1px solid @blue;
  font-size: 1.2rem;
}
/deep/ .el-input.is-disabled .el-input__inner {
  background-color: transparent;
  border-bottom-color: @blue;
}
/deep/ .el-form-item__label {
  color: #666;
  font-size: 1.2rem;
}
/deep/ .el-upload-list {
  position: absolute;
  max-height: 153px;
  overflow: auto;
  width: 360px;
  box-sizing: border-box;
  left: 50%;
  transform: translateX(-50%);
}
</style>