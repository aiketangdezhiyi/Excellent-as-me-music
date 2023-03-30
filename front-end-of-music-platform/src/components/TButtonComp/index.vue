<template >
  <button class="navbar-toggle">
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
  </button>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.navbar-toggle {
  display: none;
  background-color: transparent;
  border: 1px solid #eee;
  border-radius: 4px;
  outline: none;
  padding: 10px;

  cursor: pointer;
  .icon-bar {
    display: block;
    width: 27px;
    height: 3px;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 1px;
    margin-top: 4px;
    &:nth-child(1) {
      margin-top: 0;
    }
  }
}
@media screen and(max-width:720px) {
  .navbar-toggle {
    display: block;
  }
}
</style>