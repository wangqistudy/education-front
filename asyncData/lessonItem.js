/*
 * @Author: David
 * @Date: 2019-10-26 09:04:46
 * @LastEditTime: 2019-11-26 11:09:41
 * @LastEditors: Do not edit
 * @Description: 课程详情页
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
      let infoData =  await api.course_detail(param)

    
    let params2 = {
      page:1,
      page_num:6,
      id:infoData.data.id
    }
    if (!process.client){
      params2.token = req.xinyidai_Token
    }

    let newsData = await api.course_hours(params2)
    let tableData = newsData.data.data
    let pagination = newsData.data.pagination
    let {total,per_page,current_page,total_pages} = pagination
    let dataFilters = {id:infoData.id}
    return {dataFilters,tableData,pageSize:per_page,currPage:current_page,totalCount:total,firstRender:true,info:infoData.data,$startViewTamp:new Date().getTime()}
}