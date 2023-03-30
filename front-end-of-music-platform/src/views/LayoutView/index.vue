<template>
  <div class="layout-container">
    <Navigator />
    <NarBar />
    <router-view />
  </div>
</template>

<script>
export default {
  components: {
    Navigator: () => import("./Navigator"),
    NarBar: () => import("./NavBar"),
  },
  data() {
    return {
      name: "",
    };
  },
  created() {
    this.name = this.$route.name;
  },
  watch: {
    "$route.name": function (val) {
      this.name = val;
    },
  },
};
</script>

<style scoped>
.layout-container {
  min-width: 1140px;
}
</style>
