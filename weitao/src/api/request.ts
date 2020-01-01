import axios from 'axios'

class Request{
    instance: any
    constructor(){
        this.instance = axios.create()

        this.instance.defaults.baseURL = process.env.NODE_ENV === 'production' ? '/':'http://localhost:3000'
        // 请求拦截器
        this.instance.interceptors.request.use()
        // 响应拦截器
        this.instance.interceptors.response.use()
    }
}

export default new Request().instance