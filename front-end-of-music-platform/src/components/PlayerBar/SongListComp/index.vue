<template>
  <div
    class="song-list-container"
    ref="container"
    :class="{
      show: showSongList,
    }"
  >
    <div class="header">
      <span>播放列表/{{ songList.length }}</span>
      <span @click="$emit('close', false)" class="close el-icon-close"></span>
    </div>
    <div @mousewheel="handleMouseScroll" ref="songContainer" class="content">
      <SongItem
        @mounted="listMounted"
        v-for="(item, i) in songList"
        :key="item.id"
        :songItem="item"
        :index="i"
      />
    </div>
    <div v-if="isShowBar" class="scroll-bar-container">
      <div
        @mousedown="handleDragStart"
        ref="scrollBar"
        class="scroll-bar"
        :style="{
          top: dragTop.value + 'px',
        }"
      ></div>
    </div>
  </div>
</template>

<script>
import SongItem from "./SongItem";
import gsap from "gsap";
export default {
  components: {
    SongItem,
  },
  props: {
    showSongList: Boolean,
    songList: Array,
  },
  data() {
    return {
      isDrag: false, // 是否在进行拖拽
      dragTop: {
        value: 0, // 为了实现渐变滚动的效果
      },
      isShowBar: false,
    };
  },
  mounted() {
    document.addEventListener("mouseup", this.handleMouseUp);
  },
  methods: {
    handleMouseScroll(e) {
      let newDragTop = this.dragTop.value;
      const rate =
        this.$refs.songContainer.scrollHeight /
        this.$refs.songContainer.clientHeight;
      const n = 30 * rate;
      if (rate <= 1) {
        return; // 滚动高度小于容器高度
      }
      if (e.wheelDelta > 0) {
        // 向上滚动
        // console.log("向下滚动")
        newDragTop = newDragTop - n <= 0 ? 0 : newDragTop - n;
      } else {
        // console.log("向上滚动")

        newDragTop = newDragTop + n > 294 ? 294 : newDragTop + n; // 360 - 66
      }
      gsap.to(this.dragTop, {
        // 数据渐变 让滚动条有动画滚动的效果
        value: newDragTop,
        duration: 0.3,
      });
    },
    listMounted() {
      this.isShowBar =
        this.$refs.songContainer.scrollHeight >
        this.$refs.songContainer.offsetHeight;
    },
    handleMouseUp() {
      this.isDrag = false; // 拖拽结束
      document.removeEventListener("mousemove", this.handleDragMove);
    },
    handleClose(done) {
      done();
    },
    handleDragStart(e) {
      // 拖拽移动

      this.mouseStartY = e.clientY; // 开始拖拽时鼠标位置
      this.dragStartTop = this.dragTop.value; // 去到未拖拽的高度
      this.isDrag = true;
      document.addEventListener("mousemove", this.handleDragMove);
    },
    handleDragMove(e) {
      if (!this.isDrag) {
        // 不是拖拽
        return;
      }
      const diff = e.clientY - this.mouseStartY;
      let newTop = this.dragStartTop + diff;
      if (newTop < 0) {
        newTop = 0;
      }
      newTop = newTop > 294 ? 294 : newTop; // 360 - 66
      this.dragTop.value = newTop;

      // scrollTop / (scrollHeight - offsetHeight) = newTop / (360 - 66)
    },
  },
  beforeDestroy() {
    this.$refs.container.remove();
    document.removeEventListener("mouseup", this.handleMouseUp);
    document.removeEventListener("mousemove", this.handleDragMove);
  },
  watch: {
    ["dragTop.value"](newScrollTop) {
      // 通过设置滚动条的位置影响容器的滚动距离
      this.$refs.songContainer.scrollTop =
        (newScrollTop *
          (this.$refs.songContainer.scrollHeight -
            this.$refs.songContainer.offsetHeight)) /
        (360 - 66);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/myStyle.less";
.song-list-container {
  width: 400px;
  position: fixed;
  background: #2f343b;
  position: fixed;
  transform: translateY(-105%) rotateX(90deg);
  transition: transform 0.5s;
  transform-origin: center bottom;
  z-index: 1025;
  color: #fff;
  &.show {
    transform: translateY(-105%) rotateX(0deg);
  }
  .header {
    position: relative;
    height: 50px;
    padding: 0 19px;
    width: 100%;
    box-sizing: border-box;
    background: #2a2e35;
    font-size: 16px;
    line-height: 50px;
    overflow: hidden;
    color: #86898e;
    span:nth-of-type {
      float: left;
    }
    .close {
      float: right;
      height: 50px;
      line-height: 50px;
      cursor: pointer;
      transition: color 0.3s;
      &:hover {
        color: @cyan;
      }
    }
  }
  .content {
    height: 360px;
    overflow-y: hidden;
    overflow-x: hidden;
    padding: 0 19px;
  }
  .scroll-bar-container {
    width: 10px;
    height: 360px;
    position: absolute;
    right: 0;
    top: 50px;
  }
  .scroll-bar {
    height: 66px;
    width: 10px;
    border-radius: 20px;
    background: #fff;
    opacity: 0.2;
    position: absolute;
    right: 0;
    cursor: pointer;
    top: 0;
    &:hover {
      opacity: 0.3;
    }
  }
}
</style>