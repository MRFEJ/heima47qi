<template>
  <el-container>
    <el-header class="my_header">
      <div class="left">
        <i
          @click="isCollapse=!isCollapse"
          class="icon"
          :class="isCollapse? 'el-icon-s-unfold' : 'el-icon-s-fold'"
        ></i>
        <img class="logo" src="./img/index_logo.png" alt />
        <span class="title">黑马面面</span>
      </div>
      <div class="right">
        <img class="avatar" :src="avatar" alt />
        <span class="name">{{username}},你好</span>
        <el-button @click="goOut" type="primary" size="mini">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 侧边导航 -->
      <el-aside width="auto" class="my_aside">
        <el-menu router default-active="1" class="el-menu-vertical-demo" :collapse="isCollapse">
          <el-menu-item index="/index/overview">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>

          <el-menu-item index="/index/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>

          <el-menu-item index="/index/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>

          <el-menu-item index="/index/enterprise">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>

          <el-menu-item index="/index/discipline">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="my_main">
        <!-- 子路由输出 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { info } from "@/api/index.js";
import { logout } from "@/api/index.js";
import { removeToken,getToken } from "@/utils/token.js";
export default {
  beforeCreate() {
    if(!getToken()){
      this.$message.error('请先登录!');
      this.$router.push('/login')
    }
  },
  data() {
    return {
      // 用户名
      username: "",
      // 头像
      avatar: "",
      //   是否收起侧边栏
      isCollapse: false
    };
  },
  created() {
    info().then(res => {
      //   window.console.log(res);
      this.username = res.data.data.username;
      // 这里返回的地址不完整,要在前面拼接一个基地址,并且中间还要加斜杆 /
      this.avatar = process.env.VUE_APP_URL + "/" + res.data.data.avatar;
      // console.log(11111);
    });
  },
  methods: {
    //   点击退出
    goOut() {
      this.$confirm("您将退出本系统, 是否继续退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          logout().then(res => {
            //   window.console.log(res);
            if (res.data.code == 200) {
              this.$message.success("退出成功!");
              removeToken();
              this.$router.push("/login");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "谢谢您还留下来!!!"
          });
        });
    },
  }
};
</script>

<style lang="less">
html,
body {
  height: 100%;
}
.el-container {
  height: 100%;
  .my_header {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      height: 100%;
      align-items: center;
      .icon {
        font-size: 24px;
        color: #000;
        margin-right: 22px;
        cursor: pointer;
      }
      .logo {
        width: 33px;
        height: 28px;
        margin-right: 11px;
      }
      .title {
        // width: 92px;
        // height: 22px;
        font-size: 22px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(73, 161, 255, 1);
      }
    }
    .right {
      display: flex;
      height: 100%;
      align-items: center;
      .avatar {
        width: 43px;
        height: 43px;
        margin: 9px;
      }
      .name {
        height: 15px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(99, 99, 99, 1);
        margin-right: 38px;
      }
    }
  }
  .my_aside {
    background-color: #fff;
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
  }
  .my_main {
    background-color: yellowgreen;
  }
}
</style>