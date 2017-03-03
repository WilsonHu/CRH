<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div>
    <el-col :span="22" class="breadcrumb-container">
      <div class="title">基础数据 / 车型管理</div>
    </el-col>
    <el-col :span="2"  style="background-color: #E5E9F2;">
      <el-button
              style="margin-left: 10px;margin-top: 7px; margin-bottom: 7px"
              size="normal"
              type="primary"
              @click="handleAdd">增加</el-button>
    </el-col>
    <el-col class="well well-lg" style="background-color: white;">
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
                prop="train_style"
                label="车型">
        </el-table-column>
        <el-table-column
                prop="dirty_num"
                label="污物箱数（口）">
        </el-table-column>
        <el-table-column
                prop="part"
                label="部门">
        </el-table-column>
        <el-table-column
                width="120"
                prop="character_color"
                label="字体颜色">
          <template scope="scope">
            <div style="background-color: #000000; margin: 5px" >
              <span >{{scope.row.character_color}}</span>
            </div>
          </template>
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
    <el-dialog title="增加车型" v-model="addDialogVisible" size="tiny">
      <el-form :model="form">
        <el-form-item label="车型名称：" :label-width="formLabelWidth">
          <el-input v-model="form.train_style" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="污物箱数：" :label-width="formLabelWidth">
          <el-input v-model="form.dirty_num" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门：" :label-width="formLabelWidth">
          <el-input v-model="form.part" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="颜色：" :label-width="formLabelWidth">
          <el-color-picker v-model="form.character_color"></el-color-picker>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑车型" v-model="modifyDialogVisible" size="tiny">
      <el-form :model="modifyForm">
        <el-form-item label="车型名称：" :label-width="formLabelWidth">
          <el-input v-model="modifyForm.train_style" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="污物箱数：" :label-width="formLabelWidth">
          <el-input v-model="modifyForm.dirty_num" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门：" :label-width="formLabelWidth">
          <el-input v-model="modifyForm.part" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="颜色：" :label-width="formLabelWidth">
          <el-color-picker v-model="modifyForm.character_color"></el-color-picker>
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
    name:"train_style",
    components: {},
    data () {
      return {
        tableData: [{
          id:1,
          train_style:"16辆",
          dirty_num:"4",
          part:"嘉兴",
          character_color:"#555333"
        },
        {
          id:2,
          train_style:"8辆",
          dirty_num:"8",
          part:"诸暨",
          character_color:"#555333"
        },
        {
          id:3,
          train_style:"16辆",
          dirty_num:"4",
          part:"杭州",
          character_color:"#555333"
        },
        {
          id:4,
          train_style:"16辆",
          dirty_num:"4",
          part:"上海",
          character_color:"#555333"
        },
        {
          id:1,
          train_style:"16辆",
          dirty_num:"4",
          part:"嘉兴",
          character_color:"#555333"
        },
        ],
        //分页
        pageSize: EveryPageNum,//每一页的num
        currentPage:1,
        startRecord: 0,

        //增加对话框
        addDialogVisible: false,
        form: {
          train_style: "",
          dirty_num: "",
          part: "诸暨",
          character_color:"#000000"
        },
        formLabelWidth: '100px',

        //增加对话框
        modifyDialogVisible: false,
        modifyForm: {
          train_style: "",
          dirty_num: "",
          part: "诸暨",
          character_color:"#000000"
        },
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
      handleAdd() {
        this.addDialogVisible = true;
      },

      handleEdit(index, item) {
        this.modifyForm = item;
        this.modifyDialogVisible = true;
      },

      handleDelete(index, item) {

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
</style>
