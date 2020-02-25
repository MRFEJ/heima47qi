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

import overview from "@/views/index/overview/overview.vue"
import user from "@/views/index/user/user.vue"
import question from "@/views/index/question/question.vue"
import enterprise from "@/views/index/enterprise/enterprise.vue"
import discipline from "@/views/index/discipline/discipline.vue"


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
      meta:{title:"登录"}
    },
    {
      path: '/index',
      component: index,
      meta:{title:"首页"},
      children: [
        { path: 'overview', component: overview,meta:{title:"数据概览"} },
        { path: 'user', component: user,meta:{title:"用户列表"} },
        { path: 'question', component: question,meta:{title:"题库列表"} },
        { path: 'enterprise', component: enterprise,meta:{title:"企业列表"} },
        { path: 'discipline', component: discipline,meta:{title:"学科列表"} }
      ]
    },
    {
      path: '/',
      redirect: '/login'
    }

  ]
})
let whiteArr = ["/login", "news"]
// 导航守卫前 当路由的路径发生改变就触发
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  nprogress.start()
  if (whiteArr.includes(to.path)) {
    next();
  } else {
    info().then(res => {
      if (res.data.code == 200) {
        next();
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
  document.title=to.meta.title
  // to and from are both route objects.
  nprogress.done();
})
export default router