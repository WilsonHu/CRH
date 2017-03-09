<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml" >
    <div >
        <el-col :span="24" class="breadcrumb-container" >
            <div class="title" >系统管理 / 用户管理</div >
        </el-col >
        <el-col class="well well-lg" style="background-color: white;" >

            <el-row >
                <el-col :span="3" >
                    <div style="margin-bottom: 10px; font-size: 16px; cursor: pointer"
                         v-bind:class="{parentPart: activeIndex == -1}"
                         @click="chooseParentPart(partInfo)" >{{partInfo.department_no}} {{partInfo.department_name}}</div >
                    <ul v-show="partInfo.sub_parts.length > 0" style="margin-left: -20px" >
                        <li v-for=" (sub, index) in partInfo.sub_parts"
                            style="list-style-type: none; font-size: 15px; margin-top: 10px;cursor: pointer"
                            v-bind:class="{subPart: activeIndex == index}"
                            @click="chooseSubPart(index, sub)" >
                            {{sub.department_no}} {{sub.department_name}}
                        </li >
                    </ul >
                </el-col >
                <el-col :span="21" >
                    <el-form :model="filters" label-position="right" label-width="60px" >
                        <el-col :span="5" >
                            <el-form-item label="姓名:" >
                                <el-input v-model="filters.name" auto-complete="off" ></el-input >
                            </el-form-item >
                        </el-col >
                        <el-col :span="5" style="margin-left: 50px" >
                            <el-form-item label="部门:" >
                                <el-input v-model="filters.department_name" auto-complete="off" ></el-input >
                            </el-form-item >
                        </el-col >
                    </el-form >
                    <el-col :span="3" style="margin-left: 25px" >
                        <el-button
		                        icon="search"
		                        size="normal"
		                        type="primary"
		                        @click="search" >搜索</el-button >
                    </el-col >
                    <div align="right" >
                        <el-button
		                        icon="plus"
		                        size="normal"
		                        type="primary"
		                        @click="handleAdd" >用户</el-button >
                    </div >

                    <el-table
		                    :data="tableData"
		                    border
		                    style="width: 100%;" >
                        <el-table-column
		                        width="80"
		                        prop="id"
		                        label="序号" >
                        </el-table-column >
                        <el-table-column
		                        prop="account"
		                        label="账号" >
                        </el-table-column >

                        <el-table-column
		                        prop="name"
		                        label="姓名" >
                        </el-table-column >
                        <el-table-column
		                        prop="sex"
		                        label="性别" >
                        </el-table-column >
                        <el-table-column
		                        prop="department_name"
		                        label="部门" >
                        </el-table-column >
                        <el-table-column
		                        prop="work_post"
		                        label="职位" >
                        </el-table-column >
                        <el-table-column
		                        prop="phone"
		                        label="手机" >
                        </el-table-column >
                        <el-table-column
		                        prop="short_number"
		                        label="短号" >
                        </el-table-column >
                        <el-table-column
		                        prop="roleBS_name"
		                        label="B/S角色" >
                            <template scope="scope" >
                                <span >{{scope.row.roleBS_name}}</span >
                            </template >
                        </el-table-column >
                        <el-table-column
		                        prop="roleCS_name"
		                        label="C/S角色" >
                            <template scope="scope" >
                                <span >{{scope.row.roleCS_name}}</span >
                            </template >
                        </el-table-column >

                        <el-table-column label="操作" width="150" >
                            <template scope="scope" >
                                <el-button
		                                size="small"
		                                type="primary"
		                                @click="handleEdit(scope.$index, scope.row)" >编辑</el-button >
                                <el-button
		                                size="small"
		                                type="danger"
		                                @click="handleDelete(scope.$index, scope.row)" >删除</el-button >
                            </template >
                        </el-table-column >
                    </el-table >
                    <div class="block" style="text-align: center; margin-top: 20px" >
                        <el-pagination
		                        @size-change="handleSizeChange"
		                        @current-change="handleCurrentChange"
		                        :current-page="currentPage"
		                        :page-size="pageSize"
		                        layout="prev, pager, next, jumper"
		                        :total="totalRecords" >
                        </el-pagination >
                    </div >
                </el-col >
            </el-row >
        </el-col >
        <el-dialog title="增加用户" v-model="addDialogVisible" size="small" >
            <el-form :model="form" >
                <el-col :span="24" >
                    <el-form-item label="所属部门：" :label-width="formLabelWidth" >
                        <el-select v-model="form.department_no" >
                            <el-option
		                            v-for="item in allParts"
		                            v-bind:value="item.department_no"
		                            v-bind:label="item.department_name" >
                            </el-option >
                        </el-select >
                    </el-form-item >
                </el-col >
                <el-col :span="12" >
                    <el-form-item label="账号：" :label-width="formLabelWidth" >
                        <el-input v-model="form.account" ></el-input >
                    </el-form-item >
                </el-col >
                <el-col :span="12" >
                    <el-form-item label="姓名：" :label-width="formLabelWidth" >
                        <el-input v-model="form.name" ></el-input >
                    </el-form-item >
                </el-col >
                <el-col :span="12" >
                    <el-form-item label="密码：" :label-width="formLabelWidth" >
                        <el-input v-model="form.password" ></el-input >
                    </el-form-item >
                </el-col >
                <el-col :span="12" >
                    <el-form-item label="密码确认：" :label-width="formLabelWidth" >
                        <el-input v-model="form.confirmPwd" ></el-input >
                    </el-form-item >
                </el-col >
                <el-col :span="12" >
                    <el-form-item label="性别：" :label-width="formLabelWidth" >
                        <div style="height: 25px; line-height: 25px" >
                            <el-radio class="radio" v-model="form.sex" label="男" >男</el-radio >
                            <el-radio class="radio" v-model="form.sex" label="女" >女</el-radio >
                        </div >
                    </el-form-item >
                </el-col >
                <el-col :span="12" >
                    <el-form-item label="职务：" :label-width="formLabelWidth" >
                        <el-input v-model="form.work_post" ></el-input >
                    </el-form-item >
                </el-col >
                <el-col :span="12" >
                    <el-form-item label="手机：" :label-width="formLabelWidth" >
                        <el-input v-model="form.phone" ></el-input >
                    </el-form-item >
                </el-col >
                <el-col :span="12" >
                    <el-form-item label="短号：" :label-width="formLabelWidth" >
                        <el-input v-model="form.short_number" ></el-input >
                    </el-form-item >
                </el-col >
                <el-col :span="12" >
                    <el-form-item label="B/S角色：" :label-width="formLabelWidth" >
                        <!--<el-input v-model="form.bs" ></el-input>-->
                        <el-select v-model="form.roleBS_id" >
                            <el-option
		                            v-for="item in allBSTitles"
		                            v-bind:value="item.id"
		                            v-bind:label="item.title" >
                            </el-option >
                        </el-select >
                    </el-form-item >
                </el-col >
                <el-col :span="12" >
                    <el-form-item label="C/S角色：" :label-width="formLabelWidth" >
                        <!--<el-input v-model="form.cs"></el-input>-->
                        <el-select v-model="form.roleCS_id" >
                            <el-option
		                            v-for="item in allCSTitles"
		                            v-bind:value="item.id"
		                            v-bind:label="item.title" >
                            </el-option >
                        </el-select >
                    </el-form-item >
                </el-col >
            </el-form >
	        <el-alert v-if="isError" style="margin-top: 10px;padding: 5px;background-color: #ff9999"
	                  :title="errorMsg"
	                  type="error"
	                  :closable="false"
	                  show-icon >
            </el-alert >
            <div slot="footer" class="dialog-footer" style="margin-bottom: 20px" >
                <el-button @click="addDialogVisible = false" >取 消</el-button >
                <el-button type="primary" @click="onAdd" >确 定</el-button >
            </div >
        </el-dialog >

        <el-dialog title="编辑用户" v-model="modifyDialogVisible" size="small" >
            <el-form :model="modifyForm" >
                <el-col :span="24" >
                    <el-form-item label="所属部门：" :label-width="formLabelWidth" >
                        <el-select v-model="modifyForm.department_no" >
                            <el-option
		                            v-for="item in allParts"
		                            v-bind:value="item.department_no"
		                            v-bind:label="item.department_name" >
                            </el-option >
                        </el-select >
                    </el-form-item >
                </el-col >
                <el-col :span="12" >
                    <el-form-item label="账号：" :label-width="formLabelWidth" >
                        <el-input v-model="modifyForm.account" ></el-input >
                    </el-form-item >
                </el-col >
                <el-col :span="12" >
                    <el-form-item label="姓名：" :label-width="formLabelWidth" >
                        <el-input v-model="modifyForm.name" ></el-input >
                    </el-form-item >
                </el-col >
                <el-col :span="24" >
                    <el-col :span="12" >
                        <el-form-item label="密码：" :label-width="formLabelWidth" >
                            <el-input v-model="modifyForm.password" ></el-input >
                        </el-form-item >
                    </el-col >
                </el-col >
	            <!--<el-col :span="12">-->
	            <!--<el-form-item label="密码确认：" :label-width="formLabelWidth">-->
	            <!--<el-input v-model="modifyForm.confirmPwd"></el-input>-->
	            <!--</el-form-item>-->
	            <!--</el-col>-->
                <el-col :span="12" >
                    <el-form-item label="性别：" :label-width="formLabelWidth" >
                        <div style="height: 25px; line-height: 25px" >
                            <el-radio class="radio" v-model="modifyForm.sex" label="男" >男</el-radio >
                            <el-radio class="radio" v-model="modifyForm.sex" label="女" >女</el-radio >
                        </div >
                    </el-form-item >
                </el-col >
                <el-col :span="12" >
                    <el-form-item label="职务：" :label-width="formLabelWidth" >
                        <el-input v-model="modifyForm.work_post" ></el-input >
                    </el-form-item >
                </el-col >
                <el-col :span="12" >
                    <el-form-item label="手机：" :label-width="formLabelWidth" >
                        <el-input v-model="modifyForm.phone" ></el-input >
                    </el-form-item >
                </el-col >
                <el-col :span="12" >
                    <el-form-item label="短号：" :label-width="formLabelWidth" >
                        <el-input v-model="modifyForm.short_number" ></el-input >
                    </el-form-item >
                </el-col >
                <el-col :span="12" >
                    <el-form-item label="B/S角色：" :label-width="formLabelWidth" >
                        <!--<el-input v-model="modifyForm.bs" ></el-input>-->
                        <el-select v-model="modifyForm.roleBS_id" >
                            <el-option
		                            v-for="item in allBSTitles"
		                            v-bind:value="item.id"
		                            v-bind:label="item.title" >
                            </el-option >
                        </el-select >
                    </el-form-item >
                </el-col >
                <el-col :span="12" >
                    <el-form-item label="C/S角色：" :label-width="formLabelWidth" >
                        <!--<el-input v-model="modifyForm.cs"></el-input>-->
                        <el-select v-model="modifyForm.roleCS_id" >
                            <el-option
		                            v-for="item in allCSTitles"
		                            v-bind:value="item.id"
		                            v-bind:label="item.title" >
                            </el-option >
                        </el-select >
                    </el-form-item >
                </el-col >
            </el-form >
            <el-alert v-if="isError" style="margin-top: 10px;padding: 5px;background-color: #ff9999"
                      :title="errorMsg"
                      type="error"
                      :closable="false"
                      show-icon >
            </el-alert >
            <div slot="footer" class="dialog-footer" style="margin-bottom: 20px" >
                <el-button @click="modifyDialogVisible = false" >取 消</el-button >
                <el-button type="primary" @click="onEidt" >确 定</el-button >
            </div >
        </el-dialog >

        <el-dialog title="提示" v-model="deleteConfirmVisible" size="tiny" >
	  <span >确认要删除账号为[ <b >{{selectedItem.account}}</b > ]的用户吗？</span >
	  <span slot="footer" class="dialog-footer" >
	    <el-button @click="deleteConfirmVisible = false" >取 消</el-button >
	    <el-button type="primary" @click="onConfirmDelete" >确 定</el-button >
	  </span >
	</el-dialog >
    </div >
</template >

<script >
    import Vue from 'vue'
    var _this;
    export default {
	    name: "part_manage",
	    components: {},
	    data () {
		    _this = this;
		    return {
			    addUrl: HOME + "User/addData",
			    editUrl: HOME + "User/modifyData",
			    deleteUrl: HOME + "User/deleteData",
			    queryCountUrl: HOME + "User/getRecordsCount",
			    queryDataUrl: HOME + "User/getRecords",
			    isError: false,
			    errorMsg: '',
			    totalRecords: 0,
			    selectedItem: {},
			    deleteConfirmVisible: false,
			    queryUserRoleUrl: HOME + "UserRole/getRecords",
			    queryDepartmentUrl: HOME + "DepartmentInfo/getRecords",

			    tableData: [],
			    //分页
			    pageSize: EveryPageNum,//每一页的num
			    currentPage: 1,
			    startRecord: 0,

			    //增加对话框
			    addDialogVisible: false,
			    form: {
				    department_no: "",
				    account: "",
				    name: "",
				    password: "",
				    confirmPwd: "",
				    sex: "男",
				    work_post: "",
				    phone: "",
				    short_number: "",
				    roleBS_id: "",
				    roleCS_id: "",
			    },
			    formLabelWidth: '100px',

			    //增加对话框
			    modifyDialogVisible: false,
			    modifyForm: {
				    id: '',
				    department_no: "",
				    account: "",
				    name: "",
				    password: "",
				    confirmPwd: "",
				    sex: "男",
				    work_post: "",
				    phone: "",
				    short_number: "",
				    roleBS_id: "",
				    roleCS_id: "",
			    },
			    filters: {
				    name: "",
				    department_name: ""
			    },
			    activeIndex: -1,
			    activePartID: "",
			    partInfo: {},
			    allParts: [],
			    allBSTitles: [],//根据当前用户的权限返回，服务部只能返回服务部的角色
			    allCSTitles: [],//只有服务部管理员才返回
		    }
	    },
	    methods: {
		    onChange: function () {
			    if (_this.addDialogVisible) {
				    _this.isError = _this.validateForm(_this.form);
			    }
			    else {
				    _this.isError = _this.validateForm(_this.modifyForm);
			    }

		    },
		    handleSizeChange(val) {
//        console.log(`每页 ${val} 条`);
		    },
		    handleCurrentChange(val) {
			    this.currentPage = val;
			    this.startRecord = this.pageSize * (this.currentPage - 1)
			    this.onSearchDetailData();
//        console.log(`当前页: ${val}`);
		    },
		    search() {
			    _this.onSearchRecordCounts();
		    },
		    onSearchDetailData()
		    {
			    _this.filters.startRecord = _this.startRecord;
			    _this.filters.pageSize = _this.pageSize;
			    $.ajax({
				    url: _this.queryDataUrl,
				    type: 'POST',
				    dataType: 'json',
				    data: _this.filters,
				    success: function (data) {
					    if (data.status) {
						    var dataList = data.info;
						    //list.splice(0, 1);//remove 1 element from index 0
						    _this.tableData = dataList;
					    }
				    }
			    })
		    },
		    setPartInfo(list) {
			    _this.partInfo = copyObject(list[0]);
			    _this.partInfo.sub_parts = new Array();
			    for (var i in list) {
				    var item = list[i];
				    if (parseInt(item.id) == 1) {
					    continue;
				    }
				    var obj = {
					    id: item.id,
					    department_no: item.department_no,
					    department_name: item.department_name,
					    sub_parts: [],
					    part_belong: null,
				    };
				    obj.part_belong = copyObject(list[0]);
				    _this.partInfo.sub_parts.push(obj);
			    }
		    },

		    onSearchRecordCounts()
		    {
			    $.ajax({
				    url: _this.queryCountUrl,
				    type: 'POST',
				    dataType: 'json',
				    data: _this.filters,
				    success: function (data) {
					    if (data.status) {
						    _this.totalRecords = parseInt(data.info);
						    _this.onSearchDetailData();
					    }
				    },
			    })
		    },


		    handleAdd() {
			    if (this.activePartID == "") {
				    this.activePartID = this.partInfo.department_no;
				    this.form.part = this.partInfo.department_no;
			    }
			    if (this.allParts.length == 0) {
				    //如果是母公司，返回全部的部门，否则只返回所属部门
//                    if(this.activePartID == this.partInfo.part_id) {
//                        //不添加母公司（迅安）,因为目
				    this.allParts.push({"name": this.partInfo.department_name, "part_id": this.partInfo.department_no});
				    for (var i = 0; i < this.partInfo.sub_parts.length; i++) {
					    this.allParts.push({
						    "name": this.partInfo.sub_parts[i].department_name,
						    "part_id": this.partInfo.sub_parts[i].department_no
					    })
				    }
//                    } else {
//                        for(var i=0; i< this.partInfo.sub_parts.length; i++) {
//                            if(this.activePartID == this.partInfo.sub_parts[i].part_id){
//                                this.allParts.push({"name":this.partInfo.sub_parts[i].name,"part_id":this.partInfo.sub_parts[i].part_id})
//                                break
//                            }
//                        }
//                    }
			    }
			    this.isError = false;
			    this.errorMsg = '';
			    this.addDialogVisible = true;
		    },

		    handleEdit(index, item) {
			    this.isError = false;
			    this.errorMsg = '';
			    this.selectedItem = item;
			    this.modifyForm = copyObject(this.selectedItem);
			    this.modifyForm.department_no = this.partInfo.department_no;
			    this.modifyDialogVisible = true;
		    },

		    handleDelete(index, item) {
			    this.selectedItem = item;
			    if (this.selectedItem) {
				    _this.deleteConfirmVisible = true;
			    }
		    },

		    onConfirmDelete: function () {
			    _this.deleteConfirmVisible = false;
			    $.ajax({
				    url: _this.deleteUrl,
				    type: 'POST',
				    dataType: 'json',
				    data: _this.selectedItem,
				    success: function (data) {
					    if (data.status > 0) {
						    var index = _this.tableData.indexOf(_this.selectedItem);
						    _this.tableData.splice(index, 1);
						    showMessage(_this, '删除成功', 1);
					    } else {
						    showMessage(_this, '删除失败', 0);
					    }
				    },
				    error: function (info) {
					    showMessage(_this, '服务器访问出错', 0);
				    }
			    })
		    },

		    validateForm(formObj)
		    {
			    var iserror = false;
			    if (isStringEmpty(formObj.department_name)) {
				    iserror = true;
				    this.errorMsg = '部门不能为空！';
			    }
			    if (!iserror && isStringEmpty(formObj.department_no)) {
				    iserror = true;
				    this.errorMsg = '部门编号不能为空！';
			    }
			    if (!iserror && (!regIsCorrectDep(formObj.department_no)
					    || formObj.department_no.toString().endsWith('00'))) {
				    iserror = true;
				    this.errorMsg = '部门编号不正确，格式为0010xx的数字！';
			    }
			    return iserror;
		    },

		    onAdd() {
			    _this.isError = this.validateForm(this.form);
			    if (!_this.isError) {
				    $.ajax({
					    url: _this.addUrl,
					    type: 'POST',
					    dataType: 'json',
					    data: _this.form,
					    success: function (data) {
						    _this.isError = data.status == 0;
						    if (!_this.isError) {
							    _this.addDialogVisible = false;
							    _this.onSearchRecordCounts();
							    showMessage(_this, '添加成功', 1);
						    } else {
							    _this.errorMsg = '添加失败';
							    if (!isUndefined(data.info.errorMsg)) {
								    _this.errorMsg = data.info.errorMsg;
							    }
							    showMessage(_this, _this.errorMsg, 0);
						    }
					    },
					    error: function (info) {
						    _this.errorMsg = '服务器访问出错！';
						    _this.isError = true;
					    }
				    })
			    }

		    },
		    onEidt() {
			    this.isError = this.validateForm(this.modifyForm);
			    if (!_this.isError) {
				    $.ajax({
					    url: _this.editUrl,
					    type: 'POST',
					    dataType: 'json',
					    data: _this.modifyForm,
					    success: function (data) {
						    if (!isUndefined(data.info.errorMsg)) {
							    _this.errorMsg = data.info.errorMsg;
							    _this.isError = true;
							    showMessage(_this, _this.errorMsg, 0);//error
						    }
						    else {
							    _this.modifyDialogVisible = false;
							    _this.selectedItem.department_no = _this.modifyForm.department_no;
							    _this.selectedItem.department_name = _this.modifyForm.department_name;
							    _this.selectedItem.comment = _this.modifyForm.comment;

							    showMessage(_this, '修改成功', 1);
						    }
					    },
					    error: function (info) {
						    _this.errorMsg = '服务器访问出错！';
						    _this.isError = true;
					    }
				    })
			    }
		    },

		    chooseSubPart(index, part) {
			    this.activeIndex = index;
			    this.activePartID = part.department_no
			    this.form.part = part.department_no
		    },
		    chooseParentPart(part) {
			    this.activeIndex = -1;//-1为"第一级"， "0"开始为第二级
			    this.activePartID = part.department_no
			    this.form.part = part.department_no
		    },

		    initAllDepart()
		    {
			    $.ajax({
				    url: _this.queryDepartmentUrl,
				    type: 'POST',
				    dataType: 'json',
				    data: {},
				    success: function (data) {
					    if (data.status) {
						    var dataList = data.info;
						    _this.setPartInfo(dataList);
					    }
				    }
			    })
		    },

		    initAllRoles()
		    {
			    $.ajax({
				    url: _this.queryUserRoleUrl,
				    type: 'POST',
				    dataType: 'json',
				    data: {},
				    success: function (data) {
					    if (data.status) {
						    var dataList = data.info;
						    for (var i in dataList) {
							    var newObj =
							    {
								    id: dataList[i].department_no,
								    title: dataList[i].department_name,
							    };
							    if (parseInt(dataList[i].role_type) == 0) {
								    _this.allCSTitles.push(newObj);
							    } else {
								    _this.allBSTitles.push(newObj);
							    }
						    }
					    }
				    }
			    })
		    }

	    },
	    computed: {},
	    filters: {
		    filterBSTitle(id){
			    var result = '';
			    for (let i = 0; i < _this.allBSTitles.length; i++) {
				    if (_this.allBSTitles[i].id == id) {
					    result = _this.allBSTitles[i].title;
					    break
				    }
			    }
			    return result
		    },
		    filterCSTitle(id){
			    var result = '';
			    for (let i = 0; i < _this.allCSTitles.length; i++) {
				    if (_this.allCSTitles[i].id == id) {
					    result = _this.allCSTitles[i].title;
					    break
				    }
			    }
			    return result
		    }
	    },
	    created: function () {
		    var userinfo = JSON.parse(sessionStorage.getItem('user'));
		    if (isNull(userinfo)) {
			    this.$router.push({path: '/Login'});
			    return;
		    }
		    this.modifyForm.department_name = this.form.department_name = userinfo.department_name;
		    this.modifyForm.department_no = this.form.department_no = userinfo.department_no;
		    this.initAllRoles();
		    this.initAllDepart();
	    },
	    mounted: function () {
		    this.onSearchRecordCounts();
	    },
    }

</script >
<style >
    .breadcrumb-container {
	    padding: 15px;
	    background-color: #E5E9F2;
    }

    .title {
	    width: 200px;
	    float: left;
	    color: #475669;
	    font-weight: bold
    }

    .parentPart {
	    width: 200px;
	    color: #475669;
	    font-size: medium;
	    font-weight: bold
    }

    .subPart {
	    width: 200px;
	    color: #475669;
	    font-weight: bold;
    }
</style >
