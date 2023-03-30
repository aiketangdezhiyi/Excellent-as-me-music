<template>
  <div>
    <TitleComp style="margin-top: 60px" leftTitle="Three" rightTitle="本周创作之星" subTitle="勿忘我2022 期待你来战" />
    <div class="star-list-container" v-if="starList.length > 0">
      <StarItemComp @click.native="routerToVisit(item.id)" v-for="item in starList" :key="item.id"
        :avatarUrl="item.avatarUrl" :username="item.username" :signature="item.signature" />
    </div>
  </div>
</template>

<script>
import TitleComp from "@/components/TitleComp";
import StarItemComp from "./StarComp";
export default {
  components: {
    TitleComp,
    StarItemComp,
  },
  data() {
    return {
      starList: [],
    };
  },
  created() {
    this.getStarList();
  },
  methods: {
    async getStarList() {
      const { code, data } = await this.$api.getLightStar();
      if (code === 200) {
        this.starList = data;
      }
    },
    routerToVisit(id) {
      this.$router.push(`/nav/visit/${id}`);
    },
  },
};
</script>

<style lang="less" scoped>
.star-list-container {
  width: 1140px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 35px;
}

@media screen and (max-width: 1200px) and (min-width: 992px) {

  // 960
  .star-list-container {
    width: 960px;
  }
}

@media screen and (max-width: 992px) and (min-width: 768px) {

  // 720
  .star-list-container {
    width: 720px;
  }
}

@media screen and (max-width: 768px) {
  .star-list-container {
    display: block;

    .star-item-container {
      margin-bottom: 2.75rem;
    }
  }
}

@media screen and (max-width: 768px) and(min-width : 576px) {

  // 540
  .star-list-container {
    width: 540px;
  }
}

@media screen and (max-width: 576px) {

  // 95%
  .star-list-container {
    width: 95%;
  }
}
</style>