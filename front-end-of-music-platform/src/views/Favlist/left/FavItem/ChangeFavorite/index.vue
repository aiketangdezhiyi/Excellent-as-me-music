<template>
  <DialogComp @maskClick="$emit('maskClick')" title="收藏夹信息">
    <template>
      <div class="edit-container p-r">
        <div class="edit-cover">
          <p>收藏夹封面</p>
          <img
            @click="handleUpload"
            :src="uploadSrc ? uploadSrc : src"
            alt=""
          />
          <input
            type="file"
            id="cover-upload-btn"
            @change="uploadFavoriteCover"
            ref="uploadRef"
            name="avatar"
            class="upload-cover-img"
          />
        </div>

        <div class="select-container">
          <SelectComp @click="isPublic = !$event" :selected="isPublic" style="width:14px;height:14px;vertical-align:-2px" />
          公开歌曲收藏夹
        </div>

        
        <div class="edit-input-wrapper">
          <p>收藏夹名称</p>
          <el-input
            v-model="newTitle"
            maxlength="10"
            show-word-limit
            placeholder="请输入收藏夹名称"
          ></el-input>
        </div>
      </div>
    </template>
    <template #footer>
      <el-button :loading="confirmLoading" class="favorite-btn" @click="confirm"
        >提交</el-button
      >
      <el-button
        class="favorite-btn"
        @click="
          uploadSrc = src;
          newTitle = favoriteTitle;
          isPublic = Boolean(favoriteItem.isPublic);
        "
        >恢复</el-button
      >
    </template>
  </DialogComp>
</template>

<script>
import DialogComp from "@/components/DialogComp";
import SelectComp from "@/components/SelectComp";
import { upload } from "@/utils/favorite";
const base64 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAjoAAAFeBAMAAAB+66giAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAASUExURenp6efn58zMzNbW1uzs7N7e3nWPZNEAAAABdFJOU5cujd6BAAAE1klEQVR42uzd0W3bMBSF4a5QSxzAl+AAkqAB8tABKEL7r9K4JmHH12aaUiha3v8gSGCRedCHY1lUBOXbd/I66KCDDjrooIMOOuigQ9BBBx100EEHHXTQIeiggw466KCDDjroEHTQQQcddNBBBx10CDrooIMOOuiggw461oMOOuiggw466KCDDjoEHXTQQQcddNBBBx2CDjrooIMOOuiggw5BBx100EEHHXTQQYeggw466KCDDjrooGM96KCDDjrooIMOOuigQ9D5L3WWpT6elmhXZxMJleExiXi7OvKe+Mn4ZFVnEKmW53QZP9vVqZdHsp5NnVPe/fqw3e5UyyNi+p3lRLVD201mP7NmXR49aFZn0OXRY1Z1dD/0kN2VhC6IHjG9ChVVHtUqqzq6Inq7WR1dHl0dszq6JHqr+atfd+XR1TGvc1cTvc28jss9eVYddMZUVpu6OuioI4+qjikdl5aPyTq+vM448jBtjQZ0kvxp/NS7zpikIVPnOoM0Zepax83SFN+1ziaNCR3rOGlO7Fdnk+asb93qyAHptjuDHJCpV51ZDkjoVUcOSac6gxySqU+dTQ7JuU+dWQ6J71Pnbgf3Nf3Kvu5pf/11m5buaN961BkeP3bG31zWX7/deGLfOo3Vm3rUOTUeVjf1+x3o6L2LjUvY0KPO3PqZY0IntJbP96gjOefmA1eHOq75I2foWOcHOn+nOxEddNBBBx100EEHHXTQQQedqs6+BCXh14jO+/Y0i/hn13KW3brOvojICx0Rv0a7Oi5JyctL9MtuU2efKze85bFcIGs6pTZ1nVuBbOnMn9x2Ig9BB50CsdVvynEPw96WzgmdL+iE+k10wZbO8DWds2Udv+qll2Ud9+FsZsxz1PpLiRrSKbV5y1N0gWzqlBOaNaraPC1QNKYzq6NNpUD2dNaY31H1XCalhSunXDlFBx100EEHHXTQQQcddNBBBx10/m2dsr9bQEdlk1jmlMkrOiWzhLL/U+YSdO6G4lXpyuQEnVvy3/Nc2fUTOvp/IW1yYbpO9eiUXFhCTHnczZeX6FSeWxTRef1onsD5jt7xUJgiOvr+5OiyEufK+vGwa2byrCQ0z5qfTu0jOmpC+elGVqFcwUAHHXTQ+dneHdw0DARRAKWFcaAAs6QA5AqQSAEGpf9WyMnkwmgjY0UZvy8f97JPdtbx4Q8dzVYP3Yr2rhUt0RlX1znqG0x0mq7KrKtSz+neek6HZXc6cv+9X/mlTr9yvr22rhV+rt7rPn3fml+cVzMBkhxr6gzmSWw/i2Q2xyZJFNX5MgPJ/Kw7PlotyuoM63XGujqxXicK6wyrf3Uq64RZsxvOU51r68TBjOttBjm3OcrrRJyvB+i3KckCOV1yjtiDTjxfrqHnj8HhatFHlNLJc7NO1NTJN/7Wc8KNe9M5dZ3Ry1lVVSd/L2xd3zyirE7+aI09i45ldfKbp/V8MGvzDnVOU8++k0WldfrfYO6kI3To0KFDhw4dOnSEDh06dOjQoUOHjtChQ4cOHTp06NAROnTo0KFDhw4dOkKHDh06dOjQoUOHjtChQ4cOHTp06NAROnTo0KFDhw4dOkKHDh06dOjQoUNH6NChQ4cOHTp06AgdOnTo0KFDhw4dOkKHDh06dOg8uM6n/J0nSfIDaYJ+aZhy1ZoAAAAASUVORK5CYII=";
export default {
  components: {
    DialogComp,
    SelectComp
  },
  props: {
    confirmLoading: Boolean,
    favoriteItem: Object,
  },
  data() {
    return {
      uploadSrc: "",
      newTitle: "",
      isPublic : true,
    };
  },
  computed: {
    src() {
      return this.favoriteItem.coverUrl ? this.favoriteItem.coverUrl : base64;
    },
    favoriteTitle() {
      return this.favoriteItem.name ? this.favoriteItem.name : "";
    }
  },
  methods: {
    confirm() {
      this.$emit("confirm", {
        uploadSrc: this.uploadSrc ? this.uploadSrc : this.src, // 兼容如果未上传就用原来的封面
        newTitle: this.newTitle, 
        favoriteId: +this.favoriteItem.id,
        isPublic : this.isPublic
      }); // 确定
    },
    handleClick(item, i) {
      this.$emit("select", item, i);
    },
    handleUpload() {
      // 打开选择文件
      this.$refs.uploadRef.value = null; // 清空上传的数据
      this.$refs.uploadRef.click(); // 选择文件上传
    },
    uploadFavoriteCover() {
      // 当上传的图发生改变时触发上传
      upload(
        this.$refs.uploadRef.files,
        "picture",
        "/api/upload/favorite"
      ).then((res) => {
        if (res.code === 200) {
          // 上传成功
          const url = res.data; // 拿到上传的图片地址
          this.uploadSrc = url; // 更新图片
        } else {
          this.$message({
            type: "warning",
            messsage: "咦，好像有点小错误！",
          });
        }
      });
    },
  },
  watch: {
    favoriteTitle(val) {
      this.newTitle = val;
    },
    favoriteItem(val) {
      this.isPublic = Boolean(val.isPublic); // 恢复收藏夹
    }

  },
};
</script>

<style lang="less" scoped>
.select-container {
  font-size:12px;
  position: absolute;
  right : 0;
  top : 0;
  
}
p {
  margin: 0;
}
.edit-container {
  color: #222;
  line-height: 45px;
  .edit-cover {
    padding-bottom: 5px;
    img {
      display: block;
      width: 228px;
      height: 140px;
      border-radius: 2px;
      cursor: pointer;
    }
  }
}
.upload-cover-img {
  width: 0px;
  height: 0px;
  position: absolute;
  opacity: 0;
  outline: 0;
}
.favorite-btn {
  font-size: 14px;
  width: 100px;
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
</style>