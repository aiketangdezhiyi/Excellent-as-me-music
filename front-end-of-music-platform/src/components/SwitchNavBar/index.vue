<template>
  <div class="switch-navbar-container p-r">
    <span
      ref="navbarItems"
      class="switch-navbar-item"
      @click="handleClickNavItem($event, item)"
      :class="{
        active: activeId === item.id,
      }"
      v-for="item in navList"
      :key="item.id"
      >{{ item.title }}</span
    >
    <span
      class="switch-line"
      :style="{
        width: lineStyle.width + 'px',
        left: lineStyle.left + 'px',
      }"
    ></span>
  </div>
</template>

<script>
export default {
  props: {
    navList: Array,
    activeId: Number,
  },
  data() {
    return {
      lineStyle: {
        width: 0,
        left: 0,
      },
    };
  },
  mounted() {
    this.initBarState();
  },
  methods: {
    handleClickNavItem(e, item) {
      if (item.id === this.activeId) return;
      this.$emit("change", item);
      this.lineStyle.left = e.target.offsetLeft;
      this.lineStyle.width = e.target.offsetWidth;
    },
    initBarState() {
      const { navbarItems } = this.$refs;
      if (!navbarItems) {
        return;
      }
      let activeIndex = null;
      for (let i = 0; i < this.navList.length; i++) {
        if (this.navList[i].id === this.activeId) {
          activeIndex = i;
          break;
        }
      }
      if (activeIndex === null) {
        return;
      }
      this.lineStyle.left = navbarItems[activeIndex].offsetLeft;
      this.lineStyle.width = navbarItems[activeIndex].offsetWidth;
    },
  },
};
</script>

<style scoped lang="less">
@blue: #377ef9;
.switch-navbar-container {
  height: 46px;
  line-height: 46px;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  position: relative;
  .switch-navbar-item {
    display: inline-block;
    cursor: pointer;
    font-size: 15px;
    margin-right: 10px;
    transition: color 0.3s;
    &.active {
      color: @blue!important;
    }
  }
  .switch-line {
    height: 1px;
    position: absolute;
    background-color: @blue;
    bottom: -1px;
    transition: left 0.3s, width 0.3s;
  }
}
</style>