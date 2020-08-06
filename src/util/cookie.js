import vueCookies from 'vue-cookies'

export default class Cookies {
    constructor(){
        // 设置全局 Cookie 过期时间
        vueCookies.config('30d')
    }
    /**
     * 添加一个 token
     * @param token 
     */
    setToken(token){
       return vueCookies.set("token", token, '1d');
    }

    /**
     * 删除 token
     */
    removeToken(){
        return vueCookies.remove('token')
    }

    /**
     * 检查 token
     */
    hasToken(){
        return vueCookies.isKey('token')
    }
}