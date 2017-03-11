<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div>
        <el-col :span="24" class="breadcrumb-container">
            <div class="title">作业管理 / 作业操作</div>
        </el-col>
        <el-col class="well well-lg" style="background-color: white;">
            <el-table   :data="operateTableData"
                        border
                        style="width: 100%"
                        :row-class-name="tableRowClassName"
                        highlight-current-row v-loading="listLoadingOperate" @selection-change="selsChange"
            >
                <el-table-column
                        width="80"
                        prop="id"
                        label="序号">
                </el-table-column>
                <el-table-column
                        width="125"
                        prop="date"
                        label="作业日期">
                </el-table-column>
                <el-table-column
                        width="125"
                        prop="time"
                        label="作业时间">
                </el-table-column>

                </el-table-column>
                <el-table-column
                        width="80"
                        prop="train_line"
                        label="车列号">
                </el-table-column>
                <el-table-column
                        width="80"
                        prop="train_style"
                        label="车型">
                </el-table-column>
                <el-table-column
                        width="80"
                        prop="gudao"
                        label="股道">
                </el-table-column>
                <el-table-column
                        width="80"
                        prop="xiucheng"
                        label="修程">
                </el-table-column>
                <el-table-column
                        width="100"
                        prop="train_group"
                        label="车组类型">
                </el-table-column>
                <el-table-column
                        width="80"
                        prop="status"
                        label="状态">
                </el-table-column>
                <el-table-column label="操作" width="220">
                    <template scope="scope" style="text-align: center">
                        <el-button
                                size="small"
                                type="primary"
                                @click="handleEdit(scope.$index, scope.row)">作业操作</el-button>

                    </template>
                </el-table-column>
            </el-table>
            <br>
            <div class="block" align="center">
                <el-pagination
                        @size-change="handleOperateSizeChange"
                        @current-change="handleOperateCurrentChange"
                        :current-page="currentPageOperate"
                        :page-sizes="[5, 10, 20, 30]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalSizeOperate">
                </el-pagination>
            </div>
            <br>



            <div class="title">作业情况</div>
            <el-table
                    :data="infoTableData"
                    border
                    style="width: 100%"
                    v-loading="listLoadingInfo" @selection-change="selsChange"
                    highlight-current-row>
                <el-table-column
                        prop="list_id"
                        label="序列"
                        min-width="50">
                </el-table-column>
                <el-table-column label="作业信息" style="width:80%">
                    <el-table-column
                            prop="content"
                            label="作业内容"
                            min-width="100">
                    </el-table-column>
                    <el-table-column
                            prop="work_status"
                            label="作业状态"
                            min-width="70">
                    </el-table-column>

                    <el-table-column
                            prop="fault_status"
                            label="故障状态"
                            min-width="70">
                    </el-table-column>
                    <el-table-column
                            prop="fault_explain"
                            label="情况说明"
                            min-width="100">
                    </el-table-column>



                </el-table-column>

                <el-table-column label="作业人员">
                    <el-table-column
                            prop="left_hu"
                            label="沪左"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            prop="right_hu"
                            label="沪右"
                            width="80">
                    </el-table-column>

                    <el-table-column
                            prop="left_hang"
                            label="杭左"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            prop="right_hang"
                            label="杭右"
                            width="80">
                    </el-table-column>
                </el-table-column>

                <el-table-column label="作业组长">
                    <el-table-column
                            prop="leader_hang"
                            label="杭端"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            prop="leader_hu"
                            label="沪端"
                            width="80">
                    </el-table-column>
                </el-table-column>


                <el-table-column label="质检人员">
                    <el-table-column
                            prop="quality_test_hang"
                            label="杭端"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            prop="quality_test_hu"
                            label="沪端"
                            width="80">
                    </el-table-column>
                </el-table-column>
            </el-table>
            <br>
            <div class="block" align="center">
                <el-pagination
                        @size-change="handleInfoSizeChange"
                        @current-change="handleInfoCurrentChange"
                        :current-page="currentPageInfo"
                        :page-sizes="[5, 10, 20, 30]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalSizeInfo">
                </el-pagination>
            </div>
            <br>
        </el-col>
        <!-- 编辑界面 -->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="true" >

            <el-form :model="editForm">
                <div class="col-sm-3">
                    <el-form-item  label="车列号：">
                        <el-input  v-model="editForm.id" readonly="readonly"></el-input>
                    </el-form-item>
                    <el-form-item  label="股  道：">
                        <el-input  v-model="editForm.gudao" readonly="readonly"> </el-input>
                    </el-form-item>

                </div>
                <div class="col-sm-3">

                    <el-form-item  label="作业日期：">
                        <el-input  v-model="editForm.date" readonly="readonly"></el-input>
                    </el-form-item>

                    <el-form-item  label="作业时间：">
                        <el-input  v-model="editForm.time" readonly="readonly"></el-input>
                    </el-form-item>
                </div>
                <div class="col-sm-3">
                    <el-form-item  label="车列号：">
                        <el-input  v-model="editForm.train_line" readonly="readonly"></el-input>
                    </el-form-item>
                    <el-form-item  label="车  型：">
                        <el-input  v-model="editForm.train_style" readonly="readonly"></el-input>
                    </el-form-item>
                </div>
                <div class="col-sm-3">
                    <el-form-item  label="车组类型：">
                        <el-input  v-model="editForm.train_group" readonly="readonly"></el-input>
                    </el-form-item>
                    <el-form-item  label="修  程：">
                        <el-input  v-model="editForm.xiucheng" readonly="readonly"></el-input>
                    </el-form-item>
                </div>
                <div class="col-sm-12">

                    <el-form-item  label="状  态：">
                        <el-input  v-model="editForm.status" readonly="readonly"></el-input>
                    </el-form-item>
                </div>

            </el-form>


            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import Vue from 'vue'
    import VueRouter from 'vue-router'
    // 光引用不成，还得使用
    Vue.use(VueRouter)
    // 引用路由配置文件
    var _this
    import routes from '../../config/routes'
    // 使用配置文件规则
    const router = new VueRouter({
        routes
    })
    export default {
        name:"work_operate",
        components: {},
        data () {
            _this = this;
            return {
                queryWorkOperateUrl:HOME + "taskOperate/getAllOperate",
                queryWorkInfoUrl:HOME + "taskOperate/getAllWorkinfo",
                queryOperateCountUrl:HOME + "taskOperate/getOperateRecordsCount",
                queryInfoCountUrl:HOME + "taskOperate/getInfoRecordsCount",
                operateTableData:[],
                infoTableData:[],
                totalSizeOperate:30,
                totalSizeInfo:20,
                currentPageOperate:1,
                currentPageInfo:2,

                listLoadingOperate: false,
                listLoadingInfo: false,
                sels: [],//列表选中列

                //编辑界面数据
                editForm: {
                    id: 0,
                    gudao: 3,
                    date: "",
                    time: "",
                    train_group: -1,
                    train_line: 1,
                    train_style:1,
                    xiucheng: 1,
                    status:1,

                },
                editFormVisible: false,//编辑界面是否显示
                editLoading: false,

            }
        },
        methods: {
            tableRowClassName(row, index) {
                if (_this.operateTableData[index].status == "未开始") {
                    return 'positive-row';
                }

                return '';
            },
            //获取作业操作
            getWorkOperate() {
                _this.listLoadingOperate = true;

                $.ajax({
                    url: _this.queryWorkOperateUrl,
                    type: 'POST',
                    dataType: 'json',
                    data: null,
                    success: function (data) {
                        if (data.status) {
                            // var dataList = data.info;
                            _this.operateTableData = data.info;
                        }else{

                        }

                        _this.listLoadingOperate = false;

                    }
                })
            },
            getWorkInfo() {
                _this.listLoadingInfo = true;

                $.ajax({
                    url: _this.queryWorkInfoUrl,
                    type: 'POST',
                    dataType: 'json',
                    data: null,
                    success: function (data) {
                        if (data.status) {
                            // var dataList = data.info;
                            _this.infoTableData = data.info;
                        }else{

                        }

                        _this.listLoadingInfo = false;

                    }
                })
            },
            onSearchOperateRecordCounts(){
                $.ajax({
                    url: _this.queryOperateCountUrl,
                    type: 'POST',
                    dataType: 'json',
                    data: null,
                    success: function (data) {
                        if (data.status) {
                            _this.totalSizeOperate = eval(data.info);
                        }
                        _this.getWorkOperate();
                    },
                })
            },
            onSearchInfoRecordCounts(){
                $.ajax({
                    url: _this.queryInfoCountUrl,
                    type: 'POST',
                    dataType: 'json',
                    data: null,
                    success: function (data) {
                        if (data.status) {
                            _this.totalSizeInfo = eval(data.info);
                        }
                        _this.getWorkInfo();
                    },
                })
            },
            handleEdit: function (index, row) {
                _this.editFormVisible = true;
                _this.editForm = _this.operateTableData[index];
            },
            editSubmit:function(){
                _this.editFormVisible = false;
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            handleInfoSizeChange:function (){

            },
            handleInfoCurrentChange:function (){

            },
            handleOperateSizeChange:function (){

            },
            handleOperateCurrentChange:function(){

            },




        },
        computed: {

        },
        created: function () {

        },
        mounted: function () {
            this.onSearchOperateRecordCounts();

            this.onSearchInfoRecordCounts();
        },
    }

</script>
<style>


    .el-table .positive-row {
        background: #ff9797;
    }
</style>

