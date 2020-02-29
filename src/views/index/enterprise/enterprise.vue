<template>
  <div class="qie">
    <!-- 上面一个卡片 -->
    <el-card class="box-card">
      <el-form ref="form" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="企业编号" prop="eid">
          <el-input class="short" v-model="formInline.eid"></el-input>
        </el-form-item>

        <el-form-item label="企业名称" prop="name">
          <el-input class="long" v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input class="short" v-model="formInline.username"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-select class="long" v-model="formInline.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="del">清除</el-button>
          <el-button @click="Add" icon="el-icon-plus" type="primary">新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 下面一个卡片 -->
    <el-card class="box-card1">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="eid" label="企业编号"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column label="创建日期">
          <template slot-scope="scope">{{scope.row.create_time|filterData}}</template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1">启用</span>
            <span v-else class="red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="editBj(scope.row)" type="text">编辑</el-button>
            <el-button
              size="mini"
              type="text"
              @click="stop(scope.row.id)"
            >{{scope.row.status? '禁用':'启用'}}</el-button>
            <el-button @click="dels(scope.row.id)" size="mini" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="page">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="size"
          :total="pages"
          layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </el-card>

    <enterpriseCom ref="enterpriseCom"></enterpriseCom>
  </div>
</template>

<script>
// 导入编辑组件
// import enterpriseCom from "./components/enterpriseCom";
// 导入新增企业组件
// import enterpriseCom from "./components/enterpriseCom";
// 获取企业列表和 禁用或开启状态和 删除企业
import { enterprise, status, remove } from "@/api/enterprise.js";

import enterpriseCom from "./components/enterpriseCom";

export default {
  name: "enterprise",
  components: {
    enterpriseCom
  },
  data() {
    return {
      // 页容量
      size: 5,
      // 服务器返回的总条数
      pages: 0,
      // // 当前页码
      currentPage: 1,
      // 表单数据
      formInline: {},
      // 表单数组
      tableData: []
    };
  },

  created() {
    this.list();
  },
  methods: {
    // 点击新增
    Add() {
      this.$refs.enterpriseCom.dialogFormVisible = true;

      this.$refs.enterpriseCom.isCom = true;

      // this.$refs.enterpriseCom.cz();

      this.$refs.enterpriseCom.form = {};
    },
    // 点击编辑
    editBj(item) {
      // window.console.log(item);
      this.$refs.enterpriseCom.dialogFormVisible = true;
      this.$refs.enterpriseCom.isCom = false;

      // 判断是不是第一次点击的那一行 如果不是就赋值 并且保存当前行的数据
      if (item != this.oldItem) {
        // 下面这一行是错误的写法   他直接把item对象赋值给form了  相当于把item对象在内存里面地址赋给了form 这时改了form里面的数据item里面也会改  因为在内存里面他们是同一个地址的
        // this.$refs.enterpriseCom.form =item
        // 把item用es6的语法遍历出来 加上{}就可以赋值给form了
        this.$refs.enterpriseCom.form = { ...item };
        this.oldItem = item;
      }
    },
    // 获取用户列表
    list() {
      enterprise({
        // 传1是代表要服务器 返回第一页的内容
        page: this.currentPage,
        // 传的是要服务器返回每页5条数据
        limit: this.size,
        ...this.formInline
      }).then(res => {
        // window.console.log(res);
        this.tableData = res.data.data.items;
        this.pages = res.data.data.pagination.total;
      });
    },
    // 分页
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      // 改变页容量 把改变的数目重新赋值  并从第一页开始查询
      this.size = val;
      this.currentPage = 1;
      // 发送请求
      this.list();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      // 改变当前页 把请求的当前页码重新赋值 在发送请求
      this.currentPage = val;
      // 发送请求
      this.list();
    },
    // 点击禁用
    stop(id) {
      status({ id }).then(() => {
        this.list();
      });
    },

    // 搜索
    search() {
      // this.currentPage = 1;
      this.list();
    },

    // 清除表单内的数据
    del() {
      this.$refs.form.resetFields();
      this.currentPage = 1;
      this.list();
    },

    // 删除企业
    dels(id) {
      remove({ id }).then(res => {
        // window.console.log(res);
        if (res.data.code == 200) {
          // 如果当前页只有一行数据 把他删除了之后要显示上一页的数据
          if (this.tableData.length == 1) {
            this.currentPage--;
          }
          // 如果是第0页就改成第一页
          if (this.currentPage == 0) {
            this.currentPage = 1;
          }
          this.$message.success("删除成功!");
          this.list();
        }
      });
    }
  }
};
</script>

<style lang="less">
.qie {
  .long {
    width: 149px;
  }
  .short {
    width: 100px;
  }
  .page {
    width: 543px;
    margin: 0 auto;
    margin-top: 30px;
  }
}
</style>