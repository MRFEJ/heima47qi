<template>
  <el-select v-model="subject" placeholder="请选择学科" @change="num">
    <el-option value="" v-if="isok">全部企业</el-option>
    <el-option
      v-for="(item, index) in disciplineList"
      :key="index"
      :label="item.name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>

<script>
// 导入学科列表的请求
import { discipline } from "@/api/discipline.js";

export default {
  data() {
    return {
      disciplineList: [],
      subject: this.value
    };
  },
  props: {
    value: {},
    isok: {
      type: Boolean,
      default: false
    }
  },
  created() {
    // 获取学科列表
    discipline({ status: 1 }).then(res => {
      // window.console.log(res);
      this.disciplineList = res.data.data.items;
    });
  },
  watch: {
    value(val) {
      this.subject = val;
    }
  },
  methods: {
    num() {
      this.$emit("input", this.subject);
    }
  }
};
</script>

<style>
</style>