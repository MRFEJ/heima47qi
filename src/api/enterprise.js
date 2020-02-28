import axios from "axios"

import { getToken } from "@/utils/token.js"

let enterpriseRequery = axios.create({
    baseURL: process.env.VUE_APP_URL,
    withCredentials:true
})

enterpriseRequery.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.token = getToken();
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
  
// 企业列表
export function enterprise(params) {
    return enterpriseRequery({
        url: "/enterprise/list",
        method: 'get',
        params
     })
}
// 企业状态
export function status(data) {
    return enterpriseRequery({
        url: "/enterprise/status",
        method: 'post',
        data
     })
}

// 新增企业
export function add(data) {
    return enterpriseRequery({
        url: "/enterprise/add",
        method: 'post',
        data
     })
}

// 编辑
export function edit(data) {
    return enterpriseRequery({
        url: "/enterprise/edit",
        method: 'post',
        data
     })
}
//  删除
export function remove(data) {
    return enterpriseRequery({
        url: "/enterprise/remove",
        method: 'post',
        data
     })
}

