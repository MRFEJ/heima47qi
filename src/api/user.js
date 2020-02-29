import axios from "axios"

import { getToken } from "@/utils/token.js"

let userRequery = axios.create({
    baseURL: process.env.VUE_APP_URL,
    withCredentials:true
})

userRequery.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.token = getToken();
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
  
// 学科列表
export function user(params) {
    return userRequery({
        url: "/user/list",
        method: 'get',
        params
     })
}
// 学科状态
export function status(data) {
    return userRequery({
        url: "/user/status",
        method: 'post',
        data
     })
}

// 新增学科
export function add(data) {
    return userRequery({
        url: "/user/add",
        method: 'post',
        data
     })
}

// 编辑
export function edit(data) {
    return userRequery({
        url: "/user/edit",
        method: 'post',
        data
     })
}
//  删除
export function remove(data) {
    return userRequery({
        url: "/user/remove",
        method: 'post',
        data
     })
}

