/*
 * @Author: David
 * @Date: 2019-10-17 15:11:22
 * @LastEditTime: 2019-10-30 16:55:39
 * @LastEditors: Do not edit
 * @Description: 登录者信息
 */
import api from '@/utils/api'
import { setKey,removeKey } from '../../utils/cookieStorage';
import {getRouter} from '@/utils/router'
import  authList from '@/config/authList'
const state = ()=>{return {
    user:{
      
    },
    loginModel:{
      show:false,
      tab:1 // 1：登录 2：注册
    },
    bindModel:{
      show:false,
      showClose:false
    },
    
    forgetPassModel:false,
    infoModel:{
      show:false,
      showClose:false
    }, //填写信息窗口

    // 协议
    areementModalInfo:{
      show:false,
      title:'注册协议',
      content:`<p>12018年5月24日，就年初教育部门发布的《普通高中课程方案和语文等学科课程标准（2017年版）》，于''上海交通大学徐汇校区文治堂举行了“核心素养背景下的英语教学重大变革”专题讲座。''新修订的课程标准确立了英语学科核心素养框架，并基于“学科核心素养”，设计了课程内容，明确''了学习活动观，研制了学业质量标准，提出了相关教学与评价建议。</p><p>上海市教师、曾连续36年耕耘于教学第一线的沈伟刚老师，作为嘉宾出席本次讲座。就新课标相关政''策、指导理念以及教学实操等，与事业部初、高段英语教师、客服等400余人展开了深度剖析与交流学习。''并向沈老师颁发了聘书。</p><p>本次讲座及聘请，进一步对如何落实课程目标与课程设计？如何理解课程内容与如何操作？如何在课堂上''落实新课标？如何利用信息技术促进教学等问题进行权威剖析解读，让教育者系统掌握新课标的新特点、''新变化及新要求，解决在具体教学过程中遇到的新挑战，有效提升教学效能。</p><p>讲座现场，听众也就新课标相关问题向嘉宾发起了提问与交流。''从“学科应试”到“学科逻辑”，到系统化注重文化意识、思维品质、学习能力、语言能力等核心素养的''培养与提升，也在数十年的教学实操中见证了这一历程。后期，也将敏感关注并紧随信息化环境下的教学''改革，致力于培养具有中国情怀、国际视野和跨文化沟通能力的社会主义建设者和接班人。2018年5月24日，就年初教育部门发布的《普通高中课程方案和语文等学科课程标准（2017年版）》，于''上海交通大学徐汇校区文治堂举行了“核心素养背景下的英语教学重大变革”专题讲座。''新修订的课程标准确立了英语学科核心素养框架，并基于“学科核心素养”，设计了课程内容，明确''了学习活动观，研制了学业质量标准，提出了相关教学与评价建议。</p><p>上海市教师、曾连续36年耕耘于教学第一线的沈伟刚老师，作为嘉宾出席本次讲座。就新课标相关政''策、指导理念以及教学实操等，与事业部初、高段英语教师、客服等400余人展开了深度剖析与交流学习。''并向沈老师颁发了聘书。</p><p>本次讲座及聘请，进一步对如何落实课程目标与课程设计？如何理解课程内容与如何操作？如何在课堂上''落实新课标？如何利用信息技术促进教学等问题进行权威剖析解读，让教育者系统掌握新课标的新特点、''新变化及新要求，解决在具体教学过程中遇到的新挑战，有效提升教学效能。</p><p>讲座现场，听众也就新课标相关问题向嘉宾发起了提问与交流。''从“学科应试”到“学科逻辑”，到系统化注重文化意识、思维品质、学习能力、语言能力等核心素养的''培养与提升，也在数十年的教学实操中见证了这一历程。后期，也将敏感关注并紧随信息化环境下的教学''改革，致力于培养具有中国情怀、国际视野和跨文化沟通能力的社会主义建设者和接班人。2018年5月24日，就年初教育部门发布的《普通高中课程方案和语文等学科课程标准（2017年版）》，于''上海交通大学徐汇校区文治堂举行了“核心素养背景下的英语教学重大变革”专题讲座。''新修订的课程标准确立了英语学科核心素养框架，并基于“学科核心素养”，设计了课程内容，明确''了学习活动观，研制了学业质量标准，提出了相关教学与评价建议。</p><p>上海市教师、曾连续36年耕耘于教学第一线的沈伟刚老师，作为嘉宾出席本次讲座。就新课标相关政''策、指导理念以及教学实操等，与事业部初、高段英语教师、客服等400余人展开了深度剖析与交流学习。''并向沈老师颁发了聘书。</p><p>本次讲座及聘请，进一步对如何落实课程目标与课程设计？如何理解课程内容与如何操作？如何在课堂上''落实新课标？如何利用信息技术促进教学等问题进行权威剖析解读，让教育者系统掌握新课标的新特点、''新变化及新要求，解决在具体教学过程中遇到的新挑战，有效提升教学效能。</p><p>讲座现场，听众也就新课标相关问题向嘉宾发起了提问与交流。''从“学科应试”到“学科逻辑”，到系统化注重文化意识、思维品质、学习能力、语言能力等核心素养的''培养与提升，也在数十年的教学实操中见证了这一历程。后期，也将敏感关注并紧随信息化环境下的教学''改革，致力于培养具有中国情怀、国际视野和跨文化沟通能力的社会主义建设者和接班人。8年5月24日，就年初教育部门发布的《普通高中课程方案和语文等学科课程标准（2017年版）》，于''上海交通大学徐汇校区文治堂举行了“核心素养背景下的英语教学重大变革”专题讲座。新修订的课程标准确立了英语学科核心素养框架，并基于“学科核心素养”，设计了课程内容，明确''了学习活动观，研制了学业质量标准，提出了相关教学与评价建议。</p><p>上海市教师、曾连续36年耕耘于教学第一线的沈伟刚老师，作为嘉宾出席本次讲座。就新课标相关政''策、指导理念以及教学实操等，与事业部初、高段英语教师、客服等400余人展开了深度剖析与交流学习。''并向沈老师颁发了聘书。</p><p>本次讲座及聘请，进一步对如何落实课程目标与课程设计？如何理解课程内容与如何操作？如何在课堂上''落实新课标？如何利用信息技术促进教学等问题进行权威剖析解读，让教育者系统掌握新课标的新特点、''新变化及新要求，解决在具体教学过程中遇到的新挑战，有效提升教学效能。</p><p>讲座现场，听众也就新课标相关问题向嘉宾发起了提问与交流。''从“学科应试”到“学科逻辑”，到系统化注重文化意识、思维品质、学习能力、语言能力等核心素养的''培养与提升，也在数十年的教学实操中见证了这一历程。后期，也将敏感关注并紧随信息化环境下的教学''改革，致力于培养具有中国情怀、国际视野和跨文化沟通能力的社会主义建设者和接班人。2018年5月24日，就年初教育部门发布的《普通高中课程方案和语文等学科课程标准（2017年版）》，于''上海交通大学徐汇校区文治堂举行了“核心素养背景下的英语教学重大变革”专题讲座。''新修订的课程标准确立了英语学科核心素养框架，并基于“学科核心素养”，设计了课程内容，明确''了学习活动观，研制了学业质量标准，提出了相关教学与评价建议。</p>`
    },

    // 验证码图片uuid
    imgUUid:'',

    // 验证码图片
    codeImg:''
}};

const mutations = {
    updateLoginModel  (state,param) {
        state.loginModel = Object.assign({},state.loginModel,param)
    },
    updateForgetPassModel (state,param) {
      state.forgetPassModel = param
    },
    updateUser (state,param) {
      if (param.token) {
        setKey('xinyidai_Token',param.token)
      }
      
      state.user = param
    },
    updateInfoModel  (state,param) {
        state.infoModel = Object.assign({},state.infoModel,param)
    },
    updateBindeModel (state,param) {
      state.bindModel = Object.assign({},state.bindModel,param)
    },
    updateAreementModalInfo (state,param) {
      state.areementModalInfo = param
    },

    updateImgUUid (state,param) {
      state.imgUUid = param
    },
    updateCodeImg (state,param) {
      state.codeImg = param
    },

    
};

const actions = {

    openForgetModel ({commit}) {
        commit('updateForgetPassModel',true)
    },

    closeForgetModel ({commit}) {
        commit('updateForgetPassModel',false)
    },

    closeLoginModel ({commit}){
      commit('updateLoginModel',{show:false})
    },
    
    // 打开登录弹框
    openLogin ({commit}) {
      commit('updateLoginModel',{show:true,tab:1})
    },

    // 打开注册弹框
    openRegister ({commit,dispatch}) {
      commit('updateLoginModel',{show:true,tab:2})
      dispatch('getCodeImg')
    },

    // 打开信息填写窗口 showClose是否带关闭符号
    openInfo ({commit},showClose) {
      commit('updateInfoModel',{show:true,showClose:showClose?showClose:false})
    },
    // 关闭信息填写窗口
    closeInfo ({commit}) {
      commit('updateInfoModel',{show:false})
    },
    
    // 登录
    login ({commit},{param,scb,fcb}) {
        api.login(param)
        .then(data=>{
            commit('updateUser',data.data)
            setKey('xinyidai_Token',data.data.token)
            let router = getRouter();
            router.go(0)
            scb&&scb(data);
        })
        .catch((err)=>{
          fcb&&fcb(err);
        })
    },

    // 注册
    bind_mobile ({commit},{param,scb,fcb}) {
        api.bind_mobile(param)
        .then(data=>{
            commit('updateUser',data.data)
            scb&&scb(data);
        })
        .catch((err)=>{
          fcb&&fcb(err);
        })
    },
    
    // 忘记密码
    forgetPass ({commit},{param,scb,fcb}) {
      api.forget(param)
      .then(data=>{
          scb&&scb(data);
      })
      .catch((err)=>{
        fcb&&fcb(err);
      })
    },

    // 登出
    logout ({commit},{cb}){
        removeKey('xinyidai_Token');
        commit('updateUser',{});
        let router = getRouter();
        let path = router.history.current.path
        
        if (authList.some(item=>path.indexOf(item)>=0)) router.push('/');
        cb&&cb()
    },

    // 更新信息
    updateuserinfo ({commit,dispatch},{param,scb,fcb}) {
      api.userEdit(param)
      .then(data=>{
        dispatch('getUserInfoByToken')
        scb&&scb(data)
      })
      .catch(err=>{
        fcb&fcb(err)
      })
    },

    // 根据token获取用户信息
    async getUserInfoByToken ({commit},param) {
        param = param||{}
        let data = await api.get_user_info(param)
        commit('updateUser',data.data)
    },

    // 打开绑定弹出框
    openBindMobileDialog ({commit},showClose) {
      commit('updateBindeModel',{show:true,showClose:showClose?showClose:false})
    },

    // 关闭绑定弹出框
    closeBindMobileDialog ({commit},showClose) {
      commit('updateBindeModel',{show:false,showClose:showClose?showClose:false})
    },

    // 获取验证码
    getCodeImg ({commit}) {
        let timeStr = (new Date().getTime())+''
        let randomStr = Math.ceil(Math.random()*10000)+''
        commit('updateImgUUid',timeStr+randomStr);
        api.get_captcha({uuid:timeStr+randomStr})
        .then(data=>{
          commit('updateCodeImg',data.data.captcha)
        })
    },

    // 打开协议窗口
    openAgreement ({commit,state},param) {
        param = param||{}
        commit('updateAreementModalInfo',Object.assign({},state.areementModalInfo,param,{show:true}))
    },
    closeAgreement({commit,state},param){
      param = param||{}
      commit('updateAreementModalInfo',Object.assign({},state.areementModalInfo,param,{show:false}))
      state.areementModalInfo.areeCb&&state.areementModalInfo.areeCb()
    }


};

export default{
    namespaced: true,
    state,
    mutations,
    actions
}
