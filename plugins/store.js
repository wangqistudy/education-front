/*
 * @Author: David
 * @Date: 2019-10-25 17:41:08
 * @LastEditTime: 2019-10-26 08:38:59
 * @LastEditors: Do not edit
 * @Description: store插件
 */
import {setStore} from '@/utils/store'
export default ({ app, $axios, store, route, redirect })=>{
    setStore(store)
}