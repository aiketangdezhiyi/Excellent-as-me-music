<template>
  <div class="add-lyric-container">
    <el-input @input="$emit('input', $event)" :value="content" placeholder="请输入歌词"></el-input>
    <div class="bottom">
      <span class="time-wrapper">{{ time }}</span>
      <span class="icon-container">
        <i ref="resetDom" :class="{
          rotate: rotateClick,
        }" @click="resetTime" title="设置为当前歌曲播放时间" class="el-icon-refresh"></i>
        <i @click="$emit('add', idx)" title="再插入一句歌词" class="el-icon-circle-plus"></i>
        <i @click="$emit('remove', idx)" title="删除这条歌词" class="el-icon-remove"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    idx: Number,
    content: String,
    time: String,
  },
  data() {
    return {
      rotateClick: false,
    };
  },
  methods: {
    resetTime() {
      this.$refs.resetDom.style.transition = "transform .5s";
      this.rotateClick = true;
      this.$emit("reset", this.idx);
      setTimeout(() => {
        this.$refs.resetDom.style.transition = "none";
        this.rotateClick = false;
      }, 500);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/myStyle.less";

.time-wrapper {
  width: 300px;
  color: #fff;
}

/deep/ .el-input__inner {
  border-radius: 27px;
}

.add-lyric-container {
  width: 600px;

  .bottom {
    margin-top: 5px;
  }
}

.icon-container {
  color: @cyan;
  font-size: 18px;

  i {
    cursor: pointer;
    margin: 0 3px;
    transition: transform 0.3s;

    &:hover {
      transform: translateY(-2px);
    }
  }

  .el-icon-refresh {
    color: #fff;

    &.rotate {
      transform: translateY(-2px) rotate(360deg);
    }
  }

  .el-icon-remove {
    color: @pink;
  }
}
</style>