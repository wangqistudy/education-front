/*
 * @Author: David
 * @Date: 2019-10-25 17:12:37
 * @LastEditTime: 2019-11-22 14:58:37
 * @LastEditors: Do not edit
 * @Description: 视频列表
 */
import api from '@/utils/api'
export default async function asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
    if (process.client) {
      return {};
    }
    // 筛选项
    let videoConfigData = await api.video_search_config()
    let dict = {
      grades:'年级',
      semesters:'学期',
      subjects:'科目',
      types:'类型',
      schools:'校区'
    }
    
    

    let arr = Object.keys(videoConfigData.data).map(key=>{
        let arrs = videoConfigData.data[key].map(item=>{
          return {
            label:item.value,
            value:item.id
          }
        })
        arrs.unshift({
          label:'不限',
          value:-1
        })
        return {
          label:dict[key],
          filed:key,
          selections:arrs
        }
    })
    let selectList = arr;
    let selRes = {}
    selectList.forEach(item=>{
      selRes[item.filed] = item.selections[0].value
    })
    // 首次的视频列表
    let param2 = {
      page:1,
      page_num:50
    }
    if (!process.client){
      param2.token = req.xinyidai_Token
    }
    let teacherData = await api.video_list({...param2,...selRes})
    let tableData = teacherData.data.data
    let pagination = teacherData.data.pagination
    let {total,per_page,current_page,total_pages} = pagination
    return {selectList,tableData,pageSize:per_page,currPage:current_page,totalCount:total,selRes,firstRender:true}
}