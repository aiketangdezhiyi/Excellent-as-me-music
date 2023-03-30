<template>
  <div class="star-item-container">
    <div class="star-top">
      <img class="avatar mx-auto" :src="avatarUrl" alt="" />
      <p class="username w-100 max-auto text-ellipsis">{{ username }}</p>
    </div>
    <div class="star-bottom text-ellipsis">
      {{ signature ? signature :"这个人平平淡淡，不留签名" }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    avatarUrl: String,
    username: String,
    signature: String,
  },
};
</script>

<style lang="less" scoped>
.star-item-container {
  width: 30%;
  height: 270px;
  border: 1px solid #e4ecf3;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover {
      transform: translateY(-7px);
      box-shadow: 0 5px 28px rgba(0,0,0,.5);
  }
  .star-top {
    padding: 20px 10px;
    background: #f5f8fa;
    .avatar {
      display: block;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      overflow: hidden;
    }
    .username {
      font-size: 18px;
      font-weight: 400;
    }
  }
  .star-bottom {
    background-color: #fff;
    color: #919191;
    line-height: 60px;
    height: 60px;
    padding: 0 20px;
  }
}

@media screen and (max-width: 768px) {
    // 540
    .star-item-container {
      width: 100%;
      margin-bottom: 27 px;
  }
}
</style>