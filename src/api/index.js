import Requery from "@/utils/requery"

export function info() {
    //  return axios({
    //     url: process.env.VUE_APP_URL + '/info',
    //     method: 'get',
    //     headers: {
    //         token: getToken()
    //     }
    // })

    return Requery({
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
    return Requery({
        url:'/logout',
        method: 'get'
        // headers: {
        //     token: getToken()
        // }
    })
}