<template>
  <div class="home-song-container">
    <div class="home-recent-container">
      <RecentView />
    </div>

    <div class="home-hot-container">
      <HotView />
    </div>
  </div>
</template>

<script>
import HotView from "./hot";
import RecentView from "./recent";
export default {
  components: {
    HotView,
    RecentView,
  },
};
</script>

<style lang="less" scoped>
.home-song-container {
  width: 1140px;
  margin: 0 auto;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}
@media screen and (max-width: 1200px) and (min-width: 992px) {
  // 960
  .home-song-container {
    width: 960px;
  }
}
@media screen and (max-width: 992px) and (min-width: 768px) {
  // 720
  .home-song-container {
    width: 720px;
    display:block;
  }
}
@media screen and (max-width: 768px) and(min-width : 576px) {
  // 540
  .home-song-container {
    width: 540px;
    display:block;
  }
}

@media screen and (max-width: 576px) {
  // 95%
  .home-song-container {
    width: 95%;
    display:block;
  }
}
</style>