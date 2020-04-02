/*
 * @Author: David
 * @Date: 2019-10-25 17:12:37
 * @LastEditTime: 2019-11-08 10:55:19
 * @LastEditors: Do not edit
 * @Description: 教师列表页
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

    // 筛选项
    let teacherConfigData = await api.teacher_search_config()
    let {subject} = teacherConfigData.data
    let selectList = Object.keys(subject).map(key=>{
      return  {label:subject[key],value:key}
    })
    selectList.unshift({label:'所有老师',value:-1})
    let selectValue = selectList[0].value
    // 首次的教师列表
    let param = {
      page:1,
      page_num:50,
      id:selectValue
    }
    if (!process.client){
      param.token = req.xinyidai_Token
    }
    
    let teacherData = await api.teacher_list(param)
    let tableData = teacherData.data.data
    let pagination = teacherData.data.pagination
    let {total,per_page,current_page,total_pages} = pagination
    return {selectList,selectValue,tableData,pageSize:per_page,currPage:current_page,totalCount:total,heaerImg,firstRender:true}
}