<template>
  <div class="carousel-wrapper">
    <el-carousel
      :interval="5000"
      height="100%"
      arrow="hover"
      @change="changeCarousel"
      trigger="click"
    >
      <el-carousel-item v-for="(item, i) in carouselList" :key="i">
        <div
          class="carousel-item"
          :style="{
            backgroundImage: `url(${item.src})`,
          }"
        >
          <div
            class="carousel-content p-r"
            :class="{
              active: activeIndex === i,
            }"
          >
            <p class="left p-a">{{ item.leftText }}</p>
            <p class="right p-a">{{ item.rightText }}</p>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { carouselList } from "./config";
export default {
  data() {
    this.carouselList = carouselList;
    return {
      activeIndex: 0,
    };
  },
  methods: {
    changeCarousel(curIndex) {
      this.activeIndex = curIndex;
    },
  },
};
</script>

<style lang="less" scoped>
.carousel-wrapper {
  height: 500px;
}
::v-deep .el-carousel {
  height: 100%;
}
.carousel-item {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  .carousel-content {
    color: hsla(0, 0%, 100%, 0.9);

    .left {
      font-size: 5rem;
      left: 18vw;
      top: 120px;
      opacity: 0;
      transform: translateX(-100%);
      transition: 1.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
    .right {
      font-size: 5rem;
      right: 15vw;
      opacity: 0;
      top: 230px;
      transform: translateX(100%);
      transition: 1.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
    &.active {
      .left,
      .right {
        opacity: 1;
        transform: translateX(0%);
      }
    }
  }
}
@media screen and (max-width: 960px) {
  .left {
    font-size: 2.8rem !important;
    top: 8vw !important;
  }
  .right {
    font-size: 2.7rem !important;
    top: 18vw !important;
  }
  .carousel-wrapper {
    height: 38vw;
  }
}

@media screen and (max-width: 768px) {
  .left {
    font-size: 2.8rem !important;
  }
  .right {
    font-size: 2.7rem !important;
  }
}
@media screen and (max-width: 540px) {
  .left {
    top: 10vw !important;
    font-size: 2.2rem !important;
  }
  .right {
    top: 18vw !important;
    font-size: 2.2rem !important;
  }
}
@media screen and (max-width: 450px) {
  .left {
    font-size: 2rem !important;
    top: 10vw !important;
  }
  .right {
    font-size: 2rem !important;
    top: 18vw !important;
  }
  .carousel-wrapper {
    height: 165px;
  }
}
</style>