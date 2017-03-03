<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div>
    <div class="main">
      <el-col>
        <el-menu :default-active="subActiveIndex" theme="dark">

          <el-menu-item index="1" @click="partManage">部门管理</el-menu-item>
          <el-menu-item index="2" @click="userManage">用户管理</el-menu-item>
          <el-menu-item index="3" @click="taskGroupManage">作业小组管理</el-menu-item>
          <el-menu-item index="4" @click="roleManage">角色管理</el-menu-item>

        </el-menu>
      </el-col>
    </div>
    <div class="content-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  // 引用路由
  import VueRouter from 'vue-router'
  // 光引用不成，还得使用

  Vue.use(VueRouter)
  // 引用路由配置文件
  import routes from '../config/routes'
  // 使用配置文件规则
  const router = new VueRouter({
    routes
  })
  export default {
    name:"basic_data",
    components: {},
    data () {
      return {

      }
    },
    methods: {
      partManage() {
        router.push("/home/system/part_manage")
      },
      userManage() {
        router.push("/home/system/user_manage")
      },
       taskGroupManage() {
        router.push("/home/system/task_group_manage")
      },
      roleManage() {
        router.push("/home/system/role_manage")
      }

    },
    computed: {

    },
    created: function () {
      this.subActiveIndex = "1"
      router.push("/home/system/part_manage")
    },
    mounted: function () {

    },
  }

</script>
<style>
  .el-menu-item {
    text-align: center;
  }
</style>
