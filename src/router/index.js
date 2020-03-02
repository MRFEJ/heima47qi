import Vue from "vue";

import login from "../views/login/login.vue"

import index from "@/views/index/index.vue"
// 导入进度条
import nprogress from "nprogress"
import "nprogress/nprogress.css"

import { info } from "@/api/index.js"
import { removeToken } from "@/utils/token.js"
// 单独引入message
import { Message } from 'element-ui';

// 导入vuex对象
import store from "../store/index"


// 导入抽离的子路由
import reot from "./reot.js"
// 导入 vue-router
import VueRouter from 'vue-router'
//注册 vue-router
Vue.use(VueRouter)
// 实例化
const router = new VueRouter({
  //这里就是路由的配制项
  routes: [
    {
      path: '/login',
      component: login,
      meta: { title: "登录" }
    },
    {
      path: '/index',
      component: index,
      meta: { title: "首页", role: ['超级管理员', '管理员', '老师', '学生'] },
      children: reot
    },
    {
      path: '/',
      redirect: '/login'
    },
  ]
})
let whiteArr = ["/login", "/news"]
// 导航守卫前 当路由的路径发生改变就触发
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  nprogress.start()
  if (whiteArr.includes(to.path)) {
    next();
  } else {
    info().then(res => {
      // window.console.log(to);
      if (res.data.code == 200) {
        // window.console.log(from);
        if (res.data.data.status == 1) {
          if (from.path == "/login") {
            Message.success('登陆成功!');
          }
          // 将用户的头像和名字保存在vuex
          store.commit('changeUsername', res.data.data.username);
          store.commit('changeAvatar', process.env.VUE_APP_URL + "/" + res.data.data.avatar);
          // 获取用户身份
          store.commit('userRole', res.data.data.role);
          // window.console.log(to.meta.role);
          
          // 如果在要去的路由的meta里面没有包含该账号的身份就哪里来会哪里去  如果包含就进去
          if (to.meta.role.includes(res.data.data.role)) {
            next();
          } else {
            Message.warning('对不起!,该账号无权访问');
            next(from.path)
          }
        } else {
          Message.warning('对不起!,该账号无权访问,请与管理员联系');
          // 停止进度条
          nprogress.done();
        }

      } else if (res.data.code == 206) {
        // 如果token错误就删除token
        removeToken();
        // 弹出提示
        Message.error('登录异常,请重新登录!');

        // 停止进度条
        nprogress.done();
        // 跳回登录界面
        next('/login')
      }
    })
  }
})

// 导航守卫后
router.afterEach((to) => {
  // window.console.log(to, from);
  document.title = to.meta.title
  // to and from are both route objects.
  nprogress.done();
})
export default router