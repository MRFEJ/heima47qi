<template>
  <el-select v-model="enterprise" placeholder="请选择企业" @change="num">
    <el-option value="" v-if="isok">全部企业</el-option>
    <el-option
      v-for="(item, index) in enterpriseList"
      :key="index"
      :label="item.name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>

<script>
// 导入企业列表的请求
import { enterprise } from "@/api/enterprise.js";

export default {
  data() {
    return {
      enterpriseList: [],
      enterprise: this.value
    };
  },
  props: {
    value: {},
    isok:{
      type:Boolean,
      default:false
    }
  },
  watch: {
    value(value) {
      this.enterprise=value
    }
  },
  created() {
    // 获取企业列表
    enterprise({ status: 1 }).then(res => {
      // window.console.log(res);
      this.enterpriseList = res.data.data.items;
    });
  },
  methods: {
    num() {
      this.$emit("input", this.enterprise);
    }
  }
};
</script>

<style>
</style>