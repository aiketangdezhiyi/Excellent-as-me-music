<template>
  <div class="recent-song-container">
    <div class="header">
      <h2><img :src="musicSvg" alt="" />最近<span>新歌</span></h2>
      <button class="play-btn" @click="playAllSong(recentSong)">
        <i class="el-icon-video-play play-icon"></i>播放全部
      </button>
    </div>
    <SongList v-loading="songLoading" :songList="recentSong" />
    <PagerComp
      :page="pagerConfig.page"
      :count="pagerConfig.count"
      :size="pagerConfig.size"
      :handleCurrentChange="handleChangePage"
    />
  </div>
</template>

<script>
import SongList from "./songList";
import musicSvg from "@/assets/svg/music.svg";
import PagerComp from "@/components/PagerComp";
export default {
  components: {
    SongList,
    PagerComp,
  },
  data() {
    this.musicSvg = musicSvg;
    return {
      pagerConfig: {
        page: 1,
        size: 10,
        count: 0,
      },
      songLoading: false,
      recentSong: [],
    };
  },
  created() {
    this.getRecentSongList();
  },
  methods: {
    playAllSong(songList) {
      songList = songList.map((it) => it.id);
      this.$router.push("/nav/song/youwo?songList=" + JSON.stringify(songList));
    },
    async getRecentSongList() {
      const { page = 1, size = 10 } = this.pagerConfig;
      this.songLoading = true;
      const { code, data } = await this.$api.getRecentSong({
        page,
        size,
      });
      this.songLoading = false;
      if (code === 200) {
        const { count, rows } = data;
        this.pagerConfig.count = count;
        this.recentSong = rows;
      }
    },
    handleChangePage(newPage) {
      this.pagerConfig.page = newPage;
    },
  },
  watch: {
    "pagerConfig.page": function () {
      this.getRecentSongList();
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/myStyle.less";
.recent-song-container {
  width: 790px;
  .header {
    border-bottom: 1px solid #eee;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 15px;
    h2 {
      float: left;
      img {
        margin-right: 10px;
      }
      display: block;
      width: 180px;
      height: 50px;
      line-height: 50px;
      margin-right: 25px;
      color: #555;

      font-size: 28px;
      span {
        font-weight: 400;
        color: #009af3;
      }
    }
    .play-btn {
      float: right;
      border: 1px solid #ccc;
      padding: 10px;
      outline: none;
      color: #555;
      background-color: transparent;
      border-radius: 3px;
      box-sizing: border-box;
      cursor: pointer;
      i {
        font-size: 19px;
        margin-right: 5px;
        vertical-align: top;
      }
      &:hover {
        border-color: @blue;
        color: @blue;
      }
    }
  }
}

@media screen and (max-width: 1200px) and (min-width: 992px) {
  // 960
  .recent-song-container {
    width: 630px;
  }
}
@media screen and (max-width: 992px) and (min-width: 768px) {
  // 720
  .recent-song-container {
    width: 100%;
  }
}
@media screen and (max-width: 768px) and(min-width : 576px) {
  // 540
  .recent-song-container {
    width: 100%;
  }
}

@media screen and (max-width: 576px) {
  // 95%
  .recent-song-container {
    width: 100%;
  }
}
</style>