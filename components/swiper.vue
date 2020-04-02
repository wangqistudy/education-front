<!--
 * @Author: David
 * @Date: 2019-10-16 14:54:14
 * @LastEditTime: 2019-11-08 10:48:54
 * @LastEditors: Do not edit
 * @Description: 轮播组件
 -->
<template>
  <div class="swipeContain">
      <div class="swiper-container" id="swiper_banner">
          <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item,index) in list" :key="index">
                  
                  <div class="img" :style="{backgroundImage:`url(${item.banner_url})`}">
                    <a :href="item.dest_url" target="_blank"></a>
                  </div>
              </div>
          </div>
          <div class="swiper-pagination"></div>
      </div>
  </div>
</template>
<script>
let Swiper ;
if (process.client) {
  Swiper = require('swiper')
}
export default {
  name:'swiper',
  props:{
    list:{
      type:Array,
      required:true
    },
    pagination:{
      type:Boolean,
      default:true
    },
    paginationColor:{
      type:String,
      default:'#ff3b50'
    },
    autoplay:{
      type:[Number,Boolean],
      default:false
    },
    loop:{
      type:Boolean,
      default:false
    }
  },
  data () {
    return {
        $swiper:null
    }
  },
  watch:{
    list:{
      handler () {
        if (this.$swiper){
          setTimeout(() => {
            this.$swiper.update(true)
          });
        }else{
          this.initSwiper()
        }
      },
      deep:true
    }
  },
  mounted () {
    this.$nextTick(()=>{
      if (!this.$swiper){
        this.initSwiper()
      }
    })
  },
  methods:{
    initSwiper () {
        let options = {

        }
        if (this.pagination) {
            options.pagination = '.swiper-pagination'
        }
        if (this.autoplay) {
            options.autoplay = this.autoplay>0?this.autoplay:5000
            options.autoplayDisableOnInteraction = false
        }
        if (this.loop){
            options.loop = this.loop
        }      
        this.$swiper = new Swiper('#swiper_banner',options)
    }
  }
}
</script>
<style lang="scss" scoped>

  .swipeContain{
    width:100%;
    height:100%;
    overflow: hidden;
    .swiper-container{
      width:100%;
      height:100%;
    }
    .swiper-slide{
      .img{
        width:100%;
        height:100%;
        background-position: center top;
        background-repeat: no-repeat;
        background-size: cover;
        a{
          display: block;
          width:100%;
          height: 100%;
        }
      }
    }
    .swiper-pagination{
      /deep/.swiper-pagination-bullet{
        width: 12px;
        height:12px;
        background: #aaaaaa;
        opacity: 1;
        &.swiper-pagination-bullet-active{
          opacity: 1;
          background:#ff3b50;
        }
      }
    }
  }

</style>