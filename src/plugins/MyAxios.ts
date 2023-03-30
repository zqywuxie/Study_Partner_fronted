// Set config defaults when creating the instance
//自定义实例默认值
import axios from "axios";

const myAxios = axios.create({
    baseURL: 'http://localhost:8080/api'
    // baseURL: 'http://47.108.194.167:8080/'
});
//带上凭证
myAxios.defaults.withCredentials = true
//拦截器
// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if (response?.data.code==40002){
        const redirectUrl = window.location.href;
        window.location.href = `/user/login?redirect=${redirectUrl}`
    }
    return response.data;
}, function (error) {
    console.log("hello")
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default myAxios;
