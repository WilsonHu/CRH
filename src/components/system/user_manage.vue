<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <el-col>
        <el-col :span="24" class="breadcrumb-container">
            <div class="title">系统管理 / 用户管理</div>
        </el-col>
        <el-col class="well well-lg" style="background-color: white;">

            <el-row >
                <el-col :span="3">
                    <div style="margin-bottom: 10px; font-size: 16px; cursor: pointer"
                         v-bind:class="{parentPart: activeIndex == -1}"
                         @click="chooseParentPart(partInfo)">{{partInfo.part_id}} {{partInfo.name}}</div>
                    <ul v-show="partInfo.sub_parts.length > 0" style="margin-left: -20px">
                        <li v-for=" (sub, index) in partInfo.sub_parts"
                            style="list-style-type: none; font-size: 15px; margin-top: 10px;cursor: pointer"
                            v-bind:class="{subPart: activeIndex == index}"
                            @click="chooseSubPart(index, sub)">
                            {{sub.part_id}} {{sub.name}}
                        </li>
                    </ul>
                </el-col>
                <el-col :span="21">
                    <el-form :model="filter"  label-position="right" label-width="60px" >
                        <el-col :span="5">
                            <el-form-item label="姓名:">
                                <el-input  v-model="filter.name" auto-complete="off" ></el-input >
                            </el-form-item >
                        </el-col>
                        <el-col :span="5" style="margin-left: 50px">
                            <el-form-item label="部门:"  >
                                <el-input v-model="filter.part" auto-complete="off" ></el-input >
                            </el-form-item >
                        </el-col>
                    </el-form>
                    <el-col :span="3" style="margin-left: 25px">
                        <el-button
                                icon="search"
                                size="normal"
                                type="primary"
                                @click="search">搜索</el-button>
                    </el-col>
                    <div align="right">
                        <el-button
                                icon="plus"
                                size="normal"
                                type="primary"
                                @click="handleAdd">用户</el-button>
                    </div>

                    <el-table
                            :data="tableData"
                            border
                            style="width: 100%;">
                        <el-table-column
                                width="80"
                                prop="id"
                                label="序号">
                        </el-table-column>
                        <el-table-column
                                prop="account"
                                label="账号">
                        </el-table-column>

                        <el-table-column
                                prop="name"
                                label="姓名">
                        </el-table-column>
                        <el-table-column
                                prop="sex"
                                label="性别">
                        </el-table-column>
                        <el-table-column
                                prop="part"
                                label="部门">
                        </el-table-column>
                        <el-table-column
                                prop="position"
                                label="职位">
                        </el-table-column>
                        <el-table-column
                                prop="phone"
                                label="手机">
                        </el-table-column>
                        <el-table-column
                                prop="short_num"
                                label="短号">
                        </el-table-column>
                        <el-table-column
                                prop="bs"
                                label="BS角色">
                        </el-table-column>
                        <el-table-column
                                prop="cs"
                                label="CS角色">
                        </el-table-column>

                        <el-table-column label="操作" width="150">
                            <template scope="scope">
                                <el-button
                                        size="small"
                                        type="primary"
                                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                <el-button
                                        size="small"
                                        type="danger"
                                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="block" style="text-align: center; margin-top: 20px">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-size="pageSize"
                                layout="prev, pager, next, jumper"
                                :total="100">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </el-col>
        <el-dialog title="添加用户" v-model="addDialogVisible" size="small">
            <el-form :model="form">
                <el-col :span="24">
                    <el-form-item label="所属部门：" :label-width="formLabelWidth">
                        <el-select v-model="form.part_belong" >
                            <el-option
                                    v-for="item in allParts"
                                    v-bind:value="item.part_id"
                                    v-bind:label="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="账号：" :label-width="formLabelWidth">
                        <el-input v-model="form.account" ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="姓名：" :label-width="formLabelWidth">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>


                <el-form-item label="部门编号：" :label-width="formLabelWidth">
                    <el-input v-model="form.part_num" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="部门名称：" :label-width="formLabelWidth">
                    <el-input v-model="form.part_name"></el-input>
                </el-form-item>
                <el-form-item label="备注：" :label-width="formLabelWidth">
                    <el-input v-model="form.remark"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="编辑部门" v-model="modifyDialogVisible" size="tiny">
            <el-form :model="modifyForm">
                <el-form-item label="所属部门：" :label-width="formLabelWidth">
                    <el-input v-model="modifyForm.part_belong" auto-complete="off" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="部门编号：" :label-width="formLabelWidth">
                    <el-input v-model="modifyForm.part_num" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="部门名称：" :label-width="formLabelWidth">
                    <el-input v-model="modifyForm.part_name" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="备注：" :label-width="formLabelWidth">
                    <el-input v-model="modifyForm.remark"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="modifyDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="modifyDialogVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </el-col>
</template>

<script>
    import Vue from 'vue'

    export default {
        name:"part_manage",
        components: {},
        data () {
            return {
                tableData: [{
                    id:1,
                    account: "123456",
                    name: "李四",
                    sex:"男",
                    part:"杭州服务部",
                    position:"管理员",
                    phone:"13888888888",
                    short_num:"5678",
                    bs:"管理员",
                    cs:"管理员",
                },
                    {
                        id:2,
                        account: "123456",
                        name: "张三",
                        sex:"男",
                        part:"温州服务部",
                        position:"管理员",
                        phone:"13888888888",
                        short_num:"5678",
                        bs:"管理员",
                        cs:"管理员",
                    },
                    {
                        id:3,
                        account: "123456",
                        name: "王五",
                        sex:"男",
                        part:"杭州服务部",
                        position:"管理员",
                        phone:"13888888888",
                        short_num:"5678",
                        bs:"管理员",
                        cs:"管理员",
                    },
                ],
                //分页
                pageSize: EveryPageNum,//每一页的num
                currentPage:1,
                startRecord: 0,

                //增加对话框
                addDialogVisible: false,
                form: {
                    part_belong:"",
                    account:"",
                    name:"",


                },
                formLabelWidth: '100px',

                //增加对话框
                modifyDialogVisible: false,
                modifyForm: {
                    part_belong:"",
                    part_num: "",
                    part_name: "",
                    remark:""
                },
                filter:{
                    name:"",
                    part:""
                },
                activeIndex:-1,
                activePartID: "",
                partInfo:{
                    "name":"迅安",
                    "part_id":"001",
                    "part_belong": "",
                    "sub_parts":[
                        {
                            "name":"温州服务部",
                            "part_id":"001002",
                            "part_belong": "001",
                            "sub_parts":[]
                        },
                        {
                            "name":"杭州服务部",
                            "part_id":"001001",
                            "part_belong": "001",
                            "sub_parts":[]
                        }
                    ]
                },
                allParts:[]
            }
        },
        methods: {
            handleSizeChange(val) {
//        console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.startRecord = this.pageSize * (this.currentPage -1)
//        this.onSearchDetailData();
//        console.log(`当前页: ${val}`);
            },
            search() {

            },
            handleAdd() {
                if(this.activePartID == "") {
                    this.activePartID = this.partInfo.part_id;
//                    this.form.part_belong = this.partInfo.part_id;
                }
                if(this.allParts.length == 0) {
                    //如果是母公司，返回全部的部门，否则只返回所属部门
//                    if(this.activePartID == this.partInfo.part_id) {
//                        //不添加母公司（迅安）,因为目
////                    this.allParts.push({"name":this.partInfo.name, "part_id":this.partInfo.part_id});

                        for(var i=0; i< this.partInfo.sub_parts.length; i++) {
                            this.allParts.push({"name":this.partInfo.sub_parts[i].name,"part_id":this.partInfo.sub_parts[i].part_id})
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
                this.addDialogVisible = true;
            },

            handleEdit(index, item) {
                this.modifyForm = item;
                this.modifyDialogVisible = true;
            },

            handleDelete(index, item) {

            },
            chooseSubPart(index, part) {
                this.activeIndex = index;
                this.activePartID = part.part_id
                this.form.part_belong = part.part_id
            },
            chooseParentPart(part) {
                this.activeIndex = -1;//-1为"第一级"， "0"开始为第二级
                this.activePartID = part.part_id
                this.form.part_belong = ""
            },

        },
        computed: {

        },
        created: function () {

        },
        mounted: function () {

        },
    }

</script>
<style>
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
</style>
