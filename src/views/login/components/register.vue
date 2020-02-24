<template>
  <el-dialog title="用户注册" width="600px" center :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="头像" :label-width="formLabelWidth" prop="avatar">
        <el-upload
          name="image"
          class="avatar-uploader"
          v-model="form.avatar"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="昵称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="图形码" :label-width="formLabelWidth" prop="code">
        <el-col :span="17">
          <el-input v-model="form.code" autocomplete="off"></el-input>
        </el-col>
        <el-col :span="6" :offset="1">
          <img class="yz" :src="picCode" @click="getCode" alt />
        </el-col>
      </el-form-item>

      <el-form-item label="验证码" :label-width="formLabelWidth" prop="rcode">
        <el-row>
          <el-col :span="17">
            <el-input v-model="form.rcode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="6" :offset="1">
            <el-button
              :disabled="time!=0"
              class="yz-bt"
              @click="btCode"
            >{{time==0? "获取用户验证码":"还有"+time+"秒"}}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="srue">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import {sendSMS} from "../../../api/register.js"
import { sendSMS, register } from "@/api/register";
export default {
  name: "reg",
  data() {
    return {
      // 上传头像的url
      uploadUrl: process.env.VUE_APP_URL + "/uploads",
      // 上传文件的图片
      imageUrl: "",
      // 是否显示对话框
      dialogFormVisible: false,
      // 左边文字的宽度
      formLabelWidth: "65px",
      // 发送短信验证码的时间
      time: 0,
      // 验证码
      picCode: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      form: {
        name: "",
        email: "",
        phone: "",
        password: "",
        code: "",
        rcode: "",
        avatar: ""
      },
      rules: {
        avatar: [
          { required: true, message: "头像不能为空", trigger: "change" }
        ],
        name: [{ required: true, message: "昵称不能为空", trigger: "blur" }],

        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          {
            pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],

        phone: [
          { required: true, message: "昵手机号不能为空", trigger: "blur" },
          {
            pattern: /^0?(13|14|15|18)[0-9]{9}$/,
            message: "手机号格式不正确",
            trigger: "blur"
          }
        ],

        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { max: 12, min: 6, message: "请输入6-12位的密码", trigger: "change" }
        ],

        code: [
          { required: true, message: "图形码不能为空", trigger: "blur" },
          // { max: 4, min: 4, message: "图形码是4位数字", trigger: "blur" },
          { len: 4, message: "图形码是4位数字", trigger: "blur" }
        ],

        rcode: [
          { required: true, message: "手机验证码不能为空", trigger: "blur" },
          { len: 4, message: "手机验证码是4位数字", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 全部表单验证
    srue() {
      this.$refs.form.validate(v => {
        // 如果是v==true就发送请求
        if (v) {
          register({
            username: this.form.name,
            phone: this.form.phone,
            email: this.form.email,
            avatar: this.form.avatar,
            password: this.form.password,
            rcode: this.form.rcode
          }).then(res => {
            // window.console.log(res);
            if (res.data.code == 200) {
              this.$message.success("注册成功!");
              // 隐藏注册界面
              this.dialogFormVisible=false;
              // 重置表单
              this.$refs.form.resetFields();
              // 清空头像
              this.imageUrl=null;
            }else{
              this.$message.error(res.data.message);
            }
          });
        }
      });
    },
    //   获取图片验证码
    getCode() {
      this.picCode =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&g=" + Date.now();
    },
    // 获取手机验证码
    btCode() {
      // 在发送短信验证码前 先判断用户输入手机号和输入的图形码是否合法 如果合法再发送请求,这样可以减少服务器的压力
      if (!(/0?(13|14|15|18)[0-9]{9}/.test(this.form.phone))) {
        return this.$message.error("手机号格式不正确");
      }
      if (this.form.code.length != 4) {
        return this.$message.error("图形码长度要输入4位");
      }

      this.time = 60;
      let set = setInterval(() => {
        this.time--;
        if (this.time == 0) {
          clearInterval(set);
        }
      }, 100);
      // 发送请求 验证码
      sendSMS({
        code: this.form.code,
        phone: this.form.phone
      }).then(res => {
        //成功回调
        // console.log(res);
        // 成功执行的代码
        if (res.data.code == 200) {
          // alert('验证码为:'+res.data.data.captcha)
          this.$message.success("验证码:" + res.data.data.captcha);
        } else {
          // 失败执行的代码
          // alert(res.data.message);
          this.$message.error(res.data.message);
        }
      });

      // this.$axios({
      //   url: process.env.VUE_APP_URL + "/sendsms",
      //   method: "post",
      //   data: { code: this.form.code, phone: this.form.phone },
      //   withCredentials: true
      // }).then(res => {
      //   //成功回调
      //   // console.log(res);
      //   if (res.data.code == 200) {
      //     // alert('验证码为:'+res.data.data.captcha)
      //     this.$message.success("验证码:" + res.data.data.captcha);
      //   } else {
      //     // alert(res.data.message);
      //     this.$message.error(res.data.message);
      //   }
      // });
    },

    handleAvatarSuccess(res, file) {
      window.console.log(res,file);
      
      // 把返回的文件转成一个虚拟路径赋值给imggeUrl
      this.imageUrl = URL.createObjectURL(file.raw);
      // 把服务器返回的真实地址给avatar
      this.form.avatar = res.data.file_path;
      // 再效验一次这个avatar这个规则
      this.$refs.form.validateField("avatar");
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像只能是 图片 格式!");
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
.el-dialog__header {
  background: linear-gradient(to right, #01c5fb, #1396fd);
  font-size: 17px;
  .el-dialog__title {
    color: #fff;
  }
}
.yz {
  width: 100%;
}
.yz-bt {
  width: 100%;
  padding: 12px 0 !important;
}
.el-dialog {
  top: -45px;
}

// 上传图片的样式
.avatar-uploader {
  text-align: center;
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
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
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>