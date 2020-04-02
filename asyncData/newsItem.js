/*
 * @Author: David
 * @Date: 2019-10-26 09:04:46
 * @LastEditTime: 2019-11-08 11:01:21
 * @LastEditors: Do not edit
 * @Description: 新闻详情页
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
      // banner图
        let bannerData = await api.banner_list({type:3})
        let banner;
        try{
          banner = bannerData.data[0].banner_url
        }catch(e){

        }
      if (!process.client){
        param.token = req.xinyidai_Token
      }
      let infoData =  await api.news_detail(param)
      return {content:infoData.data.detail,banner,title:infoData.data.title,firstRender:true}
}