<!--
 * @Author: David
 * @Date: 2019-10-17 10:40:29
 * @LastEditTime: 2019-12-04 14:49:14
 * @LastEditors: Do not edit
 * @Description: 蓝色主按钮
 -->
<template>

  <button class="main-blue-button" 
  :style="getLinearBackground()"
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
          return 290
        }
      },
      height:{
        type:Number,
        default () {
          return 60;
        }
      },
      startColor:{
        type:String,
        default () {
          return 'rgb(85,185,253)';
        }
      },
      endColor:{
        type:String,
        default () {
          return 'rgb(5,102,206)';
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
  },
  computed:{
    
  },
  methods:{
    getLinearBackground () {
      if (process.client) {
          let prefix = this.BrowserType()
         return {width:this.width+'px',height:this.height+'px',borderRadius:this.height+'px',background:`${prefix}linear-gradient(top,${this.startColor} 0%,${this.endColor} 100%)`}
      }
      return {width:this.width+'px',height:this.height+'px',borderRadius:this.height+'px',background:`linear-gradient(top, ${this.startColor} 0%,${this.endColor} 100%)`}
    },
    BrowserType()
      {
        var OsObject = "";
       
        if(navigator.userAgent.indexOf("Firefox")>0){
          OsObject = "-moz-";
        }
        if(navigator.userAgent.indexOf("Safari")>0&&navigator.userAgent.indexOf("Chrome")<0) {
          OsObject = "-webkit-";
        }
        if(navigator.userAgent.indexOf("Chrome")>0){
         OsObject = "-webkit-";
        }
        if(navigator.userAgent.indexOf("opera")>0){
         OsObject = "-o-";
        }
        
         if (window.navigator.userAgent.indexOf("MSIE")>=1||window.navigator.userAgent.indexOf("Trident")>=1) {
            OsObject = "-ms-";
        }
        
        return OsObject;
      }
  }
}
</script>
<style lang="scss" scoped>
  @import '@/style/base.scss';
  .main-blue-button{
      display: flex;
      align-items: center;
      justify-content: center;
      font-size:18px;
      font-weight: bold;
      cursor: pointer;
      border:none;
      outline: none;
      background:none;
      background:linear-gradient(to bottom, lighten($baseBlueColor,50%) 0%,$baseBlueColor 100%);  
      &:active{
        background:linear-gradient(to bottom, lighten($baseBlueColor,5%) 0%,darken($baseBlueColor,20%) 100%) !important;  
      }
  }
</style>