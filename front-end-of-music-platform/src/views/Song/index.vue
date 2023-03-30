<template>
  <div v-if="songItem" class="song-container">
    <!-- 可以通过计算左上角的高度，来动态的设置这个容器的高度 -->
    <div class="mark"></div>
    <div class="blurBgMask"></div>
    <div class="lyric-region">
      <div class="lyric-wrapper">
        <SongImageComp />
        <Lyric :handled="handled" :songItem="songItem" :lyricArr="lyricArr" />
      </div>
    </div>
    <PlayerBar :songItem="songItem" v-if="songItem.id !== undefined" />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import PlayerBar from "../../components/PlayerBar";
import Lyric from "../../components/Lyric";
import { parseTimeToSecond } from "../../utils/lyric";
import SongImageComp from "./SongImageComp";
let frameId;
export default {
  data() {
    return {
      isUpdateSong: false, // 是否真实更新了歌曲数据

      lyricArr: [], // 歌词
      handled: false, // 歌词是否处理过了
    };
  },
  components: {
    PlayerBar, // 播放器组件
    Lyric, // 歌词组件
    SongImageComp,
  },
  computed: {
    ...mapGetters("Song", ["songItem"]),
    ...mapState("Song", ["playSongId"]),
  },
  async created() {
    document.title = "歌曲播放";
    if (this.$route.params.songId == "youwo") {
      // 如果是youwo，有可能是从主页跳转过来的
      if (!this.$route.query.songList) {
        // 没有歌曲
        return;
      }
      const idArray = JSON.parse(this.$route.query.songList);


      const { code, data, err } = await this.$api.recoverySong(idArray);
      if (code === 200) {
        this.$store.commit("Song/setSongList", data);
        let index = 0;
        if (this.playSongId !== -1) {
          index = data.findIndex((it) => it.id === this.playSongId);
          index = index >= 0 ? index : 0;
        }


        this.$store.commit("Song/setPlayingIndex", index);
      } else {
        this.$message({
          message: err,
          duration: 1500,
          type: "error",
        });
      }
    }

    if (!Number.isNaN(+this.$route.params.songId)) {
      // 歌曲为空
      // 发送请求拿到歌单
      // 然后默认播放第一条
      const res = await this.$store.dispatch("Song/getSongList", {
        id: +this.$route.params.songId,
      });
      if (res === null) {
        this.$message({
          message: "获取数据失败",
          type: "warning",
          duration: 1500,
        });
        return;
      }
    }

    this.handleLyric(); // 处理歌词
  },
  methods: {
    handleLyric() {
      if (this.songItem.lyric === null || this.songItem.lyric === "") {
        this.lyricArr = [];
        this.handled = true;
        return;
      }
      let lyric = this.songItem.lyric; // 获取歌词

      lyric = lyric.split(/&/).map((item) => {
        // 看有没有歌词时间，有就处理一下
        const index = item.indexOf("]");
        if (index >= 0) {
          const strs = item.split("]");
          return {
            time: parseTimeToSecond(strs[0].substring(1)),
            word: strs[1],
          };
        } else {
          // 只有歌词
          return {
            word: item,
          };
        }
      });

      this.lyricArr = lyric; // 歌词处理完成
      this.handled = true;
    },
  },
  watch: {
    songItem() {
      this.handled = false;
      this.handleLyric();
    },
  },
  beforeDestroy() {
    cancelAnimationFrame(frameId);
  },
};
</script>

<style lang="less" scoped>
.song-container {
  width: 100%;
  height: calc(100vh - 134px);
  background-color: #000;
  position: relative;

  font-family: "微软雅黑", simsun, sans-serif;

  .mark {
    width: 100%;
    height: 100%;
    min-width: 1140px;
    background: url("~@/assets/1.jpg") no-repeat;
    filter: blur(90px);
    background-size: cover;
    position: relative;
    opacity: 0.6;
    z-index: 1;
  }

  .blurBgMask {
    background-color: #292a2b;
    background-color: rgba(0, 0, 0, 0.35);
    z-index: 10;
    opacity: 0.6;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .lyric-region {
    width: 100%;
    height: 100%;
    min-width: 1140px;
    position: absolute;
    top: 0;
    left: 0;

    .lyric-wrapper {
      width: 840px;
      padding-top: 27px;
      box-sizing: border-box;
      height: 100%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>