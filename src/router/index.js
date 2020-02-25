import Vue from "vue";

import login from "../views/login/login.vue"

import index from "@/views/index/index.vue"
// 导入进度条
import nprogress from "nprogress"
import "nprogress/nprogress.css"

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
      component: login
    },
    {
      path: '/index',
      component: index,
      children: [
        { path: 'overview', component: overview },
        { path: 'user', component: user },
        { path: 'question', component: question },
        { path: 'enterprise', component: enterprise },
        { path: 'discipline', component: discipline }
      ]
    }

  ]
})
// 导航守卫前
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  window.console.log(to, from);
  nprogress.start()
  next();
})

// 导航守卫后
router.afterEach(() => {
  // to and from are both route objects.
  nprogress.done();
})
export default router