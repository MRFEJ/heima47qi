<template>
  <el-dialog width="600px" center :title="isCom? '新增企业':'编辑企业'" :visible.sync="dialogFormVisible">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="企业编号" :label-width="formLabelWidth" prop="eid">
        <el-input v-model="form.eid" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="企业名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="企业简称" :label-width="formLabelWidth" prop="short_name">
        <el-input v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="企业简介" :label-width="formLabelWidth" prop="intro">
        <el-input v-model="form.intro" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="企业备注" :label-width="formLabelWidth" prop="remark">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="sure">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from "@/api/enterprise.js";
export default {
  data() {
    return {
      isCom: true,
      dialogFormVisible: false,
      form: {},
      formLabelWidth: "80px",
      rules: {
        eid: [{ required: true, message: "企业编号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "企业名称不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 点击重置
    cz() {
      this.$refs.form.resetFields();
    },
    // 点击确定
    sure() {
      this.$refs.form.validate(v => {
        if (v) {
          if (this.isCom) {
            add(this.form).then(res => {
              // window.console.log(res);
              if (res.data.code == 200) {
                this.$message.success("新增成功");
                this.dialogFormVisible = false;
                this.$parent.currentPage = 1;
                this.$parent.list();

                this.$refs.form.resetFields();
              } else {
                this.$message.error(res.data.message);
              }
            });
          } else {
            edit(this.form).then(res => {
              // window.console.log(res);
              if (res.data.code == 200) {
                this.$message.success("编辑成功!");
                this.dialogFormVisible = false;
                this.$parent.list();
              } else {
                this.$message.error(res.data.message);
              }
            });
          }
        }
      });
    }
  }
};
</script>

<style>
.el-icon {
  color: #fff !important;
}
</style>