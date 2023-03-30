<template>
  <div class="song-left-view">
    <h2 class="p-r">
      <span>TA</span> <span>Di</span> 创作歌曲
      <div class="h-search-group p-a">
        <input type="text" class="h-search-input" v-model="searchKeyWord" placeholder="请输入要查找的歌曲名"
          @keydown.enter="handleSearch(searchKeyWord)" />
        <i @click="handleSearch(searchKeyWord)" class="iconfont" title="搜索">
          <svg class="icon" style="
                        width: 1.5em;
                        height: 1em;
                        vertical-align: middle;
                        fill: currentColor;
                        overflow: hidden;
                      " viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21419">
            <path
              d="M415.1 508c-21.8-38.7-34.2-83.3-34.2-130.9 0-147.4 119.5-266.9 266.9-266.9s266.9 119.5 266.9 266.9S795.3 644 647.8 644c-86.2 0-162.8-40.8-211.6-104.2-7.7-10-14.8-20.7-21.1-31.8"
              fill="#9FEAF7" p-id="21420"></path>
            <path
              d="M647.8 110.1c-147.4 0-266.9 119.5-266.9 266.9 0 8.5 0.9 16.9 1.6 25.2 13.8-127.4 117.2-227.8 245.9-237-0.9 3.5-1.6 7.1-1.6 10.9 0 23.2 18.8 42 42 42s42-18.8 42-42c0-1.4-0.3-2.8-0.4-4.2 108.7 26.2 191.5 118.5 203 232.2 0.9-8.9 1.4-18 1.4-27.1 0-147.4-119.5-266.9-267-266.9z"
              fill="#FFFFFF" p-id="21421"></path>
            <path
              d="M914.8 377.1c0-11.2-0.9-22.2-2.3-33-9.7 78.3-53.4 145.9-115.6 188-0.5-0.5-0.8-1.1-1.3-1.6L490.8 225.7c-20.8-20.8-54.4-20.8-75.2 0s-20.8 54.4 0 75.2l273.6 273.6c-13.5 2.1-27.3 3.5-41.4 3.5-86.2 0-162.8-40.8-211.6-104.2-7.8-10.1-14.8-20.7-21.1-31.9-16.6-29.4-27.7-62.4-32.1-97.4-1.3 10.7-2.2 21.5-2.2 32.6 0 47.6 12.4 92.2 34.2 130.9 6.3 11.1 13.3 21.8 21.1 31.9C485 603.2 561.7 644 647.8 644c38.6 0 75.1-8.3 108.2-23 14.2 0.5 28.7-4.5 39.5-15.4 3.9-3.9 6.8-8.3 9.2-12.9 66.6-48.6 110.1-126.9 110.1-215.6z"
              fill="#48BEFE" p-id="21422"></path>
            <path
              d="M815.8 639.9L381.3 205.4c-0.9-0.9-0.9-2.3 0-3.1l72-72c0.9-0.9 2.3-0.9 3.1 0L891 564.7c0.9 0.9 0.9 2.3 0 3.1l-72 72c-0.9 1-2.3 1-3.2 0.1z"
              fill="#FFE200" p-id="21423"></path>
            <path
              d="M854.9 528.7L492.5 166.3c-20.8-20.8-54.4-20.8-75.2 0-5.3 5.3-9.2 11.3-11.8 17.8 19.1-7.7 41.8-3.8 57.3 11.8l362.4 362.4c15.5 15.5 19.4 38.2 11.8 57.3 6.5-2.6 12.6-6.5 17.8-11.8 20.9-20.7 20.9-54.3 0.1-75.1z"
              fill="#FFEE8A" p-id="21424"></path>
            <path d="M422 551.8L118.6 858c-12.5 12.5-12.5 32.9 0 45.4s32.9 12.5 45.4 0l303.4-306.2" fill="#EFEFEF"
              p-id="21425"></path>
            <path
              d="M932.8 377c0-125.3-80.4-234.5-199.9-271.9-9.4-2.9-19.4 2.4-22.3 11.8-3.1 9.6 2.2 19.7 11.8 22.6C826.7 172 896.8 267.5 896.8 377c0 47.9-13.6 92.8-37.4 131.1L516.9 165.5c30.6-19 65.5-31.8 103.5-36 9.8-1 17-9.8 15.8-19.7-1-9.8-9.8-17-19.7-16.1-46.8 5.2-90.1 21.7-127.1 46.5-28.1-18.2-66.2-15.1-90.9 9.5-26.7 26.7-27.9 69-4.3 97.5-20.1 39-31.4 83.2-31.4 129.7 0 49.1 12.7 97.2 36.6 139.6 0 0.1 0 0.2 0.1 0.3 3.9 7 8.7 13.4 13.2 20-1.2 0.7-2.5 1.3-3.5 2.3L105.8 845.3c-19.5 19.5-19.5 51.3 0 70.9 9.4 9.4 22 14.6 35.4 14.6s26-5.2 35.5-14.7l303.4-306.2c0.6-0.6 0.8-1.3 1.3-1.9 44.4 32 97.3 51.2 153.1 53.7h0.8c9.6 0 17.5-7.5 18-17.2 0.5-9.9-7.2-18.4-17.2-18.8-73.2-3.4-140.9-38.7-185.7-96.9-7.2-9.4-13.8-19.3-19.7-29.7l-0.2-0.2c-20.8-36.9-31.8-79.1-31.8-121.9 0-36.3 8-70.9 22-102.1l328.9 328.9c-13.8 6.2-28 11.7-43.1 15.3-9.6 2.2-15.6 12-13.2 21.6 1.9 8.2 9.4 13.9 17.5 13.9 1.2 0 2.6-0.2 4.1-0.7 22.3-5.3 43.4-13.3 63.1-23.4 12.6 9.1 27.4 13.8 42.3 13.8 18.6 0 37.2-7.1 51.3-21.2 23.3-23.3 27.1-58.6 12-86.2 31.2-45.8 49.2-101 49.2-159.9zM434.2 565c6.2 7.1 12.8 13.8 19.6 20.2L151.2 890.7c-5.3 5.3-14.7 5.3-19.9 0-5.5-5.5-5.5-14.5 0-20L434.2 565z m412.2 32.7c-14.3 14.3-37.5 14.3-51.8 0L423.9 227c-14.3-14.3-14.3-37.5 0-51.8 7.1-7.1 16.5-10.7 25.9-10.7s18.8 3.6 25.9 10.7l370.6 370.6c14.3 14.4 14.3 37.6 0.1 51.9z"
              fill="#662F0A" p-id="21426"></path>
            <path
              d="M671.1 129.2h1c9.5 0 17.4-7.5 18-17.1 0.5-9.9-7.1-18.4-17-18.9h-0.4c-9.1-0.4-18.2 7.1-18.7 17-0.6 10 7.2 18.5 17.1 19z"
              fill="#662F0A" p-id="21427"></path>
          </svg>
        </i>
      </div>
      <div class="h-select-group p-a">
        <span @click="handleSelect(item.value)" v-for="item in selectArr" :class="{
          active: selectActiveIndex === item.value,
        }" :key="item.value">{{ item.title }}</span>
      </div>
    </h2>
    <div class="music-content" v-loading="loadingSong">
      <ul class="search-list-container">
        <li class="search-item header">
          <span>歌曲名</span><span>上传时间</span>
          <span><i class="iconfont icon-redu" style="font-size: 21px; vertical-align: middle"></i>热度</span>
          <span class="yw"><i class="iconfont icon-yinleyule"></i>优W</span>
        </li>

        <NoDataComp v-if="showSongList.length === 0" title="Ta 好像还没上传创作歌曲"></NoDataComp>
        <li class="search-item p-r" v-for="(item, i) in showSongList" :key="item.id">
          <span style="padding: 0 10px; box-sizing: border-box" :title="item.originName | formatSongName">{{
            item.originName | formatSongName }}</span>
          <span>{{ item.createdAt | formatDate }}</span>
          <span :title="item.broadcast" class="broadcast" :class="{
            hot: item.broadcast >= 100,
          }">{{ item.broadcast | formatBroadcast
}}<i class="iconfont icon-icon"></i></span>
          <span class="manage-button-wrapper"><span class="btn-wrapper">
              <span @click="playSong(songList, i)" title="播放歌曲" class="header-btn play-btn"></span>
              <span @click="cancelFavorite(item)" title="加入我的歌曲" class="header-btn star-btn"></span>
              <span title="分享歌曲" class="header-btn share-btn"></span> </span></span>
        </li>
      </ul>
      <PagerComp style="margin-bottom: 15px" :page="pageConfig.page" :size="pageConfig.size"
        :count="this.keyWord ? 0 : songList.length" :handleCurrentChange="handleCurrentChange" />
      <!-- 用0避免分页 -->
    </div>
  </div>
</template>

<script>
import PagerComp from "@/components/PagerComp";
import { mapState } from "vuex";
import { formatSongName, formatDate, formatBroadcast } from "@/utils/song";
import NoDataComp from "@/components/NoDataComp";
export default {
  components: {
    PagerComp,
    NoDataComp,
  },
  data() {
    return {
      pageConfig: {
        page: 1,
        size: 15,
      },
      searchKeyWord: "", // v-model
      keyWord: "", // 控制搜索
      selectArr: [
        {
          title: "最新发布",
          value: 1,
        },
        {
          title: "最高热度",
          value: 2,
        },
        {
          title: "最多添加歌单",
          value: 3,
        },
      ],
      selectActiveIndex: 1,
      loadingSong: false,
    };
  },
  computed: {
    ...mapState("Visit", ["songList"]),
    showSongList() {
      if (this.keyWord === "") {
        // 关键词为空
        return this.songList.slice(
          (this.pageConfig.page - 1) * this.pageConfig.size,
          this.pageConfig.page * this.pageConfig.size
        );
      } else {
        const reg = new RegExp(this.keyWord);
        return this.songList.filter((it) => reg.test(it.originName));
      }
    },
  },
  filters: {
    formatSongName,
    formatDate,
    formatBroadcast,
  },
  methods: {
    handleCurrentChange(page) {
      this.pageConfig.page = page;
    },
    handleSearch(keyWord) {
      this.keyWord = keyWord;
    },
    playSong(songList, i = 0) {
      if (songList.length === 0) {
        this.$message({
          message: "该歌单好像没有歌曲哦",
          type: "warning",
          duration: 1500,
        });
        return;
      }
      // 存储数据到vuex
      songList = songList.map((songItem) => songItem.id);
      this.$store.commit("Song/setPlaySongId", songList[i]); // 设置要播放的歌曲id

      this.$message({
        message: "即将播放歌单",
        type: "success",
        duration: 1500,
        onClose: () => {
          this.$router.push({
            name: "Song",
            params: {
              songId: "youwo",
            },
            query: {
              songList: JSON.stringify(songList)
            }
          });
        },
      });
    },
    handleSelect(val) {
      // 选中某一个选项
      if (this.selectActiveIndex === val) {
        // 点击已经选中的选项
        return;
      }
      this.selectActiveIndex = val;
      this.getNewSongList(val);
    },
    getNewSongList(type) {
      // 选项获取用户歌曲
      this.loadingSong = true;
      this.$store
        .dispatch("Visit/getNewSongList", {
          id: this.$route.params.id,
          type,
        })
        .then(
          () => {
            this.loadingSong = false;
          },
          () => {
            this.loadingSong = false;
          }
        );
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/myStyle.less";
@import url("./music.less");
@import url("./search.less");
@import url("./select.less");

.yw {
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 3px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);

  .iconfont {
    font-size: 30px;
    vertical-align: middle;
    margin-right: 10px;
  }
}

.music-content {
  width: 100%;
}

.broadcast {
  color: darken(@blue, 8%);
  font-size: 16px;

  &.hot {
    color: #f60;
  }

  i {
    font-size: 21px;
    vertical-align: top;
    margin-left: 3px;
  }
}

.song-left-view {
  width: calc(100% - 325px);
  box-sizing: border-box;
  float: left;
  border-radius: 5px 0 0 5px;
  border: 1px solid #eee;
  background-color: #fff;
  min-height: 666px;
  margin-bottom: 15px;
  padding: 15px 20px;

  h2 {
    font-weight: normal;
    font-size: 21px;
    letter-spacing: 3px;
    padding-bottom: 18px;
    text-shadow: 1px 1px 3px rgba(255, 255, 255, 1);

    &>span {
      font-size: 30px;
      color: #fff;
      text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    }

    &>span:nth-child(2) {
      font-size: 25px;
    }
  }
}
</style>