<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div>
    <el-col :span="24" class="breadcrumb-container">
      <div class="title">作业管理 / 作业计划管理</div>
    </el-col>

    <el-col class="well well-lg" style="background-color: white;">

      <el-form :inline="true" :model="form">

        <el-col :span="6">
          <el-form-item  label="车列号：">
            <el-input v-model="form.trainNum" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item  label="股道：">
            <el-input  style="width: 200px; margin-left: 15px"></el-input>
          </el-form-item>
        </el-col>
        <el-col  :span="8">
          <el-form-item  label="作业日期：">
            <el-date-picker
                    format="yyyy-MM-dd"
                    v-model="form.workDate"
                    type="daterange"
                    placeholder="选择日期范围">
            </el-date-picker>
            <el-button type="primary" @click="toToday" >今天</el-button>
          </el-form-item>
          <el-form-item  label="修程：">
            <el-input style="width: 220px; margin-left: 28px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item  label="部门：">
            <el-select  placeholder="选择部门" style="width: 200px">
              <el-option label="部门一" value="1"></el-option>
              <el-option label="部门二" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item  label="状态：">
            <el-select  placeholder="选择状态" style="width: 200px">
              <el-option label="未开始" value="1"></el-option>
              <el-option label="工作中" value="2"></el-option>
              <el-option label="已完成" value="2"></el-option>
              <el-option label="计划取消" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="search" @click="search" >搜索</el-button>
        </el-col>
      </el-form>
      <el-table
              :data="tableData"
              border
              style="width: 100%">
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
        <el-table-column
                width="80"
                prop="train_num"
                label="车次">
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
                prop="content"
                label="作业内容">
        </el-table-column>
        <el-table-column
                width="100"
                prop="group"
                label="作业组别">
        </el-table-column>
        <el-table-column
                width="80"
                prop="status"
                label="状态">
        </el-table-column>
        <el-table-column label="操作" width="225">
          <template scope="scope">
            <el-button
                    size="small"
                    type="primary"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
                    size="small"
                    type="warning"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">取消</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="text-align: center">
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
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name:"manage_work",
    components: {},
    data () {
      return {
        form: {
          trainNum: '2',
          workDate: [Date.now(),Date.now()]
        },
        tableData: [{
          id:1,
          date: '2016-05-02',
          time: '18:55:55',
          train_num: 2,
          train_line: 8,
          train_style: "L380",
          gudao: 2,
          xiucheng: 3,
          content: "车皮清理",
          group: "机修一组",
          status: "未开始"
        },{
          id:2,
          date: '2016-05-02',
          time: '18:55:55',
          train_num: 2,
          train_line: 8,
          train_style: "L380",
          gudao: 2,
          xiucheng: 3,
          content: "车皮清理",
          group: "机修一组",
          status: "未开始"
        },{
          id:3,
          date: '2016-05-02',
          time: '18:55:55',
          train_num: 2,
          train_line: 8,
          train_style: "L380",
          gudao: 2,
          xiucheng: 3,
          content: "车皮清理",
          group: "机修一组",
          status: "未开始"
        },{
          id:4,
          date: '2016-05-02',
          time: '18:55:55',
          train_num: 2,
          train_line: 8,
          train_style: "L380",
          gudao: 2,
          xiucheng: 3,
          content: "车皮清理",
          group: "机修一组",
          status: "已完成"
        },],
        //分页
        pageSize: EveryPageNum,//每一页的num
        currentPage:1,
        startRecord: 0,
      }
    },
    methods: {
      toToday(){
        this.form.workDate = [Date.now(),Date.now()]
      },
      search() {

      },
      handleSizeChange(val) {
//        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.startRecord = this.pageSize * (this.currentPage -1)
//        this.onSearchDetailData();
//        console.log(`当前页: ${val}`);
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

</style>
