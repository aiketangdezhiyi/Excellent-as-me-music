<template>
  <MyTeleport selector="body">
    <template>
      <MessageTipComp
        title="删除提示"
        v-show="showMessage"
        @maskClick="$emit('maskHide')"
        style="cursor: default"
      >
        <template #default>
          <div class="message-tip" style="line-height: normal">
            {{ deleteTip }}
          </div>
        </template>
        <template #footer>
          <div class="message-btn-wrapper">
            <ConfirmBtn :loading="confirmLoading" @click="$emit('handleConfirmDelete')" />
            <CancelBtn @click="$emit('maskHide')" :deleteTip="deleteTip" />
          </div>
        </template>
      </MessageTipComp>
    </template>
  </MyTeleport>
</template>

<script>
import MessageTipComp from "@/components/MessageTipComp";
import ConfirmBtn from "@/components/ConfirmBtn";
import CancelBtn from "@/components/CancelBtn";
import MyTeleport from "@/components/MyTeleport";
export default {
  components: {
    MessageTipComp,
    ConfirmBtn,
    CancelBtn,
    MyTeleport,
  },
  props: {
    showMessage: Boolean,
    deleteTip: String,
    confirmLoading: Boolean,
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