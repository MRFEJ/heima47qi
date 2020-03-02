import Requery from "@/utils/requery"

// 获取题目列表
export function questionLisi(params) {
    return Requery({
        url: '/question/list',
        method: "get",
        params
    })
}

// 发布题目
export function questionAdd(data) {
    return Requery({
        url: '/question/add',
        method: "post",
        data
    })
}
// 获取题目信息
export function questionOne(data) {
    return Requery({
        url: '/question/one',
        method: "post",
        data
    })
}

//修改题目状态
export function questionStatus(data) {
    return Requery({
        url: '/question/status',
        method: "post",
        data
    })
}

// 删除题目
export function questionRemove(data) {
    return Requery({
        url: '/question/remove',
        method: "post",
        data
    })
}

// 编辑题目
export function questionEdit(data) {
    return Requery({
        url: '/question/edit',
        method: "post",
        data
    })
}
