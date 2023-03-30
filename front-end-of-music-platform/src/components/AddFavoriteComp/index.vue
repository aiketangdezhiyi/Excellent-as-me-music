<template>
  <DialogComp
    @maskClick="$emit('maskClick')"
    title="添加到收藏夹"
    @click.native="handleDialogClick"
  >
    <template>
      <FavoriteItem
        @click.native="handleClick(item, item.id)"
        :select="activeIndex.includes(item.id)"
        v-for="item in favoriteItem"
        :key="item.id"
        :item="item"
      ></FavoriteItem>
      <div
        class="add-group"
        :class="{
          hide: showFormInput,
        }"
        @click="showFormInput = true"
        ref="addGroup"
      >
        <div class="add-btn" ref="addGroupBtn">新建收藏夹</div>
      </div>
      <form
        class="input-group"
        :class="{
          show: showFormInput,
        }"
        ref="inputGroup"
      >
        <input
          type="text"
          maxlength="20"
          v-model="newFavorite"
          placeholder="最多可输入20个字"
          ref="input"
        /><button
          @click.prevent="addNewFavorite"
          class="submit"
          ref="submitBtn"
        >
          新建
        </button>
      </form>
    </template>
    <template #footer>
      <el-button :loading="confirmLoading" class="confirm-btn" @click="confirm">确定</el-button>
    </template>
  </DialogComp>
</template>

<script>
import FavoriteItem from "./FavoriteItem";
import DialogComp from "@/components/DialogComp";
export default {
  components: {
    FavoriteItem,
    DialogComp,
  },
  props: {
    confirmLoading :Boolean,
    favoriteItem: {
      type: Array,
      default: () => [],
    },
    activeIndex: Array,
  },
  data() {
    return {
      showFormInput: false,
      newFavorite: "",
    };
  },
  methods: {
    confirm() {
      this.$emit("confirm"); // 确定
    },
    handleClick(item, i) {
      this.$emit("select", item, i);
    },
    async addNewFavorite() {
      if (this.newFavorite == "" || this.newFavorite.length >= 20) {
        this.$message({
          message: "收藏夹的名字好像不规范",
          duration: 1500,
          type: "warning",
        });
        return;
      }

      const res = await this.$api.addFavorite({
        name: this.newFavorite,
      });
      this.$emit("addFavorite", res.data, res.data.id); // 更新收藏夹信息
      this.showFormInput = false; // 隐藏新建收藏夹
      this.newFavorite = "";
    },
    handleDialogClick(e) {
      if (
        e.target === this.$refs.addGroup ||
        e.target === this.$refs.addGroupBtn
      ) {
        this.showFormInput = true;
        return;
      }
      if (
        e.target !== this.$refs.submitBtn &&
        e.target !== this.$refs.inputGroup &&
        e.target !== this.$refs.input
      ) {
        // 当点击非表单区域时默认隐藏新建收藏夹
        this.showFormInput = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.confirm-btn {
  font-size: 14px;
  width: 160px;
  height: 40px;
  margin-top: 18px;
  background: #00a1d6;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  &:hover {
    background: #00b5e5;
  }
}
.add-group {
  margin-bottom: 5px;
  width: 323px;
  display: block;
  margin-bottom: 25px;
  .add-btn {
    height: 34px;
    line-height: 34px;
    padding: 0 34px;
    border: 1px solid #ccd0d7;
    border-radius: 4px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAC5JREFUKBVjYMABZi5a9R+EcUgzMOGSICQ+EjQy4gs5fAFEduDgNHQ0HhnIT6sAudAOjNLnY/wAAAAASUVORK5CYII=)
      no-repeat 10px center;
    font-size: 12px;
    color: #6d757a;
    cursor: pointer;
  }
  &.hide {
    display: none;
  }
}
.input-group {
  display: none;
  height: 34px;
  line-height: 34px;
  border: 1px solid #00a1d6;
  border-radius: 4px;
  position: relative;
  margin-bottom: 25px;
  &.show {
    display: block;
  }
  input {
    border: none;
    font-size: 12px;
    width: 200px;
    margin-left: 10px;
    padding: 0;
    box-shadow: none;
    height: 100%;
    vertical-align: top;
    outline: 0;
    background-color: transparent;
  }
  .submit {
    float: right;
    height: 34px;
    width: 90px;
    background: #d9f1f9;
    border: none;
    border-left: 1px solid #00a1d6;
    border-radius: 0 4px 4px 0;
    font-size: 14px;
    color: #00a1d6;
    cursor: pointer;
  }
}
</style>