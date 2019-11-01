import axios from 'axios'

var myaxios = {}
myaxios.install = function (Vue) {
    // axios.defaults.baseURL = 'http://localhost:8888'
    axios.defaults.baseURL = 'http://localhost:1234/api/v1'
    // 请求拦截器
    axios.interceptors.request.use(config => {

        return config
    })
    //响应拦截器
    axios.interceptors.response.use(res => {

        return Promise.resolve(res)
    }, err => {
        return Promise.reject(err)
    })

    Vue.prototype.$http = axios
}
export default myaxios
