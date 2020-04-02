<!--
 * @Author: David
 * @Date: 2019-10-17 10:40:29
 * @LastEditTime: 2019-12-04 14:08:01
 * @LastEditors: Do not edit
 * @Description: 红色主按钮
 -->
<template>

  <button class="main-red-button" 
  :style="{width:width+'px',height:height+'px',borderRadius:height+'px'}"
  @click="($event)=>$emit('click',$event)"
  >
      <span :style="{color:fontColor}">{{lable}}</span>
  </button>
  
</template>
<script>
export default {
  name:'mainBuleBtn',
  props:{
      lable:{
        type:String,
        required:true
      },
      width:{
        type:Number,
        default() {
          return 130
        }
      },
      height:{
        type:Number,
        default () {
          return 28;
        }
      },
      fontColor:{
        type:String,
        default () {
          return '#fff';
        }
      }
  },
  data () {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
  @import '@/style/base.scss';
  .main-red-button{
      display: flex;
      align-items: center;
      justify-content: center;
      font-size:14px;
      cursor: pointer;
      border:none;
      outline: none;
      background:none;
      background:$baseRedColor;  
      &:active{
        background:darken($baseRedColor,10%);  
      }
  }
</style>