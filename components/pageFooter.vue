<!--
 * @Author: David
 * @Date: 2019-10-17 14:46:51
 * @LastEditTime: 2019-11-29 10:05:17
 * @LastEditors: Do not edit
 * @Description: 页面底部
 -->
<template>
  <div class="footer-wrap"
  :style="{backgroundColor:bgColor}"
  >
    <p>
      <span>客服微信：{{setting.wechat}}</span>
      <span>联系电话：{{setting.telephone}}</span>
      <span>{{setting.aduit}}</span>
      <span>邮箱:{{setting.email}}</span>
    <p>
      <span>公司名称：{{setting.company_name}}</span>  
      <span>地址：{{setting.address}}</span> 
    </p>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  props:{
    bgColor:{
      type:String,
      default:'#fff'
    }
  },
  name:'pageFooter',
  data () {
    return {
      
    }
  },
  computed:{
    ...mapState({
      setting:state=>state.global.setting
    })
  }
}
</script>
<style lang="scss" scoped>
    .footer-wrap{
      width: 100%;
      height: 105px;
      padding-top:30px;
      text-align: center;
      p{
        font-size:16px;
        color:#333333;
        &:first-child{
          margin-bottom:16px;
        }
        span{
          margin-right:32px;
        }
      }
    }
</style>