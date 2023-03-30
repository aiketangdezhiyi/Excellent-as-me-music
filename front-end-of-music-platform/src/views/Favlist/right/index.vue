<template>
  <div class="right-view-container" v-if="activeItem.data">
    <div class="header">
      <div class="cover">
        <img :src="activeItem.favorite.coverUrl" alt="" />
      </div>
      <div class="header-info">
        <h2>{{ activeItem.favorite.name }}</h2>
        <p class="author-name">创建者：{{ authorName }}</p>
        <p class="count">
          {{ activeItem.data.count }}个内容<span class="dot">·</span>{{ activeItem.favorite.isPublic ? "公开" : "私有" }}
        </p>
        <el-button @click="playSong(songList)" class="header-btn"><i
            class="iconfont icon-24gf-playlistMusic2"></i>播放该歌单</el-button>
      </div>
    </div>
    <div class="music-content">
      <ul class="search-list-container">
        <li class="search-item header">
          <span>歌曲名</span><span>上传时间</span><span>创作者</span><span>歌曲操作</span>
        </li>

        <NoDataComp v-if="songList.length === 0" title="啊嘞嘞，好像没有歌曲哦"></NoDataComp>
        <li class="search-item p-r" v-for="(item, i) in songList" :key="item.id">
          <span style="padding: 0 10px; box-sizing: border-box" :title="item.originName | formatSongName">{{
            item.originName | formatSongName }}</span>
          <span>{{ item.createdAt | formatDate }}</span>
          <span @click="RouterToVisit(item.userInfo)" :title="item.userInfo.username" class="author"><span>{{
            item.userInfo.username }}</span></span>
          <span class="manage-button-wrapper"><span class="btn-wrapper">
              <span title="播放歌曲" @click="playSong(songList, i)" class="header-btn play-btn"></span>
              <span @click="cancelFavorite(item)" title="取消收藏歌曲" class="header-btn star-btn"></span>
              <span title="分享歌曲" class="header-btn share-btn"></span> </span></span>
        </li>
      </ul>
      <PagerComp style="margin-bottom: 15px" :page="page" :size="size"
        :count="activeItem.data ? activeItem.data.count : 0" :handleCurrentChange="handleCurrentChange" />

      <MessageTipComp v-show="showMessage" @maskClick="showMessage = false">
        <template>
          <p class="message-tip">确定要取消收藏吗</p>
        </template>
        <template #footer>
          <div class="message-btn-wrapper">
            <ConfirmBtn :loading="confirmLoading" @click="cancelSongFavorite" />
            <CancelBtn @click="showMessage = false" />
          </div>
        </template>
      </MessageTipComp>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import NoDataComp from "@/components/NoDataComp";
import PagerComp from "@/components/PagerComp";
import MessageTipComp from "@/components/MessageTipComp";
import ConfirmBtn from "@/components/ConfirmBtn";
import CancelBtn from "@/components/CancelBtn";
import { formatSongName, formatDate } from "@/utils/song";

let handleItem; // 取消收藏是哪一项
export default {
  data() {
    return {
      authorName: "",
      page: 1,
      size: 15,
      showMessage: false, // 展示取消收藏的提示信息
      confirmLoading: false, // 取消收藏的加载状态
    };
  },
  components: {
    NoDataComp,
    PagerComp,
    MessageTipComp,
    ConfirmBtn,
    CancelBtn,
  },
  computed: {
    ...mapState("Favorite", ["activeItem"]),
    ...mapState("User", ["userId", "username"]),
    songList() {
      if (this.activeItem.data) {
        const showList = this.activeItem.data.rows.slice(
          (this.page - 1) * this.size,
          this.page * this.size
        );
        return showList;
      } else {
        return [];
      }
    },
  },
  filters: {
    formatSongName,
    formatDate,
  },
  async created() {
    if (this.activeItem.favorite.UserId === undefined) {
      return;
    }
    this.handleAuthorName();
  },
  methods: {
    cancelFavorite(item) {
      // 取消收藏
      this.showMessage = true; // 打开对话框
      handleItem = item;
    },
    RouterToVisit(userInfo) {
      this.$router.push({
        path: `/visit/${userInfo.id}`,
      });
    },
    cancelSongFavorite() {
      // 点击对话框的确定按钮 取消收藏
      this.confirmLoading = true;
      this.$handleMessage(
        // 处理请求码信息
        this.$api.cancelSongFavorite({
          SongId: handleItem.id,
          FavoriteId: this.activeItem.favorite.id,
        }),
        undefined,
        true,
        "取消收藏成功"
      ).then((res) => {
        this.confirmLoading = false;
        // 实时更新页面状态
        // 不用发送请求，而是将数据从现有数据中删除
        if (res) {
          // 处理成功
          this.$store.commit("Favorite/removeSongInFavorite", handleItem);
          this.showMessage = false;
        }
      });
    },
    handleCurrentChange(page) {
      // 分页
      this.page = page;
    },
    handleAuthorName() {
      if (this.activeItem.favorite.UserId == this.userId) {
        //   如果是自己访问自己的歌单就不用发送请求到后台去询问这个收藏夹的作者
        this.authorName = this.username;
      } else {
        //   发送请求询问的当前收藏夹的作者
        this.$handleMessage(
          // 处理请求码信息
          this.$api.getFavoriteAuthorName({
            UserId: this.activeItem.favorite.UserId,
          })
        ).then((res) => {
          if (res) {
            this.authorName = res.data;
          }
        });
      }
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
      this.$store.commit("Song/setSongList", songList);
      this.$store.commit("Song/setPlayingIndex", i);

      this.$message({
        message: "即将播放歌单",
        type: "success",
        duration: 1500,
        onClose: () => {
          this.$router.push({
            path: `/nav/song/${this.activeItem.favorite.id}`,
          });
        },
      });
    },
  },
  watch: {
    activeItem() {
      this.handleAuthorName();
      this.page = 1;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/myStyle.less";
@import "./message.less";

.right-view-container {
  padding: 0 20px;

  &>.header {
    padding: 20px 0;
    border-bottom: 1px solid #e5e9ef;
    display: flex;

    .cover {
      height: 119px;
      border-radius: 4px;
      overflow: hidden;
      margin-right: 18px;

      img {
        display: block;
        height: 119px;
        object-fit: cover;
        object-position: 50%;
        border-radius: 4px;
      }
    }

    .header-info {
      h2 {
        display: block;
        font-weight: normal;
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #212121;
        line-height: 17px;
        margin-bottom: 14px;
        width: 368px;
        height: 17px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .author-name,
      .count {
        color: #99a2aa;
        font-size: 12px;
        vertical-align: middle;
        line-height: 16px;
        margin-bottom: 6px;

        .dot {
          margin: 0 8px;
        }
      }
    }

    .header-btn {
      background: #00a1d6;
      color: #fff;
      border-radius: 5px;
      font-size: 14px;
      text-align: center;
      padding: 10px 13px;
      transition: background 0.3s ease-in;

      &:hover {
        background: #00b5e5;
      }

      i {
        display: inline-block;
        margin-right: 3px;
      }
    }
  }
}

.search-list-container {
  width: 100%;

  .search-item {
    &:hover {
      background-color: lighten(#e2f4ff, 3%);
    }

    &.header {
      font-size: 1rem;
      color: #14a9ff;
      background-color: #e2f4ff;
    }

    width: 100%;
    display: flex;
    justify-content: space-around;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #f0f0f0;

    &>span {
      width: 33.33%;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      &.author {
        color: @blue;
        cursor: pointer;

        &>span {
          position: relative;
        }

        &>span::after {
          content: "";
          position: absolute;
          width: 0%;
          left: 0;
          transition: width 0.3s;
          bottom: -8px;
          height: 3px;
          border-radius: 5px;
          background: @blue;
        }

        &:hover>span::after {
          width: 100%;
        }
      }

      &:nth-child(2n) {
        color: #008c8c;
      }

      .setting-button {
        background: @blue;
        padding: 10px 25px;
        transition: background 0.8s;

        &:hover {
          background: desaturate(@blue, 21%);
        }
      }
    }

    .btn-wrapper {
      height: 50px;
      line-height: 50px;
      position: absolute;
      right: 79px;
      display: flex;
      align-items: center;
    }

    .header-btn {
      background: url(../../../assets/sprite.png);
      width: 14px;
      height: 14px;
      margin: 0 5px;
      display: inline-block;
      cursor: pointer;

      &.play-btn {
        background-position: 0 -195px;

        &:hover {
          background-position: 0 -177px;
        }
      }

      &.star-btn {
        background-position: 0 -123px;

        &:hover {
          background-position: 0 -105px;
        }
      }

      &.share-btn {
        background: url(../../../assets/icon_splice.png);
        background-position: -300px 0px;

        &:hover {
          background-position: -300px -30px;
        }
      }
    }
  }
}
</style>