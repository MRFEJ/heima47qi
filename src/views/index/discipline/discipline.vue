<template>
  <div>
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科名字">
          <el-input class="short" v-model="formInline.user"></el-input>
        </el-form-item>

        <el-form-item label="学科编号">
          <el-input class="long" v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input class="short" v-model="formInline.user"></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-select class="long" v-model="formInline.region" placeholder="请选择状态">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button @click="onSubmit">清除</el-button>
          <el-button icon="el-icon-plus" type="primary" @click="onSubmit">新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1">启用</span>
            <span v-else class="red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text">编辑</el-button>
            <el-button
              size="mini"
              type="text"
              @click="stop(scope.row.id)"
            >{{scope.row.status? '禁用':'启用'}}</el-button>
            <el-button size="mini" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="size"
          :total="pages"
          layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
// 获取学科列表和禁用或开启状态
import { discipline, status } from "@/api/discipline.js";
export default {
  data() {
    return {
      // 页容量
      size: 5,
      // 服务器返回的总条数
      pages: 0,
      // // 当前页数
      currentPage: 1,
      // 表单数据
      formInline: {
        user: "",
        region: ""
      },
      // 表单数组
      tableData: []
    };
  },

  created() {
    this.list();
  },
  methods: {
    // 用户列表
    list() {
      discipline({
        // 传1是代表要服务器 返回第一页的内容
        page: 1,
        // 传的是要服务器返回每页8条数据
        limit: 5
      }).then(res => {
        window.console.log(res);
        this.tableData = res.data.data.items;
        this.currentPage = +res.data.data.pagination.page;
        this.pages = res.data.data.pagination.total;
      });
    },
    // 点击新增
    onSubmit() {
      console.log("submit!");
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 点击禁用
    stop(id) {
      status({ id });
      this.list();
    }
  }
};
</script>

<style>
.box-card:nth-child(2) {
  margin-top: 19px;
  height: 283px;
}
.box-card .short {
  width: 100px;
}
.box-card .long {
  width: 149px;
}
.red {
  color: red;
}
.page {
  width: 543px;
  margin: 0 auto;
  margin-top: 20px;
}
</style>