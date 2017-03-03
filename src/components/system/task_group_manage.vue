<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div>
        <el-col :span="24" class="breadcrumb-container">
            <div class="title">系统管理 / 部门管理</div>
        </el-col>
        <el-col class="well well-lg" style="background-color: white;">

            <el-row >
                <el-col :span="3">
                    <div style="margin-bottom: 10px; font-size: 16px"
                         v-bind:class="{parentPart: activeIndex == -1}"
                         @click="chooseParentPart(partInfo)">{{partInfo.part_id}} {{partInfo.name}}</div>
                    <ul v-show="partInfo.sub_parts.length > 0" style="margin-left: -20px">
                        <li v-for=" (sub, index) in partInfo.sub_parts"
                            style="list-style-type: none; font-size: 15px; margin-top: 10px"
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
                                @click="handleAdd">部门</el-button>
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
                                prop="part_num"
                                label="部门编号">
                        </el-table-column>

                        <el-table-column
                                prop="part_name"
                                label="部门名称">
                        </el-table-column>
                        <el-table-column
                                prop="remark"
                                label="备注">
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
        <el-dialog title="增加部门" v-model="addDialogVisible" size="tiny">
            <el-form :model="form">
                <el-form-item label="所属部门：" :label-width="formLabelWidth">
                    <el-select v-model="form.part_belong" >
                        <el-option
                                v-for="item in allParts"
                                v-bind:value="item.id"
                                v-bind:label="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
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
    </div>
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
                    part_num: "001001",
                    part_name:"杭州服务部",
                    part_belong:"001",
                    remark:"无"
                },
                    {
                        id:1,
                        part_num: "001002",
                        part_belong:"001",
                        part_name:"温州服务部",
                        remark:"无"
                    }
                ],
                //分页
                pageSize: EveryPageNum,//每一页的num
                currentPage:1,
                startRecord: 0,

                //增加对话框
                addDialogVisible: false,
                form: {
                    part_belong:"",
                    part_num: "",
                    part_name: "",
                    remark:""
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
                activePartID: "",
                allParts:[{"name":"迅安","id":"001"}, {"name":"杭州服务部","id":"001001"}, {"name":"温州服务部", "id":"001002"}]
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
                    this.form.part_belong = this.partInfo.part_id;
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
                this.tableData.splice(0, this.tableData.length)

                var temp = [{
                    id:1,
                    part_belong:"001001",
                    part_num: "00100101",
                    part_name:"清洁小组",
                    remark:"无"
                },
                    {
                        id:2,
                        part_belong:"001001",
                        part_num: "00100102",
                        part_name:"维修小组",
                        remark:"无"
                    },
                    {
                        id:3,
                        part_belong:"001001",
                        part_num: "00100102",
                        part_name:"维修小组",
                        remark:"无"
                    },
                    {
                        id:4,
                        part_belong:"001001",
                        part_num: "00100102",
                        part_name:"维修小组",
                        remark:"无"
                    }
                ]
                for(var i=0; i< temp.length; i++) {
                    this.tableData.push(temp[i])
                }
                this.activeIndex = index;
                this.activePartID = part.part_id
                this.form.part_belong = part.part_id
            },
            chooseParentPart(part) {
                this.tableData.splice(0, this.tableData.length)

                var temp = [{
                    id:1,
                    part_num: "001001",
                    part_name:"杭州",
                    part_belong:"001",
                    remark:"无"
                },
                    {
                        id:1,
                        part_num: "001002",
                        part_belong:"001",
                        part_name:"温州",
                        remark:"无"
                    }
                ]
                for(var i=0; i< temp.length; i++) {
                    this.tableData.push(temp[i])
                }
                this.activeIndex = -1;//-1为"第一级"， "0"开始为第二级
                this.activePartID = part.part_id
                this.form.part_belong = part.part_id
            }

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
        font-weight: bold
    }
</style>
