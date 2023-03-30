<template>
  <div class="manage-song-wrapper">
    <div class="header-search">
      <input class="header-search-input" v-model="value" placeholder="请输入搜索关键字，默认搜索全部"
        @keyup.enter="handleSearch(false)" />
      <button class="search-button" @click="handleSearch(false)"></button>
      <h2 class="my-song p-a">我的歌曲</h2>

      <div class="option-wrapper p-a">
        <span v-for="(item, i) in optionItems" :key="item.title" class="header-option-item p-r"
          @click="handleChangeOption(item, i)" :class="{
            active: item.active,
          }">{{ item.title }}</span>
      </div>
    </div>
    <ul class="search-list-container" v-loading="loading">
      <li class="search-item header">
        <span>歌曲名</span><span>上传时间</span><span>歌曲性质</span><span>歌曲详情</span>
      </li>

      <NoDataComp v-if="songList.length === 0" title="啊嘞嘞，好像没有歌曲哦"></NoDataComp>
      <li class="search-item p-r" v-for="item in songList" :key="item.id">
        <span style="padding: 0 10px; box-sizing: border-box" :title="item.originName | formatSongName">{{ item.originName
          | formatSongName }}</span>
        <span>{{ item.createdAt | formatDate }}</span>

        <el-popover trigger="hover" placement="top-start" width="200"
          content="创作歌曲为自己翻唱或原创或经过作者同意上传的，可以共享到平台供他人试听，他人歌曲及有版权歌曲可以加入歌单，不共享到平台上">
          <span>{{ item.creative ? "创作歌曲" : "他人歌曲" }}</span>
        </el-popover>

        <span class="manage-button-wrapper"><span class="btn-wrapper">
            <span title="播放歌曲" class="header-btn play-btn" @click="playOneSong(item.id)"></span>
            <span title="收藏歌曲" @click="collectSong(item.id)" class="header-btn star-btn"></span>
            <span title="分享歌曲" class="header-btn share-btn"></span> </span><span>
            <span @click="showEditComp(item)" class="setting-button music-iconfont icon-shezhi3"></span>
            <span @click="
              deleteInfo.deleteItem = item;
            deleteInfo.showMessage = true;
                            " class="delete el-icon-delete"></span> </span></span>
      </li>
    </ul>

    <PagerComp :handleCurrentChange="handleCurrentChange" :page="page" :size="size" :count="count" />

    <MyTeleport selector="body">
      <AddFavoriteComp @addFavorite="addFavorite" @select="select" @maskClick="showMask = false"
        @confirm="favoriteConfirm" :confirmLoading="confirmLoading" v-show="showMask" :favoriteItem="favoriteContext"
        :activeIndex="activeIndex"></AddFavoriteComp>
    </MyTeleport>

    <MyTeleport v-if="editingSong">
      <EditSong @confirm="changeSongName" @changeSongToUnCreative="changeSongToUnCreative"
        @applySongToCreative="applySongToCreative" @maskClick="showEditSongComp = false"
        :confirmLoading="changeSongNameLoading" :songItem="editingSong" v-if="showEditSongComp" />
    </MyTeleport>

    <MyTeleport selector="body">
      <DeleteTip @handleConfirmDelete="deleteSong" @maskHide="deleteInfo.showMessage = false"
        :showMessage="deleteInfo.showMessage" deleteTip="即将删除歌曲" :confirmLoading="deleteInfo.deleteLoading">
      </DeleteTip>
    </MyTeleport>
  </div>
</template>

<script>
import { formatSongName, formatDate } from "@/utils/song";
import { compareArr } from "@/utils/favorite.js";
import NoDataComp from "@/components/NoDataComp";
import MyTeleport from "@/components/MyTeleport";
import EditSong from "./EditSong";
import AddFavoriteComp from "@/components/AddFavoriteComp";
import PagerComp from "@/components/PagerComp";
import DeleteTip from "@/components/DeleteTip";
let lastOption = 0; // 上一次状态
let selectFavorite = []; // 选中的收藏夹
let lastActiveIndex = []; // 最开始歌曲被收录在哪个收藏夹
let songId;
export default {
  components: {
    NoDataComp,
    AddFavoriteComp,
    PagerComp,
    EditSong,
    MyTeleport,
    DeleteTip,
  },
  data() {
    return {
      songList: [],
      count: 0,
      size: 8,
      page: 1,
      keyword: "",
      value: "",
      loading: false,
      confirmLoading: false, // 确定收藏夹按钮加载
      optionItems: [
        { title: "最近上传", active: true }, // 0
        { title: "播放量最高", active: false }, // 1
        { title: "只看创作歌曲", active: false }, // 2
      ],
      option: 0, // 传到后台作为标识查找类型
      showMask: false, // 是否展示收藏歌曲的组件
      favoriteContext: [],
      activeIndex: [], // 还需要初始化是否这条歌曲在这个收藏夹内
      showEditSongComp: false, // 是否展示编辑歌曲信息组件
      editingSong: null, // 正在编辑的歌曲
      changeSongNameLoading: false,
      deleteInfo: {
        // 删除歌曲
        showMessage: false,
        deleteLoading: false,
        deleteItem: null,
      },
    };
  },
  filters: {
    formatSongName,
    formatDate,
  },
  async created() {
    document.title = "我的歌曲";
    this.getSongWithPageConfig();

    this.getFavoriteContext(); // 获取收藏夹目录信息
  },
  methods: {
    deleteSong() {
      this.deleteInfo.deleteLoading = true;
      this.$handleMessage(
        // 处理请求码信息
        this.$api.deleteSong(this.deleteInfo.deleteItem),
        undefined,
        true,
        "歌曲已经删除"
      ).then((res) => {
        this.deleteInfo.deleteLoading = this.deleteInfo.showMessage = false;
        if (res) {
          this.getSongWithPageConfig();
        }
      });
    },
    applySongToCreative(id, userDesc) {
      // 申请歌曲为创作歌曲
      this.$handleMessage(
        // 处理请求码信息
        this.$api.applySongToCreative({
          id,
          userDesc,
        }),
        undefined,
        true,
        "已经提交申请，继续努力哟"
      ).then((res) => {
        this.showEditSongComp = false;
        if (res) {
          this.getSongWithPageConfig();
        }
      });
    },
    changeSongToUnCreative(cb) {
      // 修改歌曲为非创作歌曲
      this.$handleMessage(
        // 处理请求码信息
        this.$api.changeSongToUnCreative({
          id: this.editingSong.id,
        }),
        undefined,
        true,
        "歌曲已经为非创作歌曲，不在平台共享,继续创作哟"
      ).then((res) => {
        typeof cb === "function" && cb();
        this.showEditSongComp = false;

        if (res) {
          this.getSongWithPageConfig();
        }
      });
    },
    async getSongWithPageConfig() {
      const { code, msg, data } = await this.getDataWithPageConfig(); // 获取歌曲用户自己的歌曲信息
      if (code === 200) {
        const { count, data: songList } = data;

        this.count = count;
        this.songList = songList;
      } else {
        this.$message({
          type: "error",
          message: msg,
          duration: 1500,
        });
      }
    },
    showEditComp(song) {
      this.editingSong = song;
      this.showEditSongComp = true;
    },
    changeSongName(newSongName) {
      this.changeSongNameLoading = true;
      this.$handleMessage(
        // 处理请求码信息
        this.$api.changeSongName({
          id: this.editingSong.id,
          newSongName,
        }),
        undefined,
        true,
        "歌名修改成功"
      ).then((res) => {
        this.changeSongNameLoading = false;
        this.showEditSongComp = false;
        if (res) {
          this.getSongWithPageConfig();
        } else {
          this.showEditSongComp = false;
        }
      });
    },
    addFavorite(item, i) {
      this.activeIndex.push(i);
      this.favoriteContext.push(item);
      selectFavorite.push(item);
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
    async getFavoriteContext() {
      // 获取用户收藏夹目录
      const res = await this.$api.getUserAllFavoriteContext();
      if (res.code === 200) {
        this.favoriteContext = res.data;
      }
    },
    async getDataWithPageConfig() {
      // 根据现有的配置获取用户上传歌曲数据
      this.loading = true;
      const res = await this.$api.getSongWithPage({
        page: this.page,
        size: this.size,
        keyword: this.keyword,
        option: this.option,
      });
      this.loading = false;
      return res;
    },
    playOneSong(songId) {
      this.$message({
        message: "即将播放歌曲",
        type: "success",
        duration: 1500,
        onClose: () => {
          this.$router.push({
            name: "Song",
            params: {
              songId: "youwo",
            },
            query: {
              songList: JSON.stringify([songId])
            }
          });
        },
      });
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
    handleChangeOption(item, i) {
      if (i === lastOption) {
        return;
      }
      this.optionItems.forEach((item) => (item.active = false));
      item.active = true;
      this.option = i; // 类型
      lastOption = i;
      this.handleSearch(true);
    },
    async handleSearch(force) {
      // force 是否强制更新
      // 点击搜索按钮或按下回车键进行关键词搜索
      if (this.keyword == this.value && !force) {
        return;
      }
      this.page = 1;
      if (!force) {
        // 不是强制刷新
        // 如果是强制刷新，说明是从handleChangeOption调用本函数
        this.keyword = this.value;
      }
      console.log(force, this.keyword);

      const { code, msg, data } = await this.getDataWithPageConfig();
      if (code === 200) {
        const { count, data: songList } = data;
        this.count = count;
        this.songList = songList;
      } else {
        this.$message({
          type: "error",
          message: msg,
          duration: 1500,
        });
      }
    },
    async handleCurrentChange(page) {
      this.page = page;
      const { code, msg, data } = await this.getDataWithPageConfig(); // 获取歌曲用户自己的歌曲信息
      if (code === 200) {
        const { count, data: songList } = data;
        this.count = count;
        this.songList = songList;
      } else {
        this.$message({
          type: "error",
          message: msg,
          duration: 1500,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/myStyle.less";

.manage-song-wrapper {
  padding: 15px;
  min-height: 595px;

  .header-search {
    text-align: center;
    padding-bottom: 27px;
    position: relative;

    .header-search-input {
      outline: none;
      width: 430px;
      height: 40px;
      line-height: 40px;
      background-color: #fff;
      border: 1px solid #ccc;
      box-sizing: border-box;
      padding-right: 40px;
      text-indent: 1em;
    }

    .my-song {
      font-weight: normal;
      font-size: 27px;
      left: 2px;
      top: 1px;
      color: #333;
      border-left: 5px solid @blue;
      padding: 3px 0;
      padding-left: 10px;
      background-color: rgba(226, 244, 255, 0.5);
    }

    .option-wrapper {
      right: 0;
      bottom: 33px;
      font-size: 12px;

      .header-option-item {
        display: inline-block;
        margin: 0 5px;
        cursor: pointer;

        &:hover {
          color: @blue;
        }

        &::after {
          content: "";
          position: absolute;
          width: 0%;
          border-radius: 5px;
          background-color: @blue;
          height: 3px;
          transition: width 0.2s;
          left: 0;
          bottom: -5px;
        }

        &.active {
          color: @blue;

          &::after {
            width: 100%;
          }
        }
      }
    }

    .search-button {
      position: absolute;
      margin: 13px 0 0 13px;
      width: 16px;
      height: 16px;
      outline: none;
      border: 0;
      background-color: transparent;
      cursor: pointer;
      transform: translateX(-41px);
      background: url(../../../assets/search.png);
      background-position: -40px -56px;

      &:hover {
        background-position: -40px -86px;
      }
    }
  }
}

.search-list-container {
  width: 100%;

  .search-item {
    &:hover {
      background-color: lighten(#e2f4ff, 3%);

      .btn-wrapper {
        opacity: 1;
      }
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

      &:nth-child(2n) {
        color: #008c8c;
      }

      .setting-button {
        color: @blue;
        cursor: pointer;
        font-size: 21px;
        transition: color 0.8s;

        &:hover {
          color: darken(@blue, 8%);
        }
      }

      .delete {
        margin-left: 10px;
        color: darken(@cyan, 8%);
        cursor: pointer;
        font-size: 21px;
        transition: color 0.8s;

        &:hover {
          color: @cyan;
        }
      }
    }

    .btn-wrapper {
      opacity: 0;
      height: 50px;
      line-height: 50px;
      position: absolute;
      right: 160px;
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