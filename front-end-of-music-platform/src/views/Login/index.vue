<template>
  <div class="login-wrapper p-r">
    <div class="content">
      <div class="form-wrapper">
        <div class="title">勿忘我 MUSIC</div>
        <SwitchNavBar class="switch-navbar-containe" @change="handleChange" :navList="navList" :activeId="activeId" />

        <keep-alive :max="2" :include="['login', 'logon']">
          <login v-if="activeId === 1" key="login" />
          <logon @logoned="activeId = 1" v-else key="logon" />
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import login from "./login";
import logon from "./logon";
import SwitchNavBar from "@/components/SwitchNavBar";
import { navList } from "./config";
export default {
  components: {
    login,
    logon,
    SwitchNavBar,
  },
  data() {
    this.navList = navList;
    return {
      isLogin: true,
      activeId: navList[0].id, // 1 账号登录 2 账号注册
    };
  },
  methods: {
    handleChange(item) {
      const { id } = item;
      this.activeId = id;
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./header.less");
@import "~@/styles/myStyle.less";

.login-wrapper {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  background: url("~@/assets/carousel/1.jpg") no-repeat;
  background-repeat: no-repeat;
  background-size: cover;

  .content {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;

    .title {
      text-align: center;
      font-size: 28px;
      padding: 10px 0;
      color: #fff;
      font-weight: 700;
      margin-bottom: 10px;
      color: hsla(0, 0%, 100%, 0.9);
      letter-spacing: 5px;
      border-bottom: 2px solid;
    }
  }

  .form-wrapper {
    position: relative;
    width: 380px;
    margin-top: 15vh;
    align-self: flex-start;
    background: rgba(244, 243, 255, 0.8);
    border-radius: 4px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
    padding: 25px 30px;

    .switch-navbar-containe {
      display: flex;
      justify-content: space-around;
      margin-bottom: 10px;
      border-bottom-color: transparent;

      ::v-deep span {
        color: #fff;
      }
    }

    .type-tab {
      display: block;
      text-align: center;
      font-size: 15px;
      color: #555;
      letter-spacing: 0;
      padding: 10px 0;
      margin-bottom: 10px;

      span {
        cursor: pointer;
        margin-right: 20px;

        &.active {
          color: #1890ff;
        }
      }
    }
  }
}

.bg-enter-active {
  -webkit-transition: 2s;
  transition: 2s;
}

.bg-enter {
  opacity: 0 !important;
}

/deep/ .el-form-item.is-error .el-input__inner,
.el-form-item.is-error .el-input__inner:focus,
.el-form-item.is-error .el-textarea__inner,
.el-form-item.is-error .el-textarea__inner:focus,
.el-message-box__input input.invalid,
.el-message-box__input input.invalid:focus {
  border-color: #dcdfe6;
}</style>