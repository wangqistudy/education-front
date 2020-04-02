/*
 * @Author: David
 * @Date: 2019-08-22 15:35:11
 * @LastEditTime: 2019-12-03 16:19:49
 * @LastEditors: Do not edit
 * @Description: 
 */
/* eslint-disable */
import {messageSuccess,messageError,messageWarning} from '@/utils/messageBox'
import {getKey} from '@/utils/cookieStorage'
const axios = require ('axios')
const qs = require('qs')
import {getStore} from '@/utils/store'

const baseUrl = process.env.NODE_ENV==='development'?'http://admin.zwk7.top/api':'http://admin.zwk7.top/api';

const instance = axios.create({
    baseURL: baseUrl,
    timeout:30000
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    let token = getKey('xinyidai_Token')
    if (token) {
      config.headers['token'] = token
      if (config.method=='post'){
        config.data = { 
            ...config.data, 
            token: token
        }
        let data = qs.stringify(config.data)
        config.data = data;
      }else if (config.method=='get'){
        config.params = { 
            ...config.params,
            token: token
        } 
      }
    }
    return config;
    
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    const store = getStore()
    // 对响应数据做点什么
   
    let data = response.data;
    if (data.code==0){
      return response;
    }

    if (data.code==401){
      if (!(response.config.url.indexOf('/front/user/get_user_info')>=0)) {
          store.dispatch('user/openLogin')  
      }
      return Promise.reject(data);
    }

    if (data.code==1){
      messageError(data.message)
      return Promise.reject(data);
    }
    
    return response;
}, function (error) {
  messageError('服务器错误')
    return Promise.reject(error);
});
function post (url,data) {
    let {token} = global
    if (token){
        data.token = token
    }
    return new Promise((res,rej)=>{
        instance.post(url,data).then(data=>{
            res(data.data);
        })
        .catch((err)=>{
            rej(err);
        })
    })
    
    
}

function get (url,params){
    return params?instance.get(url,{
        params
    }):instance.get(url);
}

export {post,get,baseUrl};

export default  {
    post,get
}