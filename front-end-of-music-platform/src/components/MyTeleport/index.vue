<template>
  <div class="teleport-container" style="position:relative;z-index:1024">
    <slot></slot>
  </div>
</template>

<script>
// 手写一个vue3的Teleport
export default {
    props : {
        selector : {
            type : String,
            default : "body"
        }
    },
    mounted() {
        if(this.selector === "body") {
            // 直接挂载到body
            document.body.appendChild(this.$el);
        } else {
            document.querySelector(this.selector).appendChild(this.$el);
        }
    }
};
</script>


<style lang="less" scoped>
</style>