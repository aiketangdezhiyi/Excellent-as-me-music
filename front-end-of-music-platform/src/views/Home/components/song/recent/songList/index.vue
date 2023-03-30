<template>
  <ul class="search-list-container">
    <li
      class="search-item song p-r clearfix"
      v-for="item in songList"
      :key="item.id"
    >
      <div class="text-ellipsis song-name">
        {{ formatSongName(item.originName) }}
      </div>
      <div
        @click="routerToVisit(item.userInfo.id)"
        class="username text-ellipsis p-r"
      >
        <span class="name"> {{ item.userInfo.username }}</span>
        <SexComp :sex="item.userInfo.sex" />
      </div>
      <div class="duration text-ellipsis">{{ formatTime(item.duration) }}</div>

      <div class="btn-wrapper">
        <span class="btn play-btn" @click="playOneSong(item)"></span>
        <span class="btn download-btn"></span>
      </div>
    </li>
  </ul>
</template>

<script>
import SexComp from "@/components/SexComp";
import { formatSongName } from "@/utils/song";
import { formatTime } from "@/utils/time";
export default {
  components: {
    SexComp,
  },
  props: {
    songList: {
      // 渲染的歌曲列表
      type: Array,
      default: () => [],
    },
  },
  methods: {
    formatSongName,
    formatTime,
    playOneSong(song) {
      this.$router.push("nav/song/youwo?songList=" + JSON.stringify([song.id]));
    },
    routerToVisit(id) {
      this.$router.push("/visit/" + id);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/myStyle.less";
@import "./btn.less";
.search-list-container {
  width: 100%;
  min-height: 300px;
  .search-item {
    width: 100%;
    height: 50px;
    line-height: 50px;
    // border-bottom: 1px solid #f0f0f0;
    font-size: 14px;

    & > div {
      float: left;
      text-align: center;
      height: 50px;
      line-height: 50px;
      &:nth-child(1) {
        width: 50%;
        box-sizing: border-box;
        padding-left: 27px;
        text-align: left;
      }
      &:nth-child(2) {
        width: 30%;
        color: lighten(@black, 5%);
        text-align: center;
      }
      &.duration {
        width: 20%;
        text-align: right;
        box-sizing: border-box;
        padding-right: 13px;
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
    &:hover {
      background-color: lighten(@lightblue, 3%);
      & > div {
        color: @blue!important;
      }
    }
  }
}
@media screen and (max-width: 768px) {
  // 540
  .search-list-container {
    .search-item {
      .username {
        display: none;
      }
      div.duration {
        width: 50%;
      }
    }
  }
}
</style>