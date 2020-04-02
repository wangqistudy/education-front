/*
 * @Author: David
 * @Date: 2019-10-26 09:04:46
 * @LastEditTime: 2019-11-08 09:39:29
 * @LastEditors: Do not edit
 * @Description: 精英详情页
 */
import api from '@/utils/api'
export default async function asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
      if (process.client) {
        return {};
      }
      let {id} = route.params
      let param = {
        id
      }
      if (!process.client){
        param.token = req.xinyidai_Token
      }
      let infoData =  await api.et_detail(param)
      return {info:infoData.data,firstRender:true}
}