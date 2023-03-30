<template>
  <div class="task-list-wrapper">
    <div
      class="p-r content"
      :style="{
        width: size + 'px',
      }"
      v-for="(item, i) in tasks"
      :key="i"
    >
      <ExperienceCircle :size="size">
        <div class="inner flex-center">
          <div>
            <span
              class="big"
              :style="{
                fontSize: item.leftFontSize,
              }"
              >{{ item.leftText }}</span
            ><span
              class="small"
              :style="{
                fontSize: item.rightFontSize,
              }"
              >{{ item.rightText }}</span
            >
          </div>
        </div>
      </ExperienceCircle>
      <p class="task-info">{{ item.titleList[0] }}</p>
      <p class="task-tip">{{ item.titleList[1] }}</p>

      <span v-if="i !== tasks.length - 1" class="line p-a"></span>
    </div>
  </div>
</template>

<script>
import ExperienceCircle from "@/components/ExperienceCircle";
export default {
  components: {
    ExperienceCircle,
  },
  props: {
    tasks: {
      type: Array,
      default: () => [],
    },
    size: {
      type: Number,
      default: 90,
    },
  },
};
</script>

<style lang="less" scoped>
.task-list-wrapper {
  width: 100%;
  .content {
    padding: 0 60px;
    display: inline-block;
    .inner {
      width: 100%;
      height: 100%;
      color: #fff;
      letter-spacing: 1px;
      .big {
        font-size: 30px;
        font-weight: 700;
        display: inline-block;
        transform: translateY(-10px);
      }
      .small {
        font-weight: 700;
        font-size: 18px;
        vertical-align: middle;
      }
    }
    .task-info {
      font-size: 14px;
      color: #222;
      margin-top: 16px;
      width: 100%;
      white-space: nowrap;
      text-align: center;
    }
    .task-tip {
      font-size: 13px;
      color: #99a2aa;
      margin-top: 12px;
      width: 100%;
      text-align: center;
    }
  }

  .line {
    top: 30px;
    right: 0;
    width: 1px;
    height: 74px;
    border-left: 1px solid #e5e9ef;
  }
}
</style>