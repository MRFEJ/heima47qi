import Vue from "vue"
// 导包
import Vuex from "vuex"
// 注册
Vue.use(Vuex);
// 实例化
const store = new Vuex.Store({
    state: {
        // 用户名
        username: '',
        // 头像
        avatar: '',
        // 用户身份
        Role:''
    },
    mutations: {
        changeUsername(state, val) {
            state.username = val;
        },
        changeAvatar(state, val) {
            state.avatar = val;
        },
        userRole(state, val) {
            state.Role=val
        }
    }
})
export default store