<template>
  <div class="nav-wrapper">
    <div class="nav-content">
      <h1 class="logo">
        <a href="/"> <span>勿忘我</span></a>
      </h1>
      <div class="search-box">
        <el-input placeholder="请输入你要找的歌" suffix-icon="el-icon-search" v-model="searchKeyWord" class="search-input"
          @input="handleSearch" @focus="showSearchResult = true" @blur="handleShowSearchResults">
        </el-input>
        <div class="search-result" v-show="showSearchResult && keywords.length > 0">
          <router-link class="search-item" :to="{
            name: 'Search',
            query: {
              keyword: item.title,
              prop: item.prop,
            },
          }" v-for="(item, i) in keywords" :key="i">
            {{ item.title }}
          </router-link>
        </div>
      </div>
      <div class="about-wrapper">
        <About />
      </div>
      <div>
        <LoginState />
      </div>
    </div>
  </div>
</template>

<script>
import About from "./components/About";
import LoginState from "./components/LoginState";
import { debounce } from "@/utils/search";
export default {
  data() {
    return {
      searchKeyWord: "",
      keywords: [],
      showSearchResult: false,
    };
  },
  components: {
    About,
    LoginState, // 登录组件
  },
  methods: {
    handleSearch: debounce(async function () {
      // 做防抖处理
      const res = await this.$api.searchKeyWord({
        keyword: this.searchKeyWord,
      });
      if (res.code !== 200) {
        this.$message({
          message: "有点小问题",
          type: "warning",
          duration: 1500,
        });
        return;
      }
      this.keywords = // 仅展示5条结果
        res.data.length >= 5 ? res.data.slice(0, 5) : res.data.slice(0);
    }, 500),

    handleShowSearchResults() {
      setTimeout(() => {
        this.showSearchResult = false;
      }, 500);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/myStyle.less";

/deep/ .el-input__inner {
  border-radius: 0px !important;
}

.nav-wrapper {
  width: 100%;
  background-color: #fff;
  height: 78px;
  position: relative;
  z-index: 1000;
  border-bottom: 1px solid #eee;

  .nav-content {
    width: 1140px;
    display: flex;
    .mx-auto();

    .logo {
      height: 78px;
      line-height: 78px;

      span {
        color: #fff;
        text-shadow: -1px -1px 3px rgba(0, 0, 0, 0.3),
          1px 1px 2px rgba(0, 0, 0, 0.3);
        font-size: 32px;
        height: 78px;
        vertical-align: top;
        letter-spacing: 5px;
        margin-left: 10px;
      }
    }

    .search-box {
      width: 30%;
      margin: 0 27px;
      position: relative;
    }

    .search-result {
      width: 100%;
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
      box-sizing: border-box;
      border: 1px solid #ddd;
      position: absolute;
      background-color: #fff;
      z-index: 500;
      padding: 5px 10px;
      max-height: 300px;
      overflow-y: auto;
      font-size: 0.85rem;

      .search-item {
        cursor: pointer;
        padding: 5px;
        display: block;

        &:hover {
          background-color: #eee;
        }
      }
    }

    .search-input,
    button {
      margin-top: 20px;
    }
  }
}

/deep/ .el-input__inner:focus {
  border-color: #c0c4cc;
}
</style>