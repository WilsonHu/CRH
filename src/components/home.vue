<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml" >
  <div >
    <nav class="navbar-inverse header" >
      <div class="container-fluid" >
        <div class="navbar-header head-height" style="font-size: large; font-weight: bolder;color: whitesmoke" >
          动车服务部生产经营管理系统
        </div >
        <ul class="nav navbar-nav navbar-right head-height" style="margin-right: 5px;margin-top: 2px;" >
          <li style="font-size: 14px;color: whitesmoke" >{{current_time}}</li >
        </ul >
        <ul class="nav navbar-nav navbar-right head-height" >
          <li style="margin-top: 5px" ><a href="#"
                                          style="color: whitesmoke; font-weight: bold" >
            <div style="font-size: 20px;color: #3c3c3c;font-weight: bold" >
            <label style="font-size: 16px;color: #f4f4f4;font-style: italic;font-weight: normal" >
               欢迎您
            </label >  {{userinfo.name}}
            <label style="font-size: 16px;color: #f4f4f4;font-weight: normal" >[{{userinfo.department_name}}]</label >
            </div >

          </a ></li >
        </ul >

      </div >
      <div align="left" style="float: right;" >
        <ul class="nav navbar-nav navbar-right head-height" style="margin-right: 10px" >
          <button type="button" class="btn btn-link" v-on:click="logout" style="margin-bottom:8px;color: whitesmoke" >
            <span class="glyphicon glyphicon-log-out" ></span > 退出
          </button >
        </ul >
        <ul class="nav navbar-nav navbar-right head-height" >
          <li ><a href="#" style="color: whitesmoke" >个人信息</a ></li >
        </ul >
      </div >
    </nav >
	  <!--<nav class="nav navbar-default">-->
	  <!--<ul class="nav navbar-nav" >-->
	  <!--<li  v-bind:class="{'active': activeIndex == 1} " v-on:click="workActive">-->
	  <!--<router-link to="/home/work">作业管理</router-link>-->
	  <!--</li>-->
	  <!--<li v-bind:class="{'active': activeIndex == 2} " v-on:click="searchActive">-->
	  <!--<router-link to="/home/search">统计查询</router-link>-->
	  <!--</li >-->
	  <!--<li v-bind:class="{'active': activeIndex == 3} " v-on:click="dataActive">-->
	  <!--<router-link to="/home/data">基础数据</router-link>-->
	  <!--</li >-->
	  <!--<li v-bind:class="{'active': activeIndex == 4} " v-on:click="systemActive">-->
	  <!--<router-link to="/home/system">系统管理</router-link>-->
	  <!--</li >-->
	  <!--</ul >-->
	  <!--<ul class="nav navbar-nav navbar-right" style="margin-right: 10px">-->
	  <!--<li ><a href="#" >退出</a ></li >-->
	  <!--</ul >-->
	  <!--<ul class="nav navbar-nav navbar-right" >-->
	  <!--<li ><a href="#" >个人信息</a ></li >-->
	  <!--</ul >-->
	  <!--</nav>-->

    <div class="nav navbar-default" style="background-color: #324057;" >
      <ul class="nav navbar-nav" >
        <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect"
                 style="background-color: #324057" theme="dark" >
          <el-menu-item index="1" style="font-size: medium" >作业管理</el-menu-item >
          <el-menu-item index="2" style="font-size: medium" >统计查询</el-menu-item >
          <el-menu-item index="3" style="font-size: medium" >基础数据</el-menu-item >
          <el-menu-item index="4" style="font-size: medium" >系统管理</el-menu-item >
        </el-menu >
      </ul >


    </div >

      <div class="modal fade" id="logOutConfirmMsg" role="dialog" >
        <div class="modal-dialog" >
            <!-- Modal content-->
            <div class="modal-content" >
                <div class="modal-header" style="text-align: left" >
                    <h3 >提示</h3 >
                </div >
                <div class="modal-body" style="font-size: 18px;font-family: FontAwesome" >
                    <!-- 加上<form>标签可以使得modal窗口在点击按钮都自动dismiss-->
                    确认要注销登录吗？
                    <button type="button" style="margin-top: 50px;font-size: 16px" class="btn btn-danger btn-block"
                            v-on:click="onConfirmLogOut" >确 定
                    </button >
                </div >
            </div >
        </div >
    </div >
    <router-view ></router-view >

  </div >
</template >

<script >
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
	  name: "home",
	  components: {},
	  data () {
		  return {
			  current_time: '',
			  activeIndex: "1",
			  userinfo: {},
		  }
	  },
	  methods: {
		  getCurrentDate: function () {
			  var cdata = new Date();
			  this.current_time = cdata.toLocaleTimeString("yyyy-MM-dd HH:mm:ss");
		  },

		  logout: function () {
			  $("#logOutConfirmMsg").modal();

		  },
		  onConfirmLogOut: function () {
			  sessionStorage.removeItem('user');
			  router.push("/login");
		  },
//      workActive: function () {
//        this.activeIndex = "1";
//      },
//      searchActive: function () {
//        this.activeIndex = "2";
//      },
//      dataActive: function () {
//        this.activeIndex = "3";
//      },
//      systemActive: function () {
//        this.activeIndex = "4";
//      },

		  handleSelect(key, keyPath) {
			  this.activeIndex = key
			  switch (key) {
				  case "1":
					  router.push("/home/task")
					  break;
				  case "2":
					  router.push("/home/statistic")
					  break;
				  case "3":
					  router.push("/home/basic_data")
					  break;
				  case "4":
					  router.push("/home/system")
					  break;
			  }
		  }

	  },
	  computed: {},
	  created: function () {
		  if (window.location.hash != null) {
			  if (window.location.hash.endsWith("/home/system")) {
				  this.activeIndex = "4"
			  } else if (window.location.hash.endsWith("/home/basic_data")) {
				  this.activeIndex = "3"
			  } else if (window.location.hash.endsWith("/home/statistic")) {
				  this.activeIndex = "2"
			  } else if (window.location.hash.endsWith("/home/task")) {
				  this.activeIndex = "1"
			  }
		  }
	  },
	  mounted: function () {
		  this.userinfo = JSON.parse(sessionStorage.getItem('user'));
		  var _this = this;
		  setInterval(function getDate() {
//              var date = new Date();
//              var y = date.getFullYear();
//              var mon = date.getMonth() + 1;
//              var d = date.getDate();
//              var h = date.getHours();
//              var m = date.getMinutes();
//              var s = date.getSeconds();
//              _this.current_time = y + "-" + mon + "-" + d + " " + h + ":" + m + ":" + s;

			  var date = new Date();
			  _this.current_time = date.format("yyyy-MM-dd hh:mm:ss");
		  }, 1000);//定时器
	  },
  }

</script >
<style >
  .header {
	  height: 60px;
	  line-height: 60px;
	  background: #1D8CE0;
	  color: #c0ccda;
  }
</style >
