<template>
  <div class="hot-song-container">
    <div class="header">
      <h2>Top<span>Nine</span></h2>
      <button class="more-btn">更多</button>
    </div>
    <div class="content" v-if="topSongList.length > 0">
      <TopRectComp
        @click="playOneSong(topSongList[0])"
        class="top-1-container"
        style="margin-bottom: 10px"
        :bgColor="bgColor[0]"
        :fontSize="25"
        :subTitleSize="14"
        :width="300"
        :height="165"
        :level="1"
        :songName="formatSongName(topSongList[0].originName)"
      />
      <TopRectComp
        class="top-level-container"
        @click="playOneSong(topSongList[1])"
        style="margin-bottom: 10px"
        :bgColor="bgColor[1]"
        :width="145"
        :subTitleSize="10"
        :height="85"
        :level="2"
        :songName="formatSongName(topSongList[1].originName)"
      />
      <TopRectComp
        class="top-level-container"
        @click="playOneSong(topSongList[2])"
        style="margin-bottom: 10px"
        :bgColor="bgColor[2]"
        :width="145"
        :subTitleSize="10"
        :height="85"
        :level="3"
        :songName="formatSongName(topSongList[2].originName)"
      />
      <TopRectComp
        class="top-level-container"
        @click="playOneSong(topSongList[3])"
        style="margin-bottom: 10px"
        :bgColor="bgColor[3]"
        :width="145"
        :subTitleSize="10"
        :height="85"
        :level="4"
        :songName="formatSongName(topSongList[3].originName)"
      />
      <TopRectComp
        class="top-level-container"
        @click="playOneSong(topSongList[4])"
        style="margin-bottom: 10px"
        :bgColor="bgColor[4]"
        :width="145"
        :subTitleSize="10"
        :height="85"
        :level="5"
        :songName="formatSongName(topSongList[4].originName)"
      />
      <TopRectComp
        class="top-level-container"
        @click="playOneSong(topSongList[5])"
        style="margin-bottom: 10px"
        :bgColor="bgColor[5]"
        :width="145"
        :subTitleSize="10"
        :height="85"
        :level="6"
        :songName="formatSongName(topSongList[5].originName)"
      />
      <TopRectComp
        class="top-level-container"
        @click="playOneSong(topSongList[6])"
        style="margin-bottom: 10px"
        :bgColor="bgColor[6]"
        :width="145"
        :subTitleSize="10"
        :height="85"
        :level="7"
        :songName="formatSongName(topSongList[6].originName)"
      />
      <TopRectComp
        class="top-level-container"
        @click="playOneSong(topSongList[7])"
        style="margin-bottom: 10px"
        :bgColor="bgColor[7]"
        :width="145"
        :subTitleSize="10"
        :height="85"
        :level="8"
        :songName="formatSongName(topSongList[7].originName)"
      />
      <TopRectComp
        class="top-level-container"
        @click="playOneSong(topSongList[8])"
        style="margin-bottom: 10px"
        :bgColor="bgColor[8]"
        :width="145"
        :subTitleSize="10"
        :height="85"
        :level="9"
        :songName="formatSongName(topSongList[8].originName)"
      />
    </div>
  </div>
</template>

<script>
import { bgColor } from "./config";
import TopRectComp from "./TopRectComp";
import { formatSongName } from "@/utils/song";
export default {
  components: {
    TopRectComp,
  },
  methods: {
    formatSongName,
    playOneSong(song) {
      this.$router.push(
        "/nav/song/youwo?songList=" + JSON.stringify([song.id])
      );
    },
  },
  data() {
    this.bgColor = bgColor;
    return {
      topSongList: [],
    };
  },
  async created() {
    const { code, data } = await this.$api.getTopSong();
    if (code === 200) {
      this.topSongList = data;
    }
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/myStyle.less";
.hot-song-container {
  width: 300px;
  .header {
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
    .more-btn {
      float: right;
      padding: 10px;
      border-radius: 3px;
      box-sizing: border-box;
      background-color: transparent;
      outline: none;
      border: 1px solid #ccc;
      color: #555;
      cursor: pointer;
      &:hover {
        border-color: @blue;
        color: @blue;
      }
    }
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
@media screen and (max-width: 992px) and (min-width: 768px) {
  // 720
  .hot-song-container {
    width: 720px;
    margin: 0 auto;
  }
  .top-1-container {
    width: 100% !important;
    height: 230px !important;
    margin-bottom: 30px !important;
  }
  .top-level-container {
    width: 165px !important;
    height: 95px !important;
  }
}
@media screen and (max-width: 768px) and(min-width : 576px) {
  // 540
  .hot-song-container {
    width: 540px;
    margin: 0 auto;
  }
  .top-1-container {
    width: 100% !important;
    height: 230px !important;
    margin-bottom: 30px !important;
  }
  .top-level-container {
    width: 260px !important;
    height: 135px !important;
  }
}

@media screen and (max-width: 576px) {
  // 95%
  .hot-song-container {
    width: 95%;
    margin: 0 auto;
  }
  .top-1-container {
    width: 100% !important;
    height: 180px !important;
    margin-bottom: 10px !important;
  }
  .top-level-container {
    width: 100% !important;
    height: 180px !important;
    margin-bottom: 10px !important;
  }
}
</style>