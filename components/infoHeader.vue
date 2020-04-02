<!--
 * @Author: David
 * @Date: 2019-09-02 18:18:20
 * @LastEditTime: 2019-12-04 14:36:37
 * @LastEditors: Do not edit
 * @Description: 信息头部
 -->
<template>
  <div class="part-header">
      <span class="line" :style="getStyle1" ref="lineLeft"></span>
      <span class="title" :style="{color:fontColor}">{{title}}</span>
      <span class="line" :style="getStyle2" ref="lineRight"></span>
  </div>
</template>
<script>
export default {
  name:'partHeader',
  computed: {
    
  },
  data () {
    return {
      getStyle1:{},
      getStyle2:{}
    }
  },
  mounted () {
      this.getStyle1 = this.getStyle1M()
      this.getStyle2 = this.getStyle2M()
  },
  props:{
    title:{
      type:String,
      required:true
    },
    color:{
      type:String,
      required:true
    },
    endColor:{
      type:String,
      default:'rgba(255,255,255,0)'
    },
    fontColor:{
      type:String,
      required:true
    }
  },
  methods: {
    getStyle1M () {
      if (process.client) {
        let prefix = this.BrowserType()
        return {
          background:`${prefix}linear-gradient(left,${this.endColor} 0%,${this.color} 50%,${this.color} 100%)`,
          
        }
      }
    },
    getStyle2M () {
      if (process.client) {
        let prefix = this.BrowserType()
        return {
          background:`${prefix}linear-gradient(left,${this.color} 0%,${this.color} 50%,${this.endColor} 100%)`,
          
        }
      }
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
  },
}
</script>
<style lang="scss" scopee>
    .part-header{
      width:1200px;
      margin:0 auto;
      display:flex;
      justify-content: space-between;
      align-items: center;
      .title{
        font-size:30px;
        font-weight: bold;
      }
      .line{
        width:500px;
        height:4px;
        &:first-child{
          // background:linear-gradient(left,rgb(255,255,255),#38aeff);  
          // background:filter:"progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=red,endColorstr=blue)";
        }
        &:last-child{
          // background:linear-gradient(left,#38aeff,#fff);  
        }
      }
    }
</style>
