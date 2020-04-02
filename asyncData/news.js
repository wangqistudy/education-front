/*
 * @Author: David
 * @Date: 2019-10-26 08:55:46
 * @LastEditTime: 2019-11-08 09:39:54
 * @LastEditors: Do not edit
 * @Description: 
 */
import api from '@/utils/api'
export default async function asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
    if (process.client) {
      return {};
    }
    // banner图
    let bannerData = await api.banner_list({type:3})
    let banner;
    try{
      banner = bannerData.data[0].banner_url
    }catch(e){

    }
    // 首次的新闻
    let param = {
      page:1,
      page_num:8
    }
    if (!process.client){
      param.token = req.xinyidai_Token
    }

    let newsData = await api.news_full_list(param)
    let tableData = newsData.data.data
    let pagination = newsData.data.pagination
    let {total,per_page,current_page,total_pages} = pagination
    return {tableData,pageSize:per_page,currPage:current_page,totalCount:total,banner,firstRender:true}
}