<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div>
    <div class="main">
      <el-col>
        <el-menu :default-active="subActiveIndex" theme="dark">

          <el-menu-item index="1" @click="partManage" >部门管理</el-menu-item>
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
  var _this

  export default {
    name:"system",
    components: {},
    data () {
      return {

      }
    },
    methods: {
      partManage() {
        _this.$router.push("/home/system/part_manage")
      },
      userManage() {
        _this.$router.push("/home/system/user_manage")
      },
       taskGroupManage() {
         _this.$router.push("/home/system/task_group_manage")
      },
      roleManage() {
        _this.$router.push("/home/system/role_manage")
      }

    },
    computed: {

    },
    created: function () {
      _this = this
      this.subActiveIndex = "1"
      _this.$router.push("/home/system/part_manage")
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
