<template>
  <ul class="search-list-container">
    <li class="search-item header">
      <div>歌曲名</div>
      <div>上传者</div>
      <div>时长</div>
    </li>
    <li class="search-item song p-r" v-for="item in searchSongs" :key="item.id">
      <div class="text-ellipsis song-name">
        <SelectComp
          @click.native="$emit('select', item, selectSongs.indexOf(item))"
          style="margin-right: 10px"
          :selected="selectSongs.includes(item)"
        />
        {{ item.originName | formatSongName }}
      </div>
      <div
        @click="routerToVisit(item.userInfo.id)"
        class="username text-ellipsis p-r"
      >
        <span class="name"> {{ item.userInfo.username }}</span>
        <SexComp :sex="item.userInfo.sex" />
      </div>
      <div class="duration text-ellipsis">{{ item.duration | formatTime }}</div>

      <div class="btn-wrapper">
        <span class="btn play-btn" @click="playOneSong(item)"></span>
        <span class="btn download-btn"></span>
        <span
          title="收藏歌曲"
          class="btn star-btn"
          @click="collectSong(item.id)"
        ></span>
      </div>
    </li>

    <AddFavoriteComp
      @addFavorite="addFavorite"
      @select="select"
      @maskClick="showMask = false"
      @confirm="favoriteConfirm"
      :confirmLoading="confirmLoading"
      v-show="showMask"
      :favoriteItem="favoriteContext"
      :activeIndex="activeIndex"
    ></AddFavoriteComp>
  </ul>
</template>

<script>
import SexComp from "@/components/SexComp";
import SelectComp from "@/components/SelectComp";
import AddFavoriteComp from "@/components/AddFavoriteComp";
import { formatSongName } from "@/utils/song";
import { formatTime } from "@/utils/time";
import { compareArr } from "@/utils/favorite.js";
let selectFavorite = []; // 选中的收藏夹
let lastActiveIndex = []; // 最开始歌曲被收录在哪个收藏夹
let songId;
export default {
  components: {
    SexComp,
    SelectComp,
    AddFavoriteComp,
  },
  data() {
    return {
      showMask: false,
      confirmLoading: false, // 确定收藏夹按钮加载
      favoriteContext: [],
      activeIndex: [], // 还需要初始化是否这条歌曲在这个收藏夹内
    };
  },
  created() {
    this.getFavoriteContext(); // 获取收藏夹目录信息
  },
  props: {
    searchSongs: {
      // 渲染的歌曲列表
      type: Array,
      default: () => [],
    },
    selectSongs: {
      // 被选中的歌曲列表
      type: Array,
      default: () => [],
    },
  },
  filters: {
    formatSongName,
    formatTime,
  },
  methods: {
    addFavorite(item, i) {
      this.activeIndex.push(i);
      this.favoriteContext.push(item);
      selectFavorite.push(item);
    },
    async getFavoriteContext() {
      // 获取用户收藏夹目录
      const res = await this.$api.getUserAllFavoriteContext();
      if (res.code === 200) {
        this.favoriteContext = res.data;
      }
    },
    select(item, i) {
      // 选中某一个收藏夹
      const index = this.activeIndex.indexOf(i);
      if (index >= 0) {
        // 设置为未选
        this.activeIndex.splice(index, 1);
        selectFavorite.splice(index, 1);
      } else {
        // 设置成已选
        this.activeIndex.push(i);
        selectFavorite.push(item);
      }
    },
    async collectSong(id) {
      // 点击收藏歌曲
      this.showMask = true; // 先展示可能导致数据不实时
      // 发送请求查看这条在该用户所有收藏夹的状态
      const res = await this.$api.getSongStatusInFavorite({
        songId: id,
      });
      songId = id; // 保存歌曲id

      if (res.code === 200) {
        this.activeIndex = res.data.map((it) => it.FavoriteId);
        lastActiveIndex = [...this.activeIndex]; // 获取最开始的歌曲在收藏夹的信息
        // 方便收藏夹状态处理
      }
    },
    async favoriteConfirm() {
      // 选中某一些收藏夹然后按确定
      this.confirmLoading = true;
      const config = compareArr(lastActiveIndex, this.activeIndex);
      // 用户id 歌曲id songId 收藏夹的配置 config
      const res = await this.$api.confirmFavorite({
        config,
        songId,
      });
      if (res.code === 200) {
        lastActiveIndex = [...this.activeIndex]; // 更新当前收藏夹状态
      }
      this.confirmLoading = false;
      this.$message({
        message: "添加收藏夹成功",
        duration: 1500,
        type: "success",
      });
    },
    playOneSong(song) {
      // this.$store.commit("Song/setSongList", [song]);
      // this.$store.commit("Song/setPlayingIndex", 0);
      // this.$router.push("/song/any");
      this.$router.push("/song/youwo?songList=" + JSON.stringify([song.id]));
    },
    routerToVisit(id) {
      this.$router.push(`/visit/${id}`);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/myStyle.less";
@import url("./header.less");
@import url("./btn.less");
.search-list-container {
  width: 100%;
  min-height: 300px;
  .search-item {
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #f0f0f0;
    font-size: 15px;
    &.header > div:nth-child(1) {
      padding-left: 63px;
    }
    & > div {
      float: left;
      text-align: center;
      &:nth-child(1) {
        width: 500px;
        box-sizing: border-box;
        padding-left: 27px;
        text-align: left;
      }
      &:nth-child(2) {
        width: 360px;
        color: @blue;
        text-align: left;
      }
    }
    .song-name {
      color: @black;
    }

    .username {
      cursor: pointer;
      span {
        vertical-align: middle;
        &.name:hover {
          color: darken(@blue, 10%);
        }
      }

      .sex-wrapper {
        margin-top: 16px;
        margin-left: 5px;
        position: absolute;
        display: inline-flex;
      }
    }
    .duration {
      color: @gray;
    }
    &:not(:nth-of-type(1)):hover {
      background-color: lighten(@lightblue, 3%);
      .song-name {
        color: @blue;
      }
    }
  }
}
</style>