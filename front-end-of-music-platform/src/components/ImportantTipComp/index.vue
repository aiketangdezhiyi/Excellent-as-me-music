<template>
  <MessageTipComp
        :title="title"
        v-show="showMessage"
        @maskClick="$emit('maskHide')"
        style="cursor: default"
      >
        <template #default>
          <div class="message-tip" style="line-height: normal">
            {{ importantTip }}
          </div>
        </template>
        <template #footer>
          <div class="message-btn-wrapper">
            <ConfirmBtn :loading="confirmLoading" @click="$emit('handleConfirm')" />
            <CancelBtn @click="$emit('maskHide')"  />
          </div>
        </template>
      </MessageTipComp>
</template>

<script>
import MessageTipComp from "@/components/MessageTipComp";
import ConfirmBtn from "@/components/ConfirmBtn";
import CancelBtn from "@/components/CancelBtn";
export default {
  components: {
    MessageTipComp,
    ConfirmBtn,
    CancelBtn,
  },
  props: {
    showMessage: Boolean,
    importantTip: String,
    confirmLoading: Boolean,
    title : {
        type : String,
        default : "重要操作提示"
    }
  }
};
</script>

<style lang="less" scoped>
.message-tip {
  text-align: center;
  padding: 30px 60px;
  font-size: 14px;
  vertical-align: middle;
  width: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.message-btn-wrapper {
  padding-bottom: 30px;
}
</style>