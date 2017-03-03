<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div>
    <div class="main">
      <el-col>
        <el-menu :default-active="subActiveIndex" theme="dark">

          <el-menu-item index="1" @click="trainStyle">车型管理</el-menu-item>
          <el-menu-item index="2" @click="guDao">股道管理</el-menu-item>
          <el-menu-item index="3" @click="xiuCheng">修程管理</el-menu-item>
          <el-menu-item index="4" @click="trainNum">车列号管理</el-menu-item>
          <el-menu-item index="5" @click="workContent">作业内容</el-menu-item>
          <el-menu-item index="6" @click="maintain">故障维护</el-menu-item>
          <el-menu-item index="7" @click="statusReport">情况说明</el-menu-item>

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
            trainStyle() {
                router.push("/home/basic_data/train_style")
            },
            guDao() {
                router.push("/home/basic_data/gudao")
            },
            xiuCheng() {
                router.push("/home/basic_data/xiucheng")
            },
            trainNum() {
                router.push("/home/basic_data/train_num")
            },
            workContent() {
                router.push("/home/basic_data/task_content")
            },
            maintain() {
                router.push("/home/basic_data/maintain")
            },
            statusReport() {
                router.push("/home/basic_data/status_report")
            }

        },
        computed: {

        },
        created: function () {
            this.subActiveIndex = "1"
            router.push("/home/basic_data/train_style")
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
