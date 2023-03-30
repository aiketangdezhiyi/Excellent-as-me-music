<template>
  <p
    class="honor"
    :style="{
      background,
    }"
  >
    {{ honor }}
  </p>
</template>

<script>
import honorInfo from "@/Information/honor";
export default {
  props: {
    exp: Number,
  },
  created() {
    let obj = null;
    const n = this.exp;
    for (let i = 0; i < honorInfo.length; i++) {
      obj = honorInfo[i];
      if (n >= obj.min && n < obj.max) {
        break;
      }
    }
    this.honor = obj.name;
    this.background = obj.background;
  },
  data() {
    return {
      honor: "",
      background:
        "linear-gradient(to right, rgb(243, 182, 74) 2%, rgb(242, 197, 69) 97%) rgb(243, 182, 74)",
    };
  },
};
</script>

<style lang="less" scoped>
.honor {
  width: 96px;
  line-height: 30px;
  text-align: center;
  height: 30px;
  font-size: 14px;
  box-sizing: border-box;
  color: #fff;
  border-radius: 4px;
  cursor: default;
  transition: 0.5s;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
  }
}
</style>