<template >
 
  <div class="login-container" >

    <h3 class="title" >系统登录</h3 >
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="60px" >

      <el-form-item label="账号:" prop="account" >
        <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"
                  @change="onChange" ></el-input >
      </el-form-item >
      <el-form-item label="姓名:" prop="name" >
        <el-input type="text" v-model="ruleForm2.name" auto-complete="off" placeholder="姓名" ></el-input >
      </el-form-item >
      <el-form-item label="密码:" prop="checkPass" >
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"
                  @change="onChange" ></el-input >
      </el-form-item >
      <div class="alert alert-danger" v-if="isError" style="margin-top: 10px;padding: 5px;" >
        {{errorMsg}}!
      </div >
      <div style="text-align: center; margin-left: 20px" >
        <el-button type="primary" style="width:35%;" @click.native.prevent="reset" :loading="logining" >重置</el-button >
        <el-button type="primary" style="width:35%;" @click.native.prevent="login" :loading="logining" >登录</el-button >
      </div >
    </el-form >
  </div >
</template >

<script >

  export default {
	  data() {
		  return {
			  logining: false,
			  submitUrl: HOME + "User/ajaxLogin",
			  ruleForm2: {
				  account: 'admin',
				  name: "管理员",
				  checkPass: 'admin'
			  },
			  rules2: {
				  account: [
					  {message: '请输入账号', trigger: 'blur'},
					  //{ validator: validaePass }
				  ],
				  name: [
					  {required: true, message: '请输入名字', trigger: 'blur'},
//					  {message: '请输入名字', trigger: 'blur'},
					  //{ validator: validaePass }
				  ],
				  checkPass: [
					  {required: true, message: '请输入密码', trigger: 'blur'},
					  //{ validator: validaePass2 }
				  ],
			  },
			  checked: true,
			  isError: false,
			  errorMsg: '',
		  };
	  },
	  methods: {
		  onChange: function () {
			  this.isError = false;
			  this.errorMsg = '';
		  },
		  reset: function () {
			  this.ruleForm2.account = "";
			  this.ruleForm2.name = "";
			  this.ruleForm2.checkPass = "";
		  },

		  login: function () {
			  var _this = this;
			  $.ajax({
				  url: _this.submitUrl,
				  type: 'POST',
				  dataType: 'json',
				  data: this.ruleForm2,
				  success: function (data) {
					  _this.isError = data.status == 0;
					  if (!_this.isError) {
						  sessionStorage.setItem('user', JSON.stringify(data.info));
						  _this.$router.push({path: '/home'});
					  }
					  else {
						  _this.errorMsg = '请输入正确的用户名和密码！'
					  }
				  },
				  error: function (info) {
					  _this.errorMsg = '服务器访问出错！';
					  _this.isError = true;
				  }
			  })
		  },
	  },

	  mounted: function () {

	  },
	  destroyed: function () {
		  console.log("destroyed vue");

	  },
  }

</script >

<style lang="scss" scoped >
  .login-container {
	  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
	  -webkit-border-radius: 5px;
	  border-radius: 5px;
	  -moz-border-radius: 5px;
	  background-clip: padding-box;
	  margin-bottom: 20px;
	  background-color: #F9FAFC;
	  margin: 180px auto;
	  border: 2px solid #8492A6;
	  width: 450px;
	  padding: 35px 35px 15px 35px;
  }

  .title {
	  width: 380px;
	  margin-bottom: 40px;
	  text-align: center;
	  color: #505458;
	  font-weight: bold;
  }
</style >