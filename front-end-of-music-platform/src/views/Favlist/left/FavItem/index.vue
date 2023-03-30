<template>
  <div
    class="fav-item-wrapper"
    @mouseover="mouseover = true"
    @mouseleave="mouseover = false"
    :class="{
      active: active || mouseover,
    }"
  >
    <span
      @click="handleClick"
      class="iconfont icon-yinleyule music-icon"
    ></span>
    <p @click="handleClick" class="title">{{ item.favorite.name }}</p>
    <div
      @click="handleClick"
      :class="{
        hide: mouseover,
      }"
      class="count"
    >
      {{ item.data.count }}
    </div>

    <el-dropdown>
      <div
        :class="{
          show: mouseover,
        }"
        class="more"
      >
        <i class="iconfont icon-moreandroid"></i>
      </div>
      <el-dropdown-menu
        @mouseover.native="mouseover = true"
        @mouseleave.native="mouseover = false"
        style="margin-top: -10px"
        slot="dropdown"
      >
        <el-dropdown-item @click.native="handleEditFavorite(item.favorite)"
          >编辑信息</el-dropdown-item
        >
        <el-dropdown-item @click.native="handleDeleteFavorite(item.favorite)"
          >删除歌单</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>

    <MyTeleport selector="body" >
      <ChangeFavorite
        :confirmLoading="confirmLoading"
        @confirm="confirm"
        :favoriteItem="favoriteItem"
        @maskClick="showChangeFavoriteDialog = false"
        v-show="showChangeFavoriteDialog"
      ></ChangeFavorite>
    </MyTeleport>
    <!-- 防止因为父元素的被其他层遮挡，导致弹框无法在最顶层 -->

    <DeleteTip
      @handleConfirmDelete="handleConfirmDelete"
      @maskHide="showMessage = false"
      :showMessage="showMessage"
      :confirmLoading="confirmLoading"
      :deleteTip="deleteTip"
    />
  </div>
</template>

<script>
import ChangeFavorite from "./ChangeFavorite";
import DeleteTip from "@/components/DeleteTip";
import MyTeleport from "@/components/MyTeleport";
const tip = "你将要删除";
export default {
  components: {
    ChangeFavorite,
    DeleteTip,
    MyTeleport,
  },
  props: {
    item: Object,
    active: Boolean,
  },
  data() {
    return {
      mouseover: false,
      showChangeFavoriteDialog: false,
      favoriteItem: {},
      confirmLoading: false,
      deleteItem: null, // 将要删除的歌单
      deleteTip: "", // 删除提示词
      showMessage: false, // 是否展示删除弹框
    };
  },
  methods: {
    handleEditFavorite(item) {
      this.favoriteItem = item;
      this.showChangeFavoriteDialog = true;
    },
    handleClick() {
      this.$emit("change", this.item);
    },
    async confirm(newFavoriteInfo) {
      // 点击修改收藏夹信息的提交按钮
      if (newFavoriteInfo.newTitle === "") {
        // 校验
        this.$message({
          type: "warning",
          message: "收藏夹名称不能为空",
          duration: 1500,
        });
        return;
      }
      // 提交修改
      this.confirmLoading = true;

      this.$handleMessage(
        // 处理请求码信息
        this.$api.changeFavoriteInfo(newFavoriteInfo),
        undefined,
        true,
        "收藏夹修改成功"
      ).then((res) => {
        this.confirmLoading = false;
        this.showChangeFavoriteDialog = false;
        if (res) {
          this.$store.dispatch("Favorite/getFavoriteList");
        } else {
          this.showChangeFavoriteDialog = false;
        }
      });
    },
    handleDeleteFavorite(item) {
      // 删除歌单
      this.deleteItem = item;
      this.deleteTip = tip + item.name + "歌单";
      this.showMessage = true;
    },
    handleConfirmDelete() {
      // 确定删除收藏夹
      this.confirmLoading = true;
      const FavoriteId = this.deleteItem.id;
      console.log(this.deleteItem);
      this.$handleMessage(
        // 处理请求码信息
        this.$api.deleteFavorite({
          FavoriteId,
        }),
        undefined,
        true,
        "删除歌单成功"
      ).then((res) => {
        this.confirmLoading = false;
        this.showMessage = false;
        if (res) {
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
        // 因为当前可能就是在看这个收藏夹，索性直接刷新页面
      });
    },
  },
};
</script>

<style lang="less" scoped>
.fav-item-wrapper {
  display: flex;
  height: 45px;
  line-height: 45px;
  padding-left: 20px;
  box-sizing: border-box;
  cursor: pointer;
  &:last-of-type {
    border-bottom: 1px solid #eee;
  }
  &.active,
  &:hover {
    background: #00a1d6;
    color: #fff;
    .music-icon,
    .title,
    .count {
      color: #fff;
    }
  }
  &.active {
    background-color: #00a1d6;
  }
  .music-icon {
    color: #999;
    font-size: 22px;
    vertical-align: middle;
    margin-right: 10px;
  }
  .title {
    line-height: 45px;
    width: 86px;
    margin-right: 5px;
    font-size: 14px;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgb(32, 43, 47);
    font-size: 14px;
  }
  .count {
    text-align: center;
    width: 32px;
    font-size: 12px;
    color: #99a2aa;
    vertical-align: middle;
    text-align: center;
    font-family: Arial;
    &.hide {
      display: none;
    }
  }
  .more {
    display: none;
    text-align: center;
    width: 32px;
    font-size: 14px;
    color: #fff;
    &.show {
      display: block;
    }
  }
}
</style>