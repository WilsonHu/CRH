<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div>
    <div class="main">
      <el-col>
        <el-menu :default-active="subActiveIndex" theme="dark">
          <el-submenu index="1">
            <template slot="title">作业计划</template>
            <el-menu-item index="1-1" @click="addWork">添加作业计划</el-menu-item>
            <el-menu-item index="1-2" @click="manageWork">作业计划管理</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">作业操作</template>
            <el-menu-item index="2-1" @click="workOperate">作业操作</el-menu-item>
            <el-menu-item index="2-2" @click="trainData">一车一档查询</el-menu-item>
            <el-menu-item index="2-3" @click="statistics">动车组滤网布工作量统计</el-menu-item>
            <el-menu-item index="2-4" @click="statisticsManage">动车组滤网布统计管理</el-menu-item>
          </el-submenu>
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
    name:"work",
    components: {},
    data () {
      return {
          subActiveIndex:'1-1'
      }
    },
    methods: {
        addWork: function () {
          _this.$router.push("/home/task/add_task")
        },
        manageWork: function () {
          _this.$router.push("/home/task/manage_task")
        },
        workOperate: function () {
          _this.$router.push("/home/task/task_operate")
        },
        trainData: function () {
          _this.$router.push("/home/task/train_data")
        },
        statistics: function () {
          _this.$router.push("/home/task/statistics")
        },
        statisticsManage: function () {
          _this.$router.push("/home/task/statistics_manage")
        }

    },
    computed: {

    },
    created: function () {
      _this = this
      _this.$router.push("/home/task/add_task")
    },
    mounted: function () {

    },
  }

</script>
<style>
  .main {
    background: #324057;
    position: absolute;
    top: 120px;
    width: 210px;
    bottom: -100px;
  }
  .content-container {
    background-color: #f1f2f7;
    border-width: 2px;
    position: absolute;
    right: 0px;
    top:120px;
    bottom: -100px;
    left: 210px;
    /*overflow-y: scroll;*/
    /*padding: 20px;*/
  }
</style>
