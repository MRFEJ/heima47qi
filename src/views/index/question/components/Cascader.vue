<template>
  <div class="block">
    <el-cascader
      v-model="val"
      :options="options"
      :props="{ expandTrigger: 'hover', value:'label' }"
      @change="handleChange"
      placeholder="请选择城市"
    ></el-cascader>
  </div>
</template>

<script>
import { regionDataPlus } from "element-china-area-data";
export default {
  props: {
    value: {}
  },
  data() {
    return {
      val: this.value,
      options: regionDataPlus
    };
  },
  methods: {
    handleChange() {
      this.$emit("input", this.val);
    }
  }
};
</script>

<style>
</style>