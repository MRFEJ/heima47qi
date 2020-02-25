<template>
  <div class="login">
    <div class="log-left">
      <div class="title-box">
        <img class="box-img" src="./img/logo.png" alt />
        <span class="box-s">黑马面面</span>
        <span class="box-f"></span>
        <span class="box-s">用户登录</span>
      </div>
      <el-form ref="form" :model="form" label-width="0px" :rules="rules">
        <el-form-item prop="phone">
          <el-input placeholder="请输入手机号" clearable v-model="form.phone" prefix-icon="el-icon-user"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            clearable
            show-password
            v-model="form.password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-row>
            <el-col :span="18">
              <el-input
                placeholder="请输入验证码"
                clearable
                v-model="form.code"
                prefix-icon="el-icon-key"
              ></el-input>
            </el-col>
            <el-col :span="6">
              <img @click="clCode" class="yz" :src="imgUrl" alt />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item prop="type">
          <el-checkbox v-model="form.type">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col>
              <el-button style="width:100%" type="primary" @click="submitForm">登陆</el-button>
              <el-button style="width:100%" type="primary" @click="submitForm2">注册</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
    <img src="./img/login_banner_ele.png" alt />
    <!-- 导入子组件 -->
    <register ref="register"></register>
  </div>
</template>

<script>
import {login} from "@/api/login.js"
import register from "./components/register";
// 导入token
import {setToken} from "@/utils/token.js"
export default {
  components: {
    register
  },
  data() {
    return {
      // 图形验证码
      imgUrl:process.env.VUE_APP_URL + "/captcha?type=login",
      form: {
        phone: "13888888888",
        password: "123456",
        code: "",
        // type: [],
        type: false
      },
      rules: {
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          { pattern:/^0?(13|14|15|18)[0-9]{9}$/, message: "手机号格式不正确", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 12, message: "请输入6-12位的密码", trigger: "change" }
        ],
        code: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "验证码是4位", trigger: "blur" }
        ],
        type: [
          {
            // required: true,
            pattern: /true/,
            message: "请勾选我已阅读并同意用户协议和隐私条款",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    // 效验全部表单
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          login({
            phone:this.form.phone,
            password:this.form.password,
            code:this.form.code
          }).then(res=>{
            // window.console.log(res);
            if(res.data.code==200){
              this.$message.success('登陆成功!');
              setToken(res.data.data.token)
              this.$router.push('/index')
            }else{
              this.clCode()
              this.$message.error(res.data.message)
            }
          })
        }
      });
    },
    // 注册的点击事件
    submitForm2() {
      this.$refs.register.dialogFormVisible = true;
    },
    // 图形验证码的点击事件
    clCode(){
      this.imgUrl= process.env.VUE_APP_URL + "/captcha?type=login&d="+Date.now();
    }
  }
};
</script>

<style lang="less">
.login {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  display: flex;
  justify-content: space-around;
  align-items: center;
  .log-left {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding: 48px;
    .title-box {
      display: flex;
      align-items: center;
      margin-bottom: 27px;
      .box-img {
        width: 22px;
        height: 17px;
        margin-right: 16px;
      }
      .box-f {
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
        margin-left: 14px;
        margin-right: 12px;
      }
      .box-s {
        font-size: 24px;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
      }
    }
    .yz {
      width: 100%;
      height: 40px;
    }
    .el-checkbox {
      display: flex;
      .el-checkbox__label {
        display: flex;
        align-items: center;
        margin-top: -3px;
      }
    }
    .el-button {
      &:nth-child(2) {
        margin-left: 0px;
        margin-top: 26px;
      }
    }
  }
}
</style>