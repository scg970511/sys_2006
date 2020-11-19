import Vue from "vue";
import Vuex from "vuex";
import { getMenuList } from "@/api";
// 引入allRoutes
import allRoutes from "../router/allRoutes";
// 引入递归函数
import recursionRoutes from "../utils/recursionRoutes";
// 引入dynamicRoutes
import dynamicRoutes from "../router/dynamicRoutes";
// 引入router
import router from "../router";

Vue.use(Vuex);
// 刷新页面会丢失用户信息,所以要从localStorage中取
let userInfo = localStorage.getItem("qf2006-userInfo") || "{}";

userInfo = JSON.parse(userInfo);

export default new Vuex.Store({
  state: {
    userInfo,
    menuList: [], // 定义用户侧边栏菜单
    crumbs: []
  },
  mutations: {
    // 更改userInfo
    SET_USERINFO(state, payload) {
      state.userInfo = payload;
    },
    SET_MENULIST(state, payload) {
      state.menuList = payload;
      // 动态的将路由添加到routes中,核心方法 router.addRoutes(符合路由配置规则的数据)
      // 1.将menuList赋值给dynamicRoutes的children
      let target = dynamicRoutes.find(item => item.path === "/");
      target.children = [...state.menuList];
      // 2.动态添加路由到route/routes中
      router.addRoutes(dynamicRoutes);
    },
    // 设置面包屑
    SET_CRUMBS(state,payload){
      state.crumbs = payload
    }
  },
  actions: {
    async FETCH_MENULIST({ commit }) {
      // 1.发送请求,获取用户菜单数据
      let userMenu = await getMenuList();
      // 通过allRoutes和请求回来的用户菜单数据进行对比
      // console.log(userMenu);
      let sideMenu = recursionRoutes(allRoutes, userMenu.data.menuList);
      // 3.将结果提交给mutations
      commit("SET_MENULIST", sideMenu);
    }
  },
  modules: {}
});
