<template>
  <div class="search-container">
    <div class="header-search">
      <div class="search-box">
        <input
          type="text"
          v-model="searchKeyWord"
          @keydown.enter="changeSearchKeyword"
          placeholder="请输入搜索的音乐"
        />
        <button class="search-button" @click="changeSearchKeyword"></button>
      </div>
    </div>
    <div class="search-content">
      <SearchHeader
        @playall="playAll"
        @playselect="playSelect"
        title="搜索结果"
      />
      <SearchList
        @select="select"
        v-loading="loading"
        :selectSongs="selectSongs"
        :searchSongs="searchSongs"
      />
    </div>

    <PagerComp
      style="margin-bottom: 15px"
      :handleCurrentChange="handleCurrentChange"
      :page="pageConfig.page"
      :size="pageConfig.size"
      :count="count"
    />
  </div>
</template>

<script>
import SearchHeader from "./SearchHeader";
import SearchList from "./SearchList";
import PagerComp from "@/components/PagerComp";
export default {
  components: {
    SearchHeader,
    SearchList,
    PagerComp,
  },
  data() {
    return {
      searchKeyWord: "", // 查询的关键字
      count: 0,
      searchSongs: [], // 查询到的歌曲信息
      pageConfig: {
        page: 1, // 当前页
        size: 27, // 每页显示条目个数
      },
      lastKeyWord: "", // 上传搜索的关键字 主要是为了优化
      loading: false,
      selectSongs: [], // 被选中播放的歌曲
    };
  },
  async created() {
    // 从router中拿信息
    document.title = "歌曲搜索";
    const query = this.$route.query;
    if (query.keyword) {
      this.searchKeyWord = query.keyword;
      this.lastKeyWord = query.keyword;
      this.getSearchSong(query);
    }
  },
  methods: {
    async getSearchSong(query) {
      this.loading = true;
      const res = await this.$api.searchByKeyWord({
        keyword: query ? query.keyword : this.searchKeyWord,
        page: this.pageConfig.page,
        size: this.pageConfig.size,
      });

      this.searchSongs = res.data.rows;
      this.count = res.data.count;
      this.loading = false;
    },
    select(item, i) {
      if (i >= 0) {
        // 已经选中
        this.selectSongs.splice(i, 1);
      } else {
        this.selectSongs.push(item);
      }
    },
    handleCurrentChange(page) {
      document.documentElement.scrollTop = 0;
      this.pageConfig.page = page;
      this.getSearchSong();
    },
    async changeSearchKeyword() {
      if (this.$data.lastKeyWord === this.$data.searchKeyWord) {
        // 优化 减少无效请求的发送
        return;
      }
      this.$data.lastKeyWord = this.$data.searchKeyWord;
      this.getSearchSong();
    },
    playAll() {
      // 播放所有歌曲
      if (this.searchSongs.length === 0) {
        this.$message({
          message: "歌单里好像没有歌曲哦",
          type: "warning",
          duration: 1500,
        });
        return;
      }

      
      this.$store.commit("Song/playSongId",-1); // 没有指定播放的歌曲
      this.$store.commit("Song/setPlayingIndex", 0);
      this.$router.push("/song/youwo?songList=" + JSON.stringify(this.searchSongs.map(it=>it.id)));
    },
    playSelect() {
      // 播放选中的歌曲
      if (this.selectSongs.length === 0) {
        this.$message({
          message: "歌单里好像没有歌曲哦",
          type: "warning",
          duration: 1500,
        });
        return;
      }

      this.$store.commit("Song/playSongId",-1); // 没有指定播放的歌曲
      this.$store.commit("Song/setPlayingIndex", 0);
      this.$router.push("/song/youwo?songList=" + JSON.stringify(this.selectSongs.map(it=>it.id)));
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/myStyle.less";
.search-container {
  width: 100%;
  .header-search {
    width: 100%;
    height: 120px;
    background-color: #f8f8f8;
    overflow: hidden; // BFC
    .search-box {
      margin: 40px auto;
      width: 498px;
      height: 40px;
      position: relative;
      input {
        padding: 5px;
        outline: none;
        border: 1px solid #ddd;
        width: 100%;
        height: 100%;
        padding: 5px;
        text-indent: 1em;
        color: #666;
        box-sizing: border-box;
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
        background: url(../../assets/search.png);
        background-position: -40px -56px;
        &:hover {
          background-position: -40px -86px;
        }
      }
    }
  }
  .search-content {
    width: 1000px;
    margin: 0 auto;
  }
}
.pagination-container {
  padding: 27px 0;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  color: @blue;

  /deep/ .el-pagination.is-background .btn-next,
  /deep/ .el-pagination.is-background .btn-prev,
  /deep/ .el-pagination.is-background .el-pager li,
  /deep/ .el-pager li,
  /deep/ .el-pagination.is-background .btn-next,
  .el-pagination.is-background .btn-prev,
  .el-pagination.is-background .el-pager li {
    color: @blue;
    background-color: transparent;
    border-color: @blue;
    font-weight: normal;
  }
  /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
    color: #fff;
    background-color: @blue;
  }
}
</style>