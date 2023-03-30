<template>
  <div class="singer-container" v-loading="loading">
    <div class="header">
      <h3>
        <i class="el-icon-user"></i>
        <span>优我</span>用户
      </h3>
      <div class="search-group">
        <el-input
          @keydown.enter.native="searchByKeyWord"
          class="search-input"
          v-model="searchKeyWord"
          placeholder="请输入你要查找的用户"
        >
        </el-input>
        <i @click="searchByKeyWord" class="el-icon-search search-icon"></i>
      </div>
    </div>
    <FollowItemComp
      v-for="item in allSingerList"
      :key="item.id"
      :isSingerComp="true"
      :userInfo="item"
    ></FollowItemComp>
    <PagerComp
      style="padding: 15px 0"
      :handleCurrentChange="handleCurrentChange"
      :page="pageConfig.page"
      :size="pageConfig.limit"
      :count="count"
    />
  </div>
</template>

<script>
import FollowItemComp from "@/components/FollowItemComp";
import PagerComp from "@/components/PagerComp";
let lastSearchKey = "";
export default {
  components: {
    FollowItemComp,
    PagerComp,
  },
  data() {
    return {
      allSingerList: [],
      count: 0,
      pageConfig: {
        page: 1,
        limit: 10,
      },
      loading: false,
      searchKeyWord: "",
    };
  },
  created() {
    document.title = "歌手";
    this.getAllSingerData();
  },
  methods: {
    handleCurrentChange(page) {
      this.pageConfig.page = page;
    },
    searchByKeyWord() {
      if (lastSearchKey === this.searchKeyWord) {
        return;
      }
      if (this.pageConfig.page !== 1) {
        this.pageConfig.page = 1;
      } else {
        this.getAllSingerData();
      }
      lastSearchKey = this.searchKeyWord;
    },
    async getAllSingerData() {
      this.loading = true;
      const res = await this.$api.getAllSinger({
        page: this.pageConfig.page,
        size: this.pageConfig.limit,
        keyword: this.searchKeyWord,
      });
      if (res.code === 200) {
        this.allSingerList = res.data.rows;
        console.log(this.allSingerList);
        this.count = res.data.count;
      }
      this.loading = false;
    },
  },
  watch: {
    pageConfig: {
      handler() {
        this.getAllSingerData();
      },
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/myStyle.less";
.singer-container {
  box-sizing: border-box;
  background: #fff;
  width: 930px;
  margin: 0 auto;
  margin-top: 27px;
  min-height: 500px;
  .header {
    height: 50px;
    padding: 0 27px;
    font-size: 21px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h3 {
      height: 50px;
      line-height: 50px;
      font-weight: 400;
      i,
      span {
        color: @blue;
      }
      i {
        font-size: 30px;
        margin-right: 5px;
      }
    }
    .search-group {
      .search-input {
        width: 190px;
        ::v-deep .el-input__inner {
          border-radius: 30px;
          height: 35px;
          padding-right: 35px;
          line-height: 35px;
          font-size: 13px;
        }
      }
      .search-icon {
        font-size: 16px;
        cursor: pointer;
        color: #ccc;
        transform: translateX(-160%);
        &:hover {
          color: @blue;
        }
      }
    }
  }
}
</style>