<template>
  <div>
    <Navbar v-if="showComponent(0)" />
    <MyCarousel v-if="showComponent(0)" />
    <UploaderList v-if="showComponent(1)" />
    <Song v-if="showComponent(2)" />
    <Star v-if="showComponent(3)" />
    <Footer v-if="showComponent(5)" />
  </div>
</template>

<script>
import Navbar from "./components/navbar";
import MyCarousel from "./components/carousel";
import UploaderList from "./components/uploaderList";
import Song from "./components/song";
import Star from "./components/star";
import Footer from "./components/footer";
import deferMixins from "@/mixins/defer";
export default {
  components: {
    Navbar,
    MyCarousel,
    UploaderList,
    Song,
    Star,
    Footer,
  },
  mixins: [deferMixins(6)],
};
</script>

<style lang="less" scoped>
</style>