/*
 * @Author: David
 * @Date: 2019-08-14 09:47:51
 * @LastEditTime: 2019-11-28 11:30:07
 * @LastEditors: Do not edit
 * @Description: 
 */

import Vuex from 'vuex'
import Vue from 'vue'
import user from './modules/user'
import alertModal from './modules/alert'
import global from './modules/global'
import cookieParse from '@/utils/parseCookie'

Vue.use(Vuex)


// initial state
const state = {}

// getters
const getters = {}

// actions
const actions = {
    async nuxtServerInit ({dispatch,commit},{req}) {
        // 获取
        let {cookie,url} = req.headers;
        try {
            let cjson = cookieParse(cookie)
            let token = cjson.xinyidai_Token
            req.xinyidai_Token = token

            await dispatch('global/getBanners',{token})
            await dispatch('global/getCourseSelect',{token})
            await dispatch('global/getSetting',{token})
            await dispatch('global/getRegisterDocument',{token})
            await dispatch('global/getEnteredDocument',{token})
            
            if (token) {
                try {
                    await dispatch('user/getUserInfoByToken',{token})
                }catch(e){
                    
                }
                
            }
        }catch(e){
            // console.log(e)
        }
        
    }
}

// mutations
const mutations = {
    
}

export default ()=>{return new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    modules: {
        user,
        alertModal,
        global
    },
    strict: false,
    plugins: []
})}
