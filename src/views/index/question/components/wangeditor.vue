<template>
  <div class="bj">
    <div ref="div1" class="toolbar"></div>
    <div ref="div2" class="text">
      <!--可使用 min-height 实现编辑区域自动增加高度-->
      {{value}}
    </div>
  </div>
</template>

<script>
import wangEditor from "wangeditor";
export default {
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  mounted() {
    var editor = new wangEditor(this.$refs.div1, this.$refs.div2); // 两个参数也可以传入 elem 对象，class 选择器
    // 如果富文本框里面的内容发生变化就会触发这个事件  html是变化后的内容  注意这里面的this是window 所以用箭头函数
    editor.customConfig.onchange = html => {
      this.$emit("input", html);
    };
    editor.create();
  }
};
</script>

<style>
.toolbar {
  border: 1px solid #ccc;
}
.text {
  border: 1px solid #ccc;
  height: 100px;
}
.bj {
  margin-top: 61px;
}
</style>