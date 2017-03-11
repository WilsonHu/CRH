<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div>
    <el-col :span="24" class="breadcrumb-container">
      <div class="title">作业管理 / 一车一档查询</div>
    </el-col> 
    <el-col :span="24" class="well well-lg">
    <el-form :inline="true" :model="form">
       <div class="col-sm-3">
          <el-form-item  label="车列号：">
            <el-input  v-model="form.id"></el-input>
          </el-form-item>
          <el-form-item  label="股 道 ：">
            <el-input  v-model="form.gudao"> </el-input>
          </el-form-item>
        
        </div>
        <div class="col-sm-3">
          <el-form-item  label="部 门：">
            <el-input  v-model="form.group"></el-input>
          </el-form-item>
          <el-form-item  label="修 程：">
            <el-input v-model="form.xiucheng" ></el-input>
          </el-form-item>
        
        </div>
        <div class="col-sm-5">
          <el-form-item  label="作业日期：">
            <el-col :span="10">
            <el-date-picker
                    v-model="form.workDate"
                    format="yyyy-MM-dd"
                    type="daterange"
                    placeholder="选择日期范围">
            </el-date-picker>
            <el-button type="primary" size="small" @click="toToday" >今天</el-button>

            </el-col>
          </el-form-item>

          <!-- <el-form-item  label="股 道 ："> -->
            <el-button type="primary" icon="search"  @click="onSearchRecordCounts" >搜索</el-button>
          <!-- </el-form-item> -->
        
        </div>
    </el-form>
    <br>
        <el-table   :data="trainTableData"
              border
              style="width: 100%"
           
              highlight-current-row v-loading="listLoading" >
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
            <el-button<!-- 
                    size="small"
                    type="primary"
                    @click="someThing">查看</el-button> -->
            
          </template>
        </el-table-column>
      </el-table> 
      <br>
      <div class="block" align="center">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
        </el-pagination>
      </div>
      <br>


    </el-col>

  </div>
</template>

<script>
  import Vue from 'vue'
  var _this
  export default {
    name:"train_data",
    components: {},
    data () {
      _this = this;
      return {
        form: {
          train_line: '',
          gudao:'',
          train_group:'',
          xiucheng:'',
          workDate: []
        },
        trainTableData:[],
        queryDataUrl: HOME + "TrainData/getTrainData",
        queryCountUrl: HOME + "TrainData/getRecordsCount",
        total: 0,
        page: 1,
        listLoading: false,
        sels: [],//列表选中列
        
        page:1,
      }
    },
    methods: {
      
      //获取作业操作
        getTrainData() {
          _this.listLoading = true;

          $.ajax({
            url: _this.queryDataUrl,
            type: 'POST',
            dataType: 'json',
            data: _this.form,
            success: function (data) {
              if (data.status) {
                // var dataList = data.info;
                _this.trainTableData = data.info;
              }else{
                
              }
                
              _this.listLoading = false;

            }
          })
          // this.$http.get('http://localhost:80/crhservice/home/traindata/gettraindata?id=2',this.form).then(function(res){
          //      this.trainTableData = res.data.info;
          //      this.listLoading = false;
          // },function(res){
              
          // });
      
        },
      toToday(){
        _this.form.workDate = [Date.now(),Date.now()]
      },
      onSearchRecordCounts()
      {
          $.ajax({
            url: _this.queryCountUrl,
            type: 'POST',
            dataType: 'json',
            data: null,
            success: function (data) {
              if (data.status) {
                _this.total = eval(data.info);
              }
              _this.getTrainData();
            },
          })
        },

        handleSizeChange:function (){

        },
        handleCurrentChange:function(){

        },

    },
    computed: {

    },
    created: function () {

    },
    mounted: function () {
      this.onSearchRecordCounts();
      // this.getTrainData();

    },
  }

</script>
<style>

</style>
