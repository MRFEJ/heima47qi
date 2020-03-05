import Requery from "@/utils/requery"

// 面板数据接口
export function overviewTitle(data) {
    return Requery({
        url: '/data/title',
        method: "post",
        data
    })
}

//企业题目数据统计
export function overviewStatistics(data) {
    return Requery({
        url: '/data/statistics',
        method: "post",
        data
    })
}

// 热门城市题目统计
export function overviewHot_cities(data) {
    return Requery({
        url: '/data/hot_cities',
        method: "post",
        data
    })
}
