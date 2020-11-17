import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/styles/base.css";
import "./assets/styles/el-reset.css";

// 全局引入
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// 按需引入
// import { Carousel,CarouselItem } from "element-ui"
// 注册组件
// Vue.component('el-carousel',Carousel)
// Vue.component('el-carousel-item',CarouselItem)

// 路由前置钩子(导航守卫)
router.beforeEach((to, from, next) => {
  // 用户登入后,localStorage中有token
  let token = localStorage.getItem("qf2006-token");
  if (token) {
    // 如果是登入页或注册页直接放行
    next();
  } else {
    // 没token
    if (to.path === "/login") {
      next();
    } else {
      // 访问的不是登入页,跳转到登入页
      next({ path: "/login" });
    }
  }
});

// Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
