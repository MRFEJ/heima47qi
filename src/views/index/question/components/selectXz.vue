<template>
  <div class="seleted">
    <el-radio :label="lable" v-if="isok"></el-radio>
    <el-checkbox :label="lable" v-else></el-checkbox>
    <el-input class="input" v-model="value" @input="chage"></el-input>
    <el-upload
      class="avatar-uploader"
      :action="imgUp"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  props: {
    lable: String,
    text: String,
    img: String,
    isok: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      imageUrl: this.img,
      value: this.text,
      imgUp: process.env.VUE_APP_URL + "/question/upload"
    };
  },
  methods: {
    // 输入框改变事件
    chage() {
      this.$emit("update:text", this.value);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      // 吧服务器真实的图片上路径传给父组件
      // window.console.log(res.data.url);
      this.$emit("update:img", res.data.url);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="less">
.el-form-item__content {
  line-height: 0;
}
.seleted {
  display: flex;
  align-items: center;
  margin-top: 30px;
  .el-radio {
    margin-right: 0;
  }
  .input {
    margin-right: 20px;
  }
  .el-input {
    width: 300px;
    margin-left: 20px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>