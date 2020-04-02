/*
 * @Author: David
 * @Date: 2019-10-17 15:11:22
 * @LastEditTime: 2019-10-30 14:40:41
 * @LastEditors: Do not edit
 * @Description: 登录者信息
 */

const state = ()=>{return {
  info:{
    type:'',//success  error  warning
    msg:'',
    subMsg:'',//支持html
    show:false
  }
}};

const mutations = {
  updateInfo (state,param) {
    state.info = Object.assign({},state.info,param)
  }
};

const actions = {
    // 打开信息窗
    openMessage ({commit},param) {
      commit('updateInfo',Object.assign({},param,{show:true}))
    },
    // 关闭信息窗
    closeMessage ({commit},param) {
      commit('updateInfo',Object.assign({},param,{show:false}))
    }

};
export default{
  namespaced: true,
  state,
  mutations,
  actions
}
