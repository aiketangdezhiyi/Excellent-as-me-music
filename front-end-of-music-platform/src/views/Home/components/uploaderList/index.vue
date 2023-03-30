<template>
  <div>
    <TitleComp leftTitle="Top Ten" rightTitle="歌手" subTitle="勿忘我 期待你来战" />
    <div class="best-uploader-list mx-auto">
      <BestUploader @click.native="routerToVisit(item.id)" v-for="item in hotStarList" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<script>
import BestUploader from "./bestUploader";
import TitleComp from "@/components/TitleComp";

export default {
  data() {
    return {
      hotStarList: [],
    };
  },
  components: {
    BestUploader,
    TitleComp,
  },
  async created() {
    const { code, data } = await this.$api.getHotStar();
    if (code === 200) {
      this.hotStarList = data;
    }
  },
  methods: {
    routerToVisit(id) {
      this.$router.push(`nav/visit/${id}`);
    },
  },
};
</script>

<style lang="less" scoped>
.i-main-title {
  margin-top: 60px;
}

.best-uploader-list {
  width: 1140px;
  display: flex;
  padding-top: 27px;
  justify-content: space-between;
  flex-wrap: wrap;
}

@media screen and (max-width: 1200px) and (min-width: 992px) {

  // 960
  .best-uploader-list {
    width: 960px;
  }
}

@media screen and (max-width: 992px) and (min-width: 768px) {

  // 720
  .best-uploader-list {
    width: 720px;
  }
}

@media screen and (max-width: 768px) and(min-width : 576px) {
  .best-uploader-list {
    width: 540px;
  }
}

@media screen and (max-width: 576px) {
  .best-uploader-list {
    width: 95%;
  }
}
</style>