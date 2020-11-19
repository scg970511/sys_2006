<template>
  <div class="home-page">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200">
        <div class="gl">
          <span>9527</span>
        </div>
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          :router="true"
          :collapse="isCollapse"
        >
          <qf-sub-menu :sideMenu="menuList"></qf-sub-menu>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 头部区 -->
        <el-header>
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <i
                  class="iconfont icon-zhankai"
                  @click="isCollapse = !isCollapse"
                ></i>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">
                监狱管理系统
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-avatar
                  :size="40"
                  fit="fit"
                  src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3417121378,1487501826&fm=26&gp=0.jpg"
                >
                </el-avatar>
                <span>欢迎监狱长：</span>
                <b class="nickname">{{ userInfo.nickname }}</b>
                <span class="quit" @click="quit">退出</span>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <!-- 主体区 -->
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Welcome' }"
              >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item
              :to="{ path: crumbs.path }"
              v-for="crumb in crumbs"
              :key="crumb.index"
            >
              {{ crumb.meta.name }}
            </el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
// import { getLoginLog } from "@/api";
import { mapState } from "vuex";
import subMenu from "../../components/subMenu";
export default {
  components: { subMenu },
  data() {
    return {
      isCollapse: false
    };
  },
  computed: {
    ...mapState(["userInfo", "menuList", "crumbs"])
  },
  methods: {
    quit() {
      // 退出登入
      // 1、清除token和userInfo
      // 2、跳转到登入页

      localStorage.removeItem("qf2006-token");
      localStorage.removeItem("qf2006-userInfo");

      this.$router.push("/login");
      // 刷新页面
      window.location.reload();
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted() {
    // getLoginLog()
    // .then(res => {
    //   // console.log(res);
    // });
  }
};
</script>
<style>
.icon-zhankai {
  color: aqua;
}
.quit {
  cursor: pointer;
  color: greenyellow;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #fff;
  color: black;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

/* header */
.el-header {
  background-color: lightcoral;
}
.el-avatar {
  vertical-align: middle;
  margin-right: 10px;
}
.el-row {
  height: 60px;
  background-color: lightcoral;
  margin-bottom: 20px;
}
.el-row .last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  background-color: lightcoral;
}
.row-bg {
  /* padding: 10px 0; */
  background-color: lightcoral;
}
</style>
