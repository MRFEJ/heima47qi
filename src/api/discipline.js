import axios from "axios"

import { getToken } from "@/utils/token.js"

let disciplineRequery = axios.create({
    baseURL: process.env.VUE_APP_URL,
    withCredentials:true
})

disciplineRequery.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.token = getToken();
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
  
// 学科列表
export function discipline(params) {
    return disciplineRequery({
        url: "/subject/list",
        method: 'get',
        params
     })
}
// 学科状态
export function status(data) {
    return disciplineRequery({
        url: "/subject/status",
        method: 'post',
        data
     })
}

// 新增学科
export function add(data) {
    return disciplineRequery({
        url: "/subject/add",
        method: 'post',
        data
     })
}

// 编辑
export function edit(data) {
    return disciplineRequery({
        url: "/subject/edit",
        method: 'post',
        data
     })
}
//  删除
export function remove(data) {
    return disciplineRequery({
        url: "/subject/remove",
        method: 'post',
        data
     })
}

