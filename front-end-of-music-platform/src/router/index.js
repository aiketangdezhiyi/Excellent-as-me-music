import Vue from "vue";
import VueRouter from "vue-router";
import routerConfig from "@/router/routerConfig";
import NProgress from "nprogress";
NProgress.configure({
  showSpinner: false,
});
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: routerConfig,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});
export default router;
