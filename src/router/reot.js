import overview from "@/views/index/overview/overview.vue"
import user from "@/views/index/user/user.vue"
import question from "@/views/index/question/question.vue"
import enterprise from "@/views/index/enterprise/enterprise.vue"
import discipline from "@/views/index/discipline/discipline.vue"

export default [
  {
    path: 'overview', component: overview, meta: { title: "数据概览", role: ['超级管理员', '管理员', '老师'], icon: "el-icon-pie-chart" },
  },
  { path: 'user', component: user, meta: { title: "用户列表", role: ['超级管理员', '管理员'], icon: "el-icon-user" } },
  { path: 'question', component: question, meta: { title: "题库列表", role: ['超级管理员', '管理员', '老师', '学生'], icon: "el-icon-edit-outline" } },
  { path: 'enterprise', component: enterprise, meta: { title: "企业列表", role: ['超级管理员', '管理员', '老师'], icon: "el-icon-office-building" } },
  { path: 'discipline', component: discipline, meta: { title: "学科列表", role: ['超级管理员', '管理员', '老师', '学生'], icon: "el-icon-notebook-2" } }
]