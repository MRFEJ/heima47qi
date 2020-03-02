import Requery from "@/utils/requery"
  
// 企业列表
export function enterprise(params) {
    return Requery({
        url: "/enterprise/list",
        method: 'get',
        params
     })
}
// 企业状态
export function status(data) {
    return Requery({
        url: "/enterprise/status",
        method: 'post',
        data
     })
}

// 新增企业
export function add(data) {
    return Requery({
        url: "/enterprise/add",
        method: 'post',
        data
     })
}

// 编辑
export function edit(data) {
    return Requery({
        url: "/enterprise/edit",
        method: 'post',
        data
     })
}
//  删除
export function remove(data) {
    return Requery({
        url: "/enterprise/remove",
        method: 'post',
        data
     })
}

