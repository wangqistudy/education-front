<!--
 * @Author: David
 * @Date: 2019-10-17 13:45:19
 * @LastEditTime: 2019-12-04 09:30:23
 * @LastEditors: Do not edit
 * @Description: 
 -->
<template>
  <div class="new-card-wrapper" @click="$router.push(`/newsdetail/${info.id}`)">
      <div class="new-pic">
          <router-link :to="`/newsdetail/${info.id}`"><img :src="info.thumbnail" alt=""></router-link>
      </div>
      <div class="new-info">
        <h3 class="new-title ellipsis">
          <router-link :to="`/newsdetail/${info.id}`">{{info.title}}</router-link>
        </h3>
        <p :class="['new-preview',ieBorser?'ellipsis2':'ellipsis3']">
          {{info.brief_introduction}}
        </p>
        <p class="new-time">
          {{info.updated_at}}
        </p>
      </div>
  </div>
</template>
<script>
export default {
  name:'newCard',
  props:{
    info:{
      type:Object,
      default () {
        return {
          image:require('@/assets/new_demo.jpg'),
          title:'义务教育改革  提了哪些新要求？',
          content:'《中共中央 国务院关于深化教育教学改革全面提高义务教《中共中央 国务院关于深化教育教学改革全面提高义务教',
          time:'2019-09-09 09:44'
        }
      }
    }
  },
  data () {
    return {
      ieBorser:false
    }
  },
  mounted () {
    if (process.client) {
        if (this.isIE()) {
          this.ieBorser = true
        }
    }
  },
  methods:{
    isIE() {
        if (!!window.ActiveXObject || "ActiveXObject" in window){
            return true;
        }else{
            return false;
        }
    }    
  }
}
</script>
<style lang="scss" scoped>
    @import '@/style/base.scss';
    .new-card-wrapper{
      width: 575px;
      height:130px;
      padding-right:30px;
      display: flex;
      justify-content: space-between;
      cursor: pointer;
      .new-pic{
        width:170px;
        height:100%;
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
      }
      .new-info{
          width:365px;
          padding-top:12px;
          padding-bottom:14px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          p{
            color:#666666;
          }
          .new-title{
            font-size: 16px;
            color:#333;
            a:hover{
              color:$baseBlueColor;
            }
          }
        }
    }
  .ellipsis3 {
    display:-webkit-box;
    overflow:hidden;
    white-space:normal;
    text-overflow:ellipsis;
    word-wrap:break-word;
    -webkit-line-clamp:2;
    -webkit-box-orient:vertical;
  }
  .ellipsis2{
    position: relative; 
    line-height: 20px; 
    max-height: 40px;
    overflow: hidden;
  }
  .ellipsis2::after{
    content: "..."; 
    position: absolute; 
    bottom: 0; 
    right: 0; 
    padding-left: 40px;
    background: -webkit-linear-gradient(left, transparent, #f8f8f8 55%);
    background: -o-linear-gradient(right, transparent, #f8f8f8 55%);
    background: -moz-linear-gradient(right, transparent, #f8f8f8 55%);
    background: linear-gradient(to right, transparent, #f8f8f8 55%);
}
</style>