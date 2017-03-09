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
    var _this

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
              _this.$router.push("/home/basic_data/gudao")
            },
            xiuCheng() {
              _this.$router.push("/home/basic_data/xiucheng")
            },
            trainNum() {
              _this.$router.push("/home/basic_data/train_num")
            },
            workContent() {
              _this.$router.push("/home/basic_data/task_content")
            },
            maintain() {
              _this.$router.push("/home/basic_data/maintain")
            },
            statusReport() {
              _this.$router.push("/home/basic_data/status_report")
            }

        },
        computed: {

        },
        created: function () {
          _this = this
          this.subActiveIndex = "1"
          _this.$router.push("/home/basic_data/train_style")
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
