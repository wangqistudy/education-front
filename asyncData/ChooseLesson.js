/*
 * @Author: David
 * @Date: 2019-10-25 16:59:11
 * @LastEditTime: 2019-11-26 11:31:05
 * @LastEditors: Do not edit
 * @Description: 选课中心首屏渲染
 */
import api from '@/utils/api'
export default async function asyncData ({isDev, route, store, env, params, query, req, res, redirect, error}) {
  if (process.client) {
    return {};
  }
  let data = await api.course_config()
  let dict = {
      grades:'年级',
      semesters:'学期',
      subjects:'科目',
      types:'类型',
      schools:'校区'
    }
    let arr = Object.keys(data.data).map(key=>{
        let arrs = data.data[key].map(item=>{
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
    let selRes = {}
    arr.forEach(item=>{
      selRes[item.filed] = item.selections[0].value
    })
    let param = selRes
    if (param.page === undefined){
      param.page = 1;
    }
    if (param.page_num === undefined) {
      param.page_num = 50;
    }
    if (!process.client){
      param.token = req.xinyidai_Token
    }
    if (route.query.teacher){
      param.teacher_id = route.query.teacher
    }
    let listData = await api.course_list(param);
    let searchLogId = listData.data.searchLogId
    let totalCount = listData.data.pagination.total-0

    return {selectList:arr,selRes,tableData:listData.data.data,pageSize:8,currPage:1,totalCount,firstRender:true,$startViewTamp:new Date().getTime(),searchLogId}
}