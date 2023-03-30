<template>
  <div class="uploader-wrapper p-r">
    <div
      class="avatar wrapper-full"
      :style="{
        backgroundImage: `url(${item.avatarUrl})`,
      }"
    />
    <div class="mask p-a wrapper-full flex-center">
      <span class="text-ellipsis">{{ item.username }}</span>
    </div>
    <WaHonorComp
      class="p-a"
      :style="{
        top: '-5px',
        right: '-28px',
        'z-index': 27,
      }"
      :exp="item.exp"
    />
    <span :title="item.signature" class="signature text-ellipsis">{{
      item.signature ? item.signature : "这位歌手眼里只有哥"
    }}</span>
  </div>
</template>

<script>
import WaHonorComp from "@/components/WaHonorComp";
export default {
  components: {
    WaHonorComp,
  },
  props: {
    item: Object,
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/myStyle.less";
.uploader-wrapper {
  border-radius: 50%;
  width: 210px;
  height: 210px;
  color: #fff;
  transition: all 0.3s ease;
  cursor: pointer;
  margin-bottom: 80px;
  .avatar {
    background-size: cover;
    border-radius: 50%;
    background-position: center;
  }
  .mask {
    opacity: 0;
    left: 0;
    top: 0;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.2);
    color: #fff;
    font-size: 16px;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    text-align: center;
    transition: opacity 0.3s ease-in;
    & > span {
      display: inline-block;
      width: 80%;
      font-size: 30px;
      color: rgba(255, 255, 255, 0.85);
    }
  }
  &:hover {
    box-shadow: 0 26px 40px -24px rgb(0, 36, 100, 50%);
    transform: translateY(-3%);
    .mask {
      opacity: 1;
    }
  }
}
.signature {
  width: 100%;
  text-align: center;
  margin-top: 10px;
  font-size: 18px;
  display: inline-block;
  color: #fff;
  font-weight: 600;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  letter-spacing: 1px;
}

@media screen and (max-width: 1200px) and (min-width: 992px) {
  // 960
  .uploader-wrapper {
    width: 180px;
    height: 180px;
  }
}

@media screen and (max-width: 576px) {
  // 95%
  .uploader-wrapper {
    width: 40vw;
    height: 40vw;
  }
}
</style>