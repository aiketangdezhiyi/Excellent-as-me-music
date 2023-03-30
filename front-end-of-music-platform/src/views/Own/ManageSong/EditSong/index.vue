<template>
  <DialogComp @maskClick="$emit('maskClick')" title="编辑歌曲信息">
    <template>
      <el-form class="form-wrapper" label-width="80px">
        <el-form-item label="歌名:">
          <el-input
            v-model="formData.songName"
            placeholder="请输入歌曲名"
          ></el-input>
        </el-form-item>
        <p class="group">
          <span class="label">时长：</span
          ><span class="value">{{ songItem.duration | formatTime }}</span>
        </p>
        <p class="group">
          <span class="label">播放量：</span
          ><span class="value">{{ songItem.broadcast }}</span>
        </p>

        <p class="group">
          <span class="label">歌词：</span
          ><span class="value">{{
            songItem.lyric ? "已有歌词" : "没有歌词"
          }}</span>
          <el-button @click="toLyric" class="btn" type="primary"
            >管理歌词</el-button
          >
        </p>
        <p class="group">
          <span class="label">性质：</span
          ><span class="value">{{ isCreative ? "创作歌曲" : "他人歌曲" }}</span>
          <el-button
            @click="showMessageTip = true"
            class="btn"
            v-if="isCreative"
            type="primary"
            >转为个人歌曲</el-button
          >
          <el-button
            @click="$emit('applySongToCreative', songItem.id, userDesc)"
            class="btn success"
            v-if="!isCreative"
            type="primary"
            >申请为创作歌曲</el-button
          >
        </p>
        <el-input
          class="text-area"
          type="text-area"
          v-model="userDesc"
          placeholder="如果你要申请为创作歌曲，可以在这里添加说明更容易通过审核"
        ></el-input>
      </el-form>
    </template>
    <template #footer>
      <el-button :loading="confirmLoading" class="confirm-btn" @click="confirm"
        >提交新歌名</el-button
      >
    </template>

    <ImportantTipComp
      @handleConfirm="handleConfirmChange"
      @maskHide="showMessageTip = false"
      :showMessage="showMessageTip"
      :confirmLoading="changeLoading"
      importantTip="歌曲将转为非创作歌曲"
    />
  </DialogComp>
</template>

<script>
import DialogComp from "@/components/DialogComp";
import { formatTime } from "@/utils/time";
import ImportantTipComp from "@/components/ImportantTipComp";
export default {
  components: {
    DialogComp,
    ImportantTipComp,
  },
  props: {
    confirmLoading: Boolean,
    songItem: Object,
  },
  data() {
    return {
      formData: {
        songName: "",
      },
      userDesc: "",
      isCreative: false, // 后台不返回在审核的创作歌曲
      showMessageTip: false, // 展示删除提示
      changeLoading: false,
    };
  },
  filters: {
    formatTime,
  },
  created() {
    this.formData.songName = this.songItem.originName;
    this.isCreative = this.songItem.creative == 1 && this.songItem.status == 2;
  },
  methods: {
    toLyric() {
      this.$emit("maskClick");
      setTimeout(() => {
        this.$router.push("/addLyric/" + this.songItem.id)
      }, 0);
    },
    confirm() {
      if (this.formData.songName === this.songItem.originName) {
        this.$message({
          message: "歌名好像没有改变哦",
          duration: 1500,
        });
        return;
      }
      this.$emit("confirm", this.formData.songName); // 确定
    },
    handleConfirmChange() {
      // 修改歌曲为非创作歌曲 按了确定
      this.changeLoading = true;
      this.$emit("changeSongToUnCreative", () => {
        // 父组件调用子组件回调
        this.changeLoading = false;
        this.showMessageTip = false;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.confirm-btn,
.btn {
  font-size: 14px;
  width: 160px;
  height: 40px;
  margin-top: 18px;
  background: #00a1d6;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  &:hover {
    background: #00b5e5;
  }
}
.btn {
  margin-top: 0;
  &.success {
    background: #67c23a;
  }
}
.form-wrapper {
  margin-top: 10px;
}
.group {
  width: 100%;
  height: 30px;
  line-height: 30px;
  display: block;
  margin-bottom: 15px;
  .label {
    width: 80px;
  }
  .label,
  .value {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
  }
}

::v-deep .el-input__inner {
  border-radius: 0;
  border-width: 0;
  border-bottom-width: 1px;
}
::v-deep .el-form-item {
  margin-bottom: 15px;
}
::v-deep .main {
  height: auto !important;
  overflow: auto !important;
}
</style>