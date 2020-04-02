/*
 * @Author: David
 * @Date: 2019-10-26 09:04:46
 * @LastEditTime: 2019-10-26 10:27:42
 * @LastEditors: Do not edit
 * @Description: 老师详情页
 */
import api from '@/utils/api'
export default async function asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
      if (process.client) {
        return {};
      }
      // banner图
      let bannerData = await api.banner_list({type:2})
      let heaerImg;
      try{
        heaerImg = bannerData.data[0].banner_url
      }catch(e){
        
      }

      let {id} = route.params
      let param = {
        id
      }
      if (!process.client){
        param.token = req.xinyidai_Token
      }
      let infoData =  await api.teacher_detail(param)
      return {info:infoData.data,heaerImg,firstRender:true}
}