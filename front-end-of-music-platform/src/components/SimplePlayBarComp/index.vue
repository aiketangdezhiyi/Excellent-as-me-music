<template>
  <div class="player-bar-container" @mousemove="handleDragMove">
    <div class="player-bar-content">
      <div class="player-control">
        <span
          class="player-control-btn"
          @click="handlePlay"
          :class="{
            'player-control-pause': audio.status === 'play',
            'player-control-play':
              audio.status === 'pause' || audio.status === undefined,
          }"
        ></span>
        <!-- class 动态控制 -->
      </div>
      <div class="player-process">
        <div class="player-info-wrapper">
          <h2 class="text-ellipsis" :title="songItem.originName | formatSongName">{{ songItem.originName | formatSongName }}</h2>
          <div class="player-time">
            {{ currentTime | renderPlayerTime }} /
            {{ audio.totalTime | renderPlayerTime }}
          </div>
        </div>
        <div class="player-process-bg-bar" ref="bgBar">
          <div
            class="player-process-inner-bar"
            :style="{
              width: processWidth + 'px',
            }"
          ></div>
          <span
            class="circle"
            @mousedown="handleDragDown"
            :style="{
              left: processWidth + 'px',
            }"
          ></span>
        </div>
      </div>
      <div class="player-ico">
        <span class="player-volumn">
          <VolumeBar :initHeight="0.5" @volumePercentage="handleVolume" />
        </span>
       
      </div>
    </div>
  </div>
</template>

<script>
import AudioPlayer from "../../utils/player";
import { formatTime } from "../../utils/time";
import VolumeBar from "@/components/VolumeBar";
import { formatSongName } from "@/utils/song";
window.audioDOM = null;
export default {
  props : {
    songItem : Object
  },
  data() {
    return {
      audio: {},
      currentTime: 0,
      timer: null,
      processWidth: 0, //进度条的长度
      isDragInValidRegion: false, // 是否在有效的区域内进行拖拽
    };
  },
  components: {
    VolumeBar
  },
  computed: {
    barWidth() {
      return this.$refs.bgBar.offsetWidth; // 为了严谨性，还是获取真的DOM的尺寸
    },
  },
  created() {
    this.audio = new AudioPlayer(
      this.songItem.url,
      0.5,
      this.songItem.duration
    );
    window.audioDOM = this.audio.audioDOM;
    this.handleMouseUp = () => {
      // 进行优化处理 组件销毁时移除事件
      if (this.isDragInValidRegion) {
        // 做优化 不然会跟音量调节发生冲突
        this.isDragInValidRegion = false;
        this.audio.goToTime(
          (this.processWidth / this.barWidth) * this.audio.totalTime
        );
        this.currentTime = this.audio.audioDOM.currentTime;
        if (this.lastStatus) {
          // 上一个状态是播放
          // 恢复歌曲状态
          this.handlePlay();
        }
      }
    };
    document.addEventListener("mouseup", this.handleMouseUp);

    this.audio.audioDOM.addEventListener("ended", () => {
      // 歌曲播放完成
      this.$store.commit("Song/nextSong");
    });
  },
  mounted() {
    this.$nextTick(() => {
      // 保证子组件渲染完
      this.$emit("eventGetHeight");
    });
  },
  methods: {
    handlePlay() {
      const that = this;
      // 进度条动画效果

      if (this.processAnimate === undefined) {
        this.processAnimate = () => {
          that.processWidth =
            (that.currentTime / that.audio.totalTime) * that.barWidth;
          that.frameId = requestAnimationFrame(that.processAnimate);
        };
      }

      if (this.audio.status === "play") {
        clearInterval(this.timer);
        this.audio.pause();
        cancelAnimationFrame(that.frameId);
      } else {
        this.audio.play();
        this.timer = setInterval(() => {
          this.currentTime =
            this.audio.audioDOM && this.audio.audioDOM.currentTime;
        }, 1000);
        typeof this.processAnimate === "function" && this.processAnimate(); // 进度条动画
      }
    },
    handleDragDown(e) {
      this.isDragInValidRegion = true; // 开始拖拽
      this.lastStatus = this.audio.status === "play" ? "play" : undefined; // 记录歌曲播放的状态 当鼠标抬起时 恢复状态
      if (this.audio.status === "play") {
        this.handlePlay(); // 手动停止歌曲播放
      }
      this.lastX = e.clientX; // 这么写相当于就是往组件实例添加一个普通的属性
      this.startWidth = this.processWidth; //记录最开始进度条的位置
    },
    handleDragMove(e) {
      if (this.isDragInValidRegion === false) {
        // 不是在进行拖拽
        return;
      }

      // 这里的拖拽思想，以一个比较标准的媒介 视口 clientX
      // 记录鼠标每次事件触发前后的移动距离计算出当前的processWidth
      const moveX = e.clientX - this.lastX;
      // 保证边界
      let curWidth = this.startWidth + moveX;
      if (curWidth < 0) {
        curWidth = 0;
      }
      if (curWidth > this.barWidth) {
        curWidth = this.barWidth;
      }
      // 反映到真实的DOM以及audio对象
      this.processWidth = curWidth;
    },
    handleVolume(volume) {
      this.audio.setVolume(volume);
    },
    refreshAudio() {
      this.audio.changeSong &&
        this.audio.changeSong(this.songItem.url, this.songItem.duration);
    },
  },
  filters: {
    // 过滤器
    renderPlayerTime(time) {
      return formatTime(time);
    },
    formatSongName
  },
  beforeDestroy() {
    // 组件销毁时清除一些副作用
    this.audio.pause();
    this.audio = null;
    clearInterval(this.timer);
    document.removeEventListener("mouseup", this.handleMouseUp);
  },
  watch: {
    currentTime(val) {
      // 监听currentTime 歌词部分需要currentTime
      this.$emit("getCurrentTime", val);
    },
    songItem() {
      this.refreshAudio();
      this.processWidth = 0; // 重置进度条
      this.currentTime = 0;
      // audio.status 是AudioPlayer类内部控制的
      // 切换歌曲时如果是播放状态
      if (this.audio.status === "play") {
        this.handlePlay(); // 让它暂停
      }
      this.handlePlay(); // 暂停后在自动播放
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/myStyle.less";
@import url("./playerIco.less");
.player-bar-container {
  border-radius: 60px;
  display: inline-block;
  height: 80px;
  border: 1px dashed #eee;
  background-color: #32353a;
  .player-bar-content {
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    color: #fff;
  }
  .player-control {
    padding: 0 30px;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .player-control-btn {
      display: inline-block;
      cursor: pointer;
      background: url("../../assets/song.png") no-repeat;
    }
    .player-control-play {
      width: 60px;
      height: 60px;
      &:hover {
        background-position: -60px 0;
      }
    }
    .player-control-pause {
      width: 60px;
      height: 60px;
      background-position: 0 -60px;
      &:hover {
        background-position: -60px -60px;
      }
    }
  }
  .player-process {
    width: 370px;
    height: 100%;
    .player-info-wrapper {
      height: 27px;
      display: flex;
      justify-content: space-between;
      line-height: 27px;
      margin-top: 10px;
      h2 {
        font-size: 1rem;
        width: 200px;
        font-weight: normal;
      }
    }
    .player-process-bg-bar {
      margin-top: 15px;
      width: 100%;
      height: 5px;
      border-radius: 5px;
      background-color: #aaa;
      position: relative;
      .player-process-inner-bar {
        position: absolute;
        width: 50%;
        height: 100%;
        background-color: @blue;
        border-radius: 5px;
      }
      span.circle {
        // 为了方便控制，这个还不能是一个伪元素
        display: block;
        width: 15px;
        height: 15px;
        position: absolute;
        left: 50%; /* 通过JS动态控制 */
        background-color: #fff;
        border-radius: 50%;
        cursor: pointer;
        z-index: 100;
        transform: translateY(-40%) translateX(-5px);
      }
    }
  }
}
</style>