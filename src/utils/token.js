const TOKENKEY = "hmtoken";

// 保存token
export function setToken(key) {
    return window.localStorage.setItem(TOKENKEY,key)
}


// 获取token
export function getToken() {
    return window.localStorage.getItem(TOKENKEY)
}

// 删除token
export function removeToken() {
    return window.localStorage.removeItem(TOKENKEY)
}