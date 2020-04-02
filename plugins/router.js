/*
 * @Author: David
 * @Date: 2019-10-26 09:28:01
 * @LastEditTime: 2019-10-30 11:42:11
 * @LastEditors: Do not edit
 * @Description: 导航守卫
 */
import cookieParse from '@/utils/parseCookie'
import  authList from '@/config/authList'
import {getStore} from '@/utils/store'
import {setRouter} from '@/utils/router'
export default ({app})=>{
  // 判断是否有token，若有则可以访问否则跳转到/login
  setRouter(app.router)
	app.router.beforeEach((to,from,next)=>{
    let token;
    let url;
    if (!process.client){
      let cookies = app.context.req.headers.cookie
      let cjson = cookieParse(cookies)
      token = cjson.xinyidai_Token
      url = app.context.req.url
    }else{
      token = app.store.state.user.user.token
    }
    if (token) {
      next();
    }else{
      if (authList.some(item=>{
        return to.fullPath.indexOf(item)>=0
      })) {
        let store = getStore()
        store.dispatch('user/openLogin')
        if (from.fullPath){
          next(from.fullPath)
        }else{
          next('/')
        }
        
      }else{
        next()
      }
    }
		
  })
}