import Vue from 'vue'
import App from './App.vue'

import './style/base.css'
// 导入路由
import router from "./router/index.js"
// 导入vuex
import store from "./store/index"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
