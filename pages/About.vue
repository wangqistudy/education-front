<!--
 * @Author: David
 * @Date: 2019-10-16 09:21:37
 * @LastEditTime: 2019-12-04 15:34:11
 * @LastEditors: Do not edit
 * @Description: 关于我们
 -->
<template>
  <div class="about-us-wrap">
      <div class="about-us-inner">
        <div class="about-us-banner">
            <div class="img" :style="{backgroundImage:`url(${banner})`}"></div>
        </div>
        <div class="about-us-content" >
            <div class="about-us-conten-inner" v-html="content">
              
            </div>
        </div>
      </div>
  </div>
</template>
<script>
import about_us from '@/asyncData/about_us'
import api from '@/utils/api'
export default {
  name:'aboutUs',
  asyncData:about_us,
  data () {
    return {
      banner:'',
      content:``
    }
  },
  head () {
    return {
      title:'关于我们-少儿编程教育',
      meta:[
        { hid: 'description', name: 'description', content: '少儿编程,教育,培训,英语,政治,历史,物理,化学,生物,语文,数学,线上选课,视频选课' }
      ]
    }
  },
  mounted () {
    if (process.client&&!this.firstRender){
      this.firstRender = false
      this.getBanner()
      this.getDetail()
    }
  },
  methods:{
    async getBanner () {
      let bannerData = await api.banner_list({type:4})
      let banner;
      try{
        banner = bannerData.data[0].banner_url
      }catch(e){

      }
      this.banner = banner
      return banner;
    },
    async getDetail () {
        let infoData =  await api.about_us_detail()
        this.content = infoData.data.detail
        return infoData;
    }
  }
}
</script>
<style lang="scss" scoped>
    .about-us-wrap{
      width: 100%;
      .about-us-inner{
        width: 100%;
        .about-us-banner{
          width: 100%;
          height: 220px;
          .img{
            width: 100%;
            height: 100%;
            background-position: center top;
            background-repeat: no-repeat;
            background-size: cover;
          }
        }
        .about-us-content{
          width:100%;
          background-color:#fff;
          min-height: 1029px;
          .about-us-conten-inner{
            width: 1200px;
            margin:0 auto;
            overflow: hidden;
            padding-top:37px;
            font-size:16px;
            color:#666;
            line-height: 30px;
            /deep/p{
             
              text-indent:2em;
            }
            /deep/img{
              max-width: 80%;
              margin :20px auto;
              display: block;
            }
          }
        }
      }
    }
</style>
