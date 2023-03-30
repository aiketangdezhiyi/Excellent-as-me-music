import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import store from "./store";
import "./styles/reset.less";
import "./styles/myStyle.less";
import "element-ui/lib/theme-chalk/display.css"; // Element 额外提供了一系列类名，用于在某些条件下隐藏元素
import * as utils from "./utils";
import eventBus from "./EventBus";
import api from "@/api";
import "nprogress/nprogress.css";
store.dispatch("User/whoami"); // 验证是否已经登陆过

Vue.prototype.$utils = utils;
Vue.prototype.eventBus = eventBus;
Vue.use(ElementUI); // 注册插件

Vue.prototype.$handleMessage = utils.handleRequestMessage;

Vue.prototype.$api = api;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
