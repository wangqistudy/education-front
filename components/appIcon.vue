<!--
 * @Author: David
 * @Date: 2019-10-17 10:06:27
 * @LastEditTime: 2019-10-21 09:19:58
 * @LastEditors: Do not edit
 * @Description: 图片
 -->
<template>
  <div class="iconfont"
  :style="{width:size+'em',height:size+'em'}"
  >
    <svg class="icon" aria-hidden="true"
    :style="{width:size+'em',height:size+'em',fill:color}"
    >
        <use :xlink:href="`#${iconName}`"></use>
    </svg>
  </div>
</template>
<script>
export default {
  name:'appIcon',
  props:{
    iconName:{
      type:String,
      required:true
    },
    size:{
      type:Number,
      required:true
    },
    color:{
      type:String,
      default:''
    }
  },
  data () {
    return {
      
    }
  }
}
</script>
<style lang="scss" scoped>
  .iconfont{
    display: inline-block;
  }
</style>