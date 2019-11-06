import axios from 'axios'

var myaxios = {}
myaxios.install = function (Vue) {
    // axios.defaults.baseURL = 'http://localhost:8888'
    axios.defaults.baseURL = 'http://localhost:1234'
    axios.defaults.headers.common['Authorization'] = 'jason'
    // 请求拦截器
    axios.interceptors.request.use(config => {
        // config.headers.common['Authorization'] = 'jason'
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
