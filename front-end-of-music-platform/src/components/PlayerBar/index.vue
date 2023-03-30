<template>
  <div class="player-bar-container" @mousemove="handleDragMove">
    <div class="module-bg"></div>
    <div class="player-bar-content">
      <div class="player-control">
        <span class="player-control-prev player-control-btn" @click="$store.commit('Song/prevSong')"></span>
        <span class="player-control-btn" @click="handlePlay" :class="{
          'player-control-pause': audio.status === 'play',
          'player-control-play':
            audio.status === 'pause' || audio.status === undefined,
        }"></span>
        <!-- class 动态控制 -->
        <span class="player-control-next player-control-btn" @click="$store.commit('Song/nextSong')"></span>
      </div>
      <div class="song-img-wrapper">
        <img :src="songImgSrc" alt="" />
      </div>
      <div class="player-process">
        <div class="player-info-wrapper">
          <h2 class="text-ellipsis" :title="songItem.originName | formatSongName">
            {{ songItem.originName | formatSongName }}
          </h2>
          <div class="player-time">
            {{ currentTime | renderPlayerTime }} /
            {{ audio.totalTime | renderPlayerTime }}
          </div>
        </div>
        <div class="player-process-bg-bar" ref="bgBar">
          <div class="player-process-inner-bar" :style="{
            width: processWidth + 'px',
          }"></div>
          <span class="circle" @mousedown="handleDragDown" :style="{
            left: processWidth + 'px',
          }"></span>
        </div>
      </div>
      <div class="player-ico">
        <span class="player-volumn">
          <VolumeBar :initHeight="0.5" @volumePercentage="handleVolume" />
        </span>
        <span ref="playListBtn" @click="showSongList = !showSongList"
          class="player-list music-iconfont icon-24gl-playlistMusic2">
        </span>
      </div>
    </div>

    <!-- 歌曲队列 -->
    <MyTeleport>
      <SongListComp @change="refreshAudio" :songList="songList" :style="{
        left: showSongListPosition.left + 'px',
        top: showSongListPosition.top - 5 + 'px',
      }" @close="showSongList = $event" :showSongList="showSongList" />
    </MyTeleport>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { audio } from "../../utils/player";
import { formatTime } from "../../utils/time";
import VolumeBar from "@/components/VolumeBar";
import SongListComp from "./SongListComp";
import { getDOMOffsetTopByDocumentTop } from "@/utils/dom";
import { formatSongName } from "@/utils/song";
import MyTeleport from "../MyTeleport";

export default {
  data() {
    return {
      currentTime: 0, // 歌曲当前播放的时间
      audio: {},
      processWidth: 0, //进度条的长度
      isDragInValidRegion: false, // 是否在有效的区域内进行拖拽
      showSongList: false,
      showSongListPosition: {
        left: 0,
        top: 0,
      },
    };
  },
  components: {
    VolumeBar,
    SongListComp,
    MyTeleport,
  },
  computed: {
    ...mapState("Song", ["songImgSrc", "songList"]),
    ...mapGetters("Song", ["songItem"]),
    barWidth() {
      return this.$refs.bgBar.offsetWidth; // 为了严谨性，还是获取真的DOM的尺寸
    },
  },
  created() {
    this.timer = null;
    audio.initAudio(
      this.songItem.url,
      0.5,
      this.songItem.duration
    );
    this.audio = audio

    this.handleMouseUp = () => {
      // 进行优化处理 组件销毁时移除事件
      if (this.isDragInValidRegion) {
        // 做优化 不然会跟音量调节发生冲突
        this.isDragInValidRegion = false; // 鼠标抬起 拖拽停止 歌曲跳到播放节点 开始播放
        audio.goToTime(
          (this.processWidth / this.barWidth) * audio.totalTime
        );
        this.currentTime = audio.audioDOM.currentTime;
        if (this.lastStatus) {
          // 上一个状态是播放
          // 恢复歌曲状态
          this.handlePlay();
        }
      }
    };
    document.addEventListener("mouseup", this.handleMouseUp);

    audio.audioDOM.addEventListener("ended", () => {
      // 歌曲播放完成
      this.$store.commit("Song/nextSong");
    });
  },
  mounted() {
    this.$nextTick(() => {
      // 保证子组件渲染完
      this.$emit("eventGetHeight");
    });
    this.setSongListPosition(); // 设置歌曲列表的位置
    window.addEventListener("resize", this.setSongListPosition);
  },
  methods: {
    handlePlay() {
      const that = this;
      // 进度条动画效果

      if (this.processAnimate === undefined) {
        this.processAnimate = () => {
          that.processWidth =
            (that.currentTime / that.audio.totalTime) * that.barWidth; // 计算进度条的长度
          that.frameId = requestAnimationFrame(that.processAnimate); // 开启进度条动画
        };
      }

      if (audio.status === "play") {
        // 歌曲处于播放状态 切成暂停
        clearInterval(this.timer);
        audio.pause();
        cancelAnimationFrame(that.frameId); // 取消歌曲进度条动画
      } else {
        // 歌曲处于暂停状态 切成播放
        audio.play();
        this.timer = setInterval(() => {
          this.currentTime =
            audio.audioDOM && audio.audioDOM.currentTime;
        }, 1000); // 每一秒更新歌曲播放的时间
        typeof this.processAnimate === "function" && this.processAnimate(); // 开启进度条动画
      }
    },
    handleDragDown(e) {
      // 开始进行拖拽
      this.isDragInValidRegion = true; // 开始拖拽
      this.lastStatus = audio.status === "play" ? "play" : undefined; // 记录歌曲播放的状态 当鼠标抬起时 恢复状态
      if (audio.status === "play") {
        // 拖拽期间 停止歌曲播放
        this.handlePlay(); // 手动停止歌曲播放
      }
      this.lastX = e.clientX; // 鼠标按下开始拖拽的一个位置 后续拖拽移动的位置都参照这个位置进行计算
      this.startWidth = this.processWidth; //记录最开始进度条的位置
    },
    handleDragMove(e) {
      if (this.isDragInValidRegion === false) {
        // 不是在进行拖拽
        return;
      }

      // 这里的拖拽思想，以一个比较标准的媒介 视口 clientX
      // 记录鼠标每次事件触发前后的移动距离计算出当前的processWidth
      const moveX = e.clientX - this.lastX; // 相比较按下去的时候，鼠标横向移动了多少
      // 保证边界
      let curWidth = this.startWidth + moveX;
      if (curWidth < 0) {
        curWidth = 0;
      }
      if (curWidth > this.barWidth) {
        curWidth = this.barWidth;
      }
      // 反映到真实的DOM以及audio对象
      this.processWidth = curWidth; // 更新进度条位置
    },
    handleVolume(volume) {
      audio.setVolume(volume);
    },
    setSongListPosition() {
      const dom = this.$refs.playListBtn;

      this.showSongListPosition.top =
        getDOMOffsetTopByDocumentTop(dom) - dom.offsetTop;
      this.showSongListPosition.left = dom.offsetLeft;
    },
    refreshAudio() {
      audio.changeSong &&
        audio.changeSong(this.songItem.url, this.songItem.duration);
    },
  },
  filters: {
    // 过滤器
    renderPlayerTime(time) {
      return formatTime(time);
    },
    formatSongName,
  },
  beforeDestroy() {
    // 组件销毁时清除一些副作用
    audio.pause();
    audio = null;
    window.playBarAudio = null;
    clearInterval(this.timer);
    document.removeEventListener("mouseup", this.handleMouseUp);
    window.removeEventListener("resize", this.setSongListPosition);
  },
  watch: {
    songItem() {
      this.refreshAudio();
      this.processWidth = 0; // 重置进度条
      this.currentTime = 0;
      // audio.status 是AudioPlayer类内部控制的
      // 切换歌曲时如果是播放状态
      if (audio.status === "play") {
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
  width: 100%;
  height: 80px;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #333;
  background-color: #32353a;
  z-index: 1024;
  background-color: #222;
  box-shadow: 0 -10px 20px #403f3f;

  .module-bg {
    width: 100%;
    height: 80px;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #000;
    filter: blur(90px);
    background: url("~@/assets/1.jpg") no-repeat;
    background-size: cover;
  }

  .player-bar-content {
    width: 1000px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    color: #fff;
    position: relative;
    z-index: 1025;
  }

  .player-control {
    width: 270px;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .player-control-btn {
      display: inline-block;
      cursor: pointer;
      background: url("../../assets/song.png") no-repeat;
    }

    .player-control-prev,
    .player-control-next {
      width: 36px;
      height: 36px;
      background-position: 0 -143px;
    }

    .player-control-next {
      &:hover {
        background-position: -180px -143px;
      }
    }

    .player-control-prev {
      &:hover {
        background-position: -36px -143px;
      }
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

    .player-control-next {
      background-position: -144px -143px;
    }
  }

  .song-img-wrapper {
    width: 60px;
    height: 60px;
    margin-right: 30px;

    img {
      display: block;
      width: 100%;
      height: 100%;
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
        font-size: 0.85rem;
        width: 200px;
        font-weight: normal;
      }

      .player-time {
        font-size: 0.85rem;
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
        left: 50%;
        /* 通过JS动态控制 */
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