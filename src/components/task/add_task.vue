<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div>
    <el-col :span="24" class="breadcrumb-container">
      <div class="title">作业管理 / 添加作业计划</div>
    </el-col>

    <el-col class="well well-lg" style="background-color: white;">
      <el-form :inline="true" :model="form" class="demo-form-inline">

          <div class="col-sm-3">
            <el-form-item label="作业日期：">
              <el-date-picker
                      v-model="form.date_value"
                      type="date"
                      placeholder="请选择日期"
                      style="width: 222px">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="作业时间："  >
              <el-time-picker
                      v-model="form.time_value"
                      placeholder="请选择时间"
                      style="width: 222px">
              </el-time-picker>
            </el-form-item>
          </div>
          <div class="col-sm-3">
            <el-form-item label="股道：">
              <el-select v-model="form.station_track" placeholder="选择股道" style="width: 222px">
                <el-option v-for="item in stationStack" :label="item.station_track_no" :value="item.station_track_no"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item  label="车次：" >
              <el-input v-model="form.trainNum" style="width: 222px"></el-input>
            </el-form-item>
          </div>
          <div class="col-sm-3">
            <el-form-item label="车列号：">
              <el-select v-model="form.train_column" filterable placeholder="搜索车列号" style="width: 222px">
                <el-option
                        @change="handleSelect(item)"
                        v-for="item in trainColumn"
                        :label="item.train_column"
                        :value="item.id">
                </el-option>
              </el-select>
              <!--<el-autocomplete-->
                      <!--v-model="form.train_column"-->
                      <!--placeholder="搜索车列号"-->
                      <!--icon="search"-->
                      <!--@select="handleSelect"-->
                      <!--style="width: 222px;"-->
              <!--&gt;</el-autocomplete>-->
            </el-form-item>
            <el-form-item  label="修程：">
              <el-select v-model="form.repair_id" placeholder="选择修程" style="width: 222px;margin-left: 13px">
                <el-option v-for=" item in repairInfo" :label="item.name" :value="item.id">

                </el-option>

              </el-select>
            </el-form-item>
          </div>
          <div class="col-sm-3">
            <el-form-item label="车型：">
              <el-form-item >
                <el-input v-model="form.train_model" style="width: 222px; margin-left: 28px" :disabled="true"></el-input>
              </el-form-item>
            </el-form-item>
            <el-form-item label="车列编组：">
              <el-form-item>
                <el-input v-model="form.train_group" style="width: 222px" :disabled="true"></el-input>
              </el-form-item>
            </el-form-item>
          </div>
        <div class="col-sm-3">
          <el-form-item  label="作业组别：" >
            <el-select v-model="form.task_group_no" placeholder="选择组别" style="width: 222px">
              <el-option v-for="item in taskGroup" :label="item.task_group_name" :value="item.task_group_no"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="col-sm-12">
          <div class="col-sm-3">
            <el-form-item  label="作业内容：" style="margin-left: -15px">
              <div class="panel panel-default"  style="margin-top: 10px; background-color: #F9FAFC; width: 222px;overflow-y:scroll; ">
                <ul style="margin-left: 0px;padding-left: 0px; height: 300px" >
                  <li v-for="(item,index) in taskContent" style="list-style-type:none; margin-left: 10px">
                    <el-checkbox style="font-weight: normal" @change="parentCheck(item)">{{item.task_content}}</el-checkbox>
                  </li>
                </ul>
              </div>
            </el-form-item>
          </div>
          <div class="col-sm-3">
            <el-form-item  label="已选：" style="margin-left: -5px">
              <div class="panel panel-default"  style="margin-top: 10px; background-color: #F9FAFC; width: 222px;overflow-y:scroll; "
                   v-if="form.choosedContent.length > 0">
                <ul style="margin-left: 0px;padding-left: 0px; height: 300px" >
                  <li v-for="(item,index) in form.choosedContent" style="list-style-type:none; margin-left: 10px">
                    <el-tag style="margin-left: 3px; font-size: 14px" type="primary">{{item.task_content}}</el-tag>
                  </li>
                </ul>
              </div>
              <div v-else style="color: #FF4949">暂无作业内容~</div>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div class="col-sm-3" style="display: inline; text-align: center">
        <el-button style="margin-right: 10px; width: 100px;">返回</el-button>
        <el-button type="primary"  style="width: 100px">确认</el-button>
      </div>
    </el-col>
  </div>
</template>

<script>
  import Vue from 'vue'
  let _this
  export default {
    name:"add_work",
    components: {},
    data () {
      _this = this;
      return {
        fetchSubDepartmentsURL:HOME + "DepartmentInfo/fetchSubDepartments",
        fetchRepairInfoURL:HOME + "RepairInfo/getRecords",
        fetchDepartRelInfoURL:HOME + "TaskPlan/fetchDepartRelInfo",
        fetchTrainColumnsURL:HOME + "TrainColumn/getRecords",

        form: {
          user: '',
          region: '',
          date_value: Date.now(),
          time_value: "",
          station_track: "",
          trainNum:'2',
          train_column: "",
          train_group: "",
          repair_id: "",
          task_group_no: "",
          choosedContent:[],
        },
        department:[],//部门
        repairInfo:[],//修程
        stationStack:[],//股道
        taskGroup:[],//作业小组
        taskContent:[],//作业内容
        trainColumn:[],//车列号相关
      }
    },
    methods: {
//      loadAll() {
//        return [
//          { "id": "1", "train_model": "车型一", "train_group": "车组一", "value": "车列号一"},
//          { "id": "2", "train_model": "车型二", "train_group": "车组二", "value": "车列号二"},
//          { "id": "3", "train_model": "车型三", "train_group": "车组三", "value": "车列号三"},
//        ];
//      },
//      querySearchAsync(queryString, cb) {
//        var trainLineNumbers = this.trainLineNumbers;
//        var results = queryString ? trainLineNumbers.filter(this.createStateFilter(queryString)) : trainLineNumbers;
//
//        clearTimeout(this.timeout);
//        this.timeout = setTimeout(() => {
//          cb(results);
//        }, 1000 * Math.random());
//      },
//      createStateFilter(queryString) {
//        return (state) => {
//          return (state.value.indexOf(queryString.toLowerCase()) === 0);
//        };
//      },
      handleSelect(item) {
        console.log(item);
        this.form.train_model = item.train_model;
        this.form.train_group = item.train_group;
      },

      //选择作业内容
      parentCheck(item) {
        var exist = false
        for(let i=0; i< this.form.choosedContent.length; i++) {
            if(this.form.choosedContent[i].id == item.id) {
                this.form.choosedContent.splice(i, 1);
                exist = true;
                break;
            }
        }
        if( !exist) {
            this.form.choosedContent.push(item)
        }
      },

      fetchRepairInfo() {
        $.ajax({
          url: _this.fetchRepairInfoURL,
          type: 'GET',
          success: function (data) {
            _this.isError = data.status == 0;
            if (!_this.isError) {
              //TODO:
              _this.repairInfo = data.info
            } else {
              showMessage(_this, '获取修程信息失败！', 0);
            }
          },
          error: function (info) {
            showMessage(_this, '服务器访问出错！', 0);
          }
        })
      },

      fetchDepartmentRelatedInfo() {
        $.ajax({
          url: _this.fetchDepartRelInfoURL,
          type: 'POST',
          dataType: 'json',
          data: {"department_no": _this.currentDepartmentStr},
          success: function (data) {
            _this.isError = data.status == 0;
            if (!_this.isError) {
              //TODO:
              _this.stationStack = data.info.station_stack;
              _this.taskGroup = data.info.task_group;
              _this.taskContent = data.info.task_content;
              _this.trainColumn = data.info.train_column;
            } else {
              showMessage(_this, '获取部门相关信息失败！', 0);
            }
          },
          error: function (info) {
            showMessage(_this, '服务器访问出错！', 0);
          }
        })
      },
    },
    computed: {
      currentDepartmentStr(){
        let $res = "";

        if(this.userInfo.department_no == "001") {
          $res = "";//返回全部
        } else{
          $res = this.userInfo.department_no;
        }
        return $res;
      }
    },
    created: function () {
      this.userInfo = JSON.parse(sessionStorage.getItem('user'));
      //根据用户获取部分信息
      if (this.userInfo != null && this.userInfo.department_no != "001") {
        //非公司管理员
        this.department.push({"department_no":this.userInfo.department_no, "department_name":this.userInfo.department_name})
      } else{
        $.ajax({
          url: _this.fetchSubDepartmentsURL,
          type: 'GET',
          success: function (data) {
            _this.isError = data.status == 0;
            if (!_this.isError) {
              //TODO:
              _this.department = data.info
//                            console.log(data.info)
            } else {
              showMessage(_this, '获取服务部信息失败！', 0);
            }
          },
          error: function (info) {
            showMessage(_this, '服务器访问出错！', 0);
          }
        })
      }

      //获取修程信息（与部门无关）
      this.fetchRepairInfo();
      this.fetchDepartmentRelatedInfo()
    },
    mounted: function () {
//      this.trainLineNumbers = this.loadAll();
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
    font-weight: bold;
  }
</style>
