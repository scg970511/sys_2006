<template>
  <div class="subMenu">
    <div v-for="item in sideMenu" :key="item.id">
      <!-- 具有子菜单 -->
      <el-submenu index="1"
                  v-if="item.children&&item.children.length>0">
        <template slot="title">
          <i :class="item.meta.icon"
             style="margin-right:10px;font-size:20px"></i>
          <span slot="title">{{item.meta.name}}</span>
        </template>
        <el-menu-item-group>
          <sub-menu :sideMenu="item.children"
                    :parentPath="'/'+item.path"></sub-menu>
        </el-menu-item-group>
      </el-submenu>
      <!-- 常规菜单 -->
      <el-menu-item v-else
                    :index="parentPath+'/'+item.path"
                    @click="jumpRoute(item.name)">
        <i :class="item.meta.icon"
           style="margin-right:10px;font-size:20px"></i>
        <span slot="title">{{item.meta.name}}</span>
      </el-menu-item>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'sub-menu', // 给组件取名字之后 可以递归
    props: {
      parentPath: {
        type: String,
        default: ""
      },
      sideMenu: {
        type: Array,
        default: () => [] // 定义默认数据
      }
    },
    data() {
      return {
        isCollapse: false
      }
    },
    methods: {
      jumpRoute(name) {
        this.$router.push({ name })
      }
    },
    mounted() {

    }
  }
</script>
<style>
  i.iconfont {
    color: #4e5bf8;
  }
</style>
