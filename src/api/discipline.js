
import Requery from "@/utils/requery"

// 学科列表
export function discipline(params) {
    return Requery({
        url: "/subject/list",
        method: 'get',
        params
     })
}
// 学科状态
export function status(data) {
    return Requery({
        url: "/subject/status",
        method: 'post',
        data
     })
}

// 新增学科
export function add(data) {
    return Requery({
        url: "/subject/add",
        method: 'post',
        data
     })
}

// 编辑
export function edit(data) {
    return Requery({
        url: "/subject/edit",
        method: 'post',
        data
     })
}
//  删除
export function remove(data) {
    return Requery({
        url: "/subject/remove",
        method: 'post',
        data
     })
}

