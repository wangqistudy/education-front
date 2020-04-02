/*
 * @Author: David
 * @Date: 2019-10-17 15:11:22
 * @LastEditTime: 2019-11-21 17:46:51
 * @LastEditors: Do not edit
 * @Description: 全局信息
 */
import api from '@/utils/api'
const state = ()=>{return{
    // 全局通用设置
    setting:{

    },
    
    // banner图
    banners:[
      
    ],

    // 选课中心
    courseSelect:[

    ],

    // 名师列表
    teachers:[

    ],

    // 新闻列表
    newsList:[

    ],

    // 精英课程列表
    etList:[

    ],

    // 校区列表
    addressList:[

    ],

    // 浮框
    floatnews:{

    },
    
    

    // 支付宝二维码
    alipayErwm:'',


    // 微信二维码
    wechatErwm:'',

    // 注册协议
    registerDocument:'',

    // 报名协议
    enteredDocument:''
}};

const mutations = {
    updateSetting (state,param) {
      state.setting = param
    },
    updateBanners (state,param) {
      state.banners = param
    },
    updateCourseSelect (state,param) {
      state.courseSelect = param
    },
    updateTeachers (state,param) {
      state.teachers = param
    },
    updateNewsList (state,param) {
      state.newsList = param
    },
    updateAddressList (state,param) {
      state.addressList = param
    },
    updateEtList (state,param) {
      state.etList = param
    },
    updateAlipayErwm (state,str) {
      state.alipayErwm = str
    },
    updateWechatErwm (state,str) {
      state.wechatErwm = str
    },
    updateRegisterDocument (state,str) {
      state.registerDocument = str
    },
    updateEnteredDocument (state,str) {
      state.enteredDocument = str
    },
    updateFloatnews (state,param) {
      state.floatnews = param
    }
};  

const actions = {
   async getSetting ({commit},param) {
      param = param?param:{}
      let data = await api.get_common_setting(param)
      commit('updateSetting',data.data)
      
   },
   async getBanners ({commit},param) {
      param = param?param:{}
     let data = await api.get_banner()
     commit('updateBanners',data.data);
   },
   async getCourseSelect ({commit},param) {
      param = param?param:{}
      let data = await  api.get_course(param)
      commit('updateCourseSelect',data.data);
  },
  async getTeachers ({commit},param) {
    param = param?param:{}
    let data = await api.get_teacher(param)
    commit('updateTeachers',data.data);
 },
 async getNewsList ({commit},param) {
    param = param?param:{}
    let data = await api.news_list(param)
    commit('updateNewsList',data.data);
    
  },
  async getAddressList ({commit},param) {
    param = param?param:{}
    let data = await api.shcool_list(param)
    commit('updateAddressList',data.data);
  },
  async getEtList ({commit},param) {
    param = param?param:{}
    let data = await api.et_list(param)
    commit('updateEtList',data.data);
  },
  async getRegisterDocument ({commit},param) {
    param = param?param:{}
    param.type=2;
    let data = await api.protocol_detail(param)
    commit('updateRegisterDocument',data.data.content);
  },
  async getEnteredDocument ({commit},param) {
    param = param?param:{}
    param.type=1;
    let data = await api.protocol_detail(param)
    commit('updateEnteredDocument',data.data.content);
  },
  async getFloatNews ({commit},param) {
    param = param?param:{}
    let data = await api.float_new(param)
    commit('updateFloatnews',data.data);
  }
};

export default{
  namespaced: true,
  state,
  mutations,
  actions
}
