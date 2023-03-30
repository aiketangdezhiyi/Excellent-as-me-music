<template>
  <div class="task-wrapper">
    <div class="header">
      <span class="header-task-icon"></span>
      <p class="title">优秀如我创享音乐挑战</p>
    </div>
    <div class="task-list">
      <TaskList :tasks="tasks" :size="87"></TaskList>
    </div>
  </div>
</template>

<script>
import TaskList from "./TaskList";
import task from "@/Information/task";
export default {
  components: {
    TaskList,
  },
  data() {
    return {
      tasks: task,
    };
  },
};
</script>

<style lang="less" scoped>
.task-wrapper {
  margin: 20px 27px;
  padding-bottom: 80px;
  .header {
    padding: 10px 15px;
    .header-task-icon {
      display: inline-block;
      width: 30px;
      height: 30px;
      background: url("../../../../assets/icons.png") no-repeat;
      background-position: -145px -18px;
      margin-right: 6px;
      margin-left: 10px;
    }
    .title {
      display: inline-block;
      font-size: 20px;
      color: #222;
      margin-right: 6px;
      vertical-align: top;
    }
  }
  .task-list {
    padding-top: 15px;
  }
}
</style>