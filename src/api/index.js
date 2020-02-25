import axios from "axios"

import { getToken } from "@/utils/token.js"


let indexRequest = axios.create({
    baseURL: process.env.VUE_APP_URL,
})

// 拦截请求的axios
indexRequest.interceptors.request.use(function (config) {

    // config参数就是被拦截下来的请求的配置
    // window.console.log(config)

    // 我只要对congig里面的headers加一个token
    // 就代表你这次发的请求就有token了
    config.headers.token = getToken();//这句话就代表每次首页里的请求都会被拦下来并且自动加一个token


    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
// 由于以下代码比较冗余所以用axios的create方法克隆一个axios对象出来 注意在调用这个info函数的时候不会再执行这个indexRequest之前的初始化的代码他是死的项目开启就执行 只是加上之前的初始化代码而已 所以调用的时候token为null
// 获取用户信息
export function info() {
    //  return axios({
    //     url: process.env.VUE_APP_URL + '/info',
    //     method: 'get',
    //     headers: {
    //         token: getToken()
    //     }
    // })

    return indexRequest({
        url:'/info',
        method: 'get'
        // headers: {
        //     token: getToken()
        // }
    })
}

// 退出登录
export function logout() {
    // return axios({
    //     url: process.env.VUE_APP_URL + '/logout',
    //     method: 'get',
    //     headers: {
    //         token: getToken()
    //     }
    // })
    return indexRequest({
        url:'/logout',
        method: 'get'
        // headers: {
        //     token: getToken()
        // }
    })
}