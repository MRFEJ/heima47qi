<template>
  <div class="bb">
    <el-card class="box-card1">
      <el-form ref="form" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item prop="subject" label="学科">
          <subjectSeleted :isok="true" v-model="formInline.subject"></subjectSeleted>
        </el-form-item>

        <el-form-item prop="step" label="阶段">
          <el-select v-model="formInline.step" placeholder="请选择阶段">
            <el-option label="全部阶段" value></el-option>
            <el-option label="初级" value="1"></el-option>
            <el-option label="中级" value="2"></el-option>
            <el-option label="高级" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="enterprise" label="企业">
          <enterpriseSeleted :isok="true" v-model="formInline.enterprise"></enterpriseSeleted>
        </el-form-item>

        <el-form-item prop="type" label="题型">
          <el-select v-model="formInline.type" placeholder="请选择题型">
            <el-option label="全部题型" value></el-option>
            <el-option label="单选" value="1"></el-option>
            <el-option label="多选" value="2"></el-option>
            <el-option label="简答" value="3"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item prop="difficulty" label="难度">
          <el-select v-model="formInline.difficulty" placeholder="请选择难度">
            <el-option label="全部难度" value></el-option>
            <el-option label="简单" value="1"></el-option>
            <el-option label="一般" value="2"></el-option>
            <el-option label="困难" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="username" label="作者">
          <el-input v-model="formInline.username"></el-input>
        </el-form-item>

        <el-form-item prop="status" label="状态">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="全部状态" value></el-option>
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="create_date" label="日期">
          <el-date-picker v-model="formInline.create_date" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>

        <br />

        <el-form-item prop="title" label="标题" class="title-item">
          <el-input v-model="formInline.title"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="del">清除</el-button>
          <el-button @click="Add" icon="el-icon-plus" type="primary">新增试题</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 底部卡片 -->
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column label="题目">
          <template slot-scope="scope">{{scope.row|titles}}</template>
        </el-table-column>
        <el-table-column label="学科·阶段">
          <template slot-scope="scope">{{scope.row|filt}}</template>
        </el-table-column>
        <el-table-column prop="type" label="题型">
          <template slot-scope="scope">{{scope.row|types}}</template>
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1">启用</span>
            <span v-else style="color:red">禁用</span>
          </template>
        </el-table-column>

        <el-table-column prop="reads" label="访问量"></el-table-column>

        <el-table-column
          prop="date"
          label="操作"
          v-if="['超级管理员', '管理员', '老师'].includes($store.state.Role)"
        >
          <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope.row)" type="text">编辑</el-button>
            <el-button
              size="mini"
              type="text"
              @click="des(scope.row.id)"
            >{{scope.row.status? '禁用':'启用'}}</el-button>
            <el-button
              size="mini"
              type="text"
              @click="remov(scope.row.id)"
              v-if="['超级管理员', '管理员', '老师'].includes($store.state.Role)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="page">
        <el-pagination
          border
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="Page"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="size"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </el-card>

    <!-- 子组件 -->
    <questionAdd ref="questionAdd"></questionAdd>

    <questionEdit ref="questionEdit"></questionEdit>
  </div>
</template>

<script>
// 获取本组件的请求
import {
  questionLisi,
  questionStatus,
  questionRemove
} from "@/api/question.js";
// 导入子组件
import questionAdd from "./components/questionAdd";

import questionEdit from "./components/questionEdit";
export default {
  components: {
    questionAdd,
    questionEdit
  },
  name: "question",
  data() {
    return {
      // 学科列表
      disciplineList: [],
      // 企业列表
      enterpriseList: [],

      // 表单的绑定
      formInline: {},
      // 表格数组
      tableData: [],
      // 当前页
      Page: 1,
      // 总条数
      total: 0,
      // 页容量
      size: 5
    };
  },
  created() {
    // 获取题目列表
    this.list();
  },
  filters: {
    // 阶段
    filt(val) {
      let num = "";
      if (val.step == 1) {
        num = "初级";
      } else if (val.step == 2) {
        num = "中级";
      } else {
        num = "高级";
      }
      return val.subject_name + "·" + num;
    },
    // 题型
    types(val) {
      let num = "";
      if (val.type == 1) {
        num = "单选";
      } else if (val.type == 2) {
        num = "多选";
      } else {
        num = "简答";
      }
      return num;
    },
    // 题目
    titles(val) {
      return val.title.split(">")[1].split("<")[0];
    }
  },
  methods: {
    // 获取题目列表
    list() {
      // 获取题目列表
      questionLisi({
        page: this.Page,
        limit: this.size,
        ...this.formInline
      }).then(res => {
        // window.console.log(res);
        // 获取列表数据
        this.tableData = res.data.data.items;
        // 获取总条数
        this.total = res.data.data.pagination.total;
      });
    },
    // 点击搜索
    search() {
      this.Page = 1;
      this.list();
    },
    // 点击清除
    del() {
      this.$refs.form.resetFields();
      this.Page = 1;
      this.list();
    },
    // 页容量改变事件
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.size = val;
      this.Page = 1;
      this.list();
    },
    // 页码改变事件
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.Page = val;
      this.list();
    },
    // 点击禁用题目
    des(id) {
      questionStatus({ id }).then(() => {
        this.list();
      });
    },
    // 点击删除题目
    remov(id) {
      this.$confirm("此操作将删除该题目, 是否继续?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          questionRemove({ id }).then(() => {
            this.$message.success("删除成功!");
            this.list();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 点击新增题目
    Add() {
      this.$refs.questionAdd.dialogFormVisible = true;
    },
    // 点击编辑
    edit(item) {
      this.$refs.questionEdit.form = { ...item };
      this.$refs.questionEdit.form.city = this.$refs.questionEdit.form.city.split(
        ","
      );
      this.$refs.questionEdit.form.multiple_select_answer = this.$refs.questionEdit.form.multiple_select_answer.split(
        ","
      );
      this.$refs.questionEdit.dialogFormVisible = true;
    }
  }
};
</script>

<style lang="less">
.bb {
  .el-form--inline {
    .el-form-item:not(:last-child) .el-form-item__content {
      width: 150px;
    }

    .el-form-item.title-item .el-form-item__content {
      width: 388px;
    }
    .el-form-item__label {
      padding-right: 31px;
      padding-left: 41px;
    }
    .el-card__body {
      padding-left: 0;
    }
  }

  .box-card {
    margin-top: 19px;
  }
  .el-date-editor.el-input {
    width: 100%;
    cursor: pointer;
  }
  .page {
    text-align: center;
    margin-top: 31px;
  }
}
</style>