/*
 * @Author: David
 * @Date: 2019-10-26 09:04:46
 * @LastEditTime: 2019-11-21 14:15:21
 * @LastEditors: Do not edit
 * @Description: 关于详情页
 */
import api from '@/utils/api'
export default async function asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
      if (process.client) {
        return {};
      }
      let {id} = route.params
      let param = {
       
      }
      // banner图
      let bannerData = await api.banner_list({type:4})
      let banner;
      try{
        banner = bannerData.data[0].banner_url
      }catch(e){

      }
      
      if (!process.client){
        param.token = req.xinyidai_Token
      }
      let infoData =  await api.about_us_detail(param)
      return {content:infoData.data.detail,banner,firstRender:true}
}