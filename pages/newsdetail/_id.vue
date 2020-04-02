<!--
 * @Author: David
 * @Date: 2019-10-16 09:21:37
 * @LastEditTime: 2019-12-04 15:35:14
 * @LastEditors: Do not edit
 * @Description: 关于我们
 -->
<template>
  <div class="news-wrap">
      <div class="news-inner">
        <div class="news-banner">
            <div class="img" :style="{backgroundImage:`url(${banner})`}"></div>
        </div>
        <div class="news-content" >
            <h1 class="news-title">{{title}}</h1>
            <div class="news-conten-inner" v-html="content">
              
            </div>
        </div>
      </div>
  </div>
</template>
<script>
import newsItem from '@/asyncData/newsItem'
import api from '@/utils/api'
export default {
  name:'aboutUs',
  asyncData:newsItem,
  data () {
    return {
      title:'',
      banner:'',
      content:``
    }
  },
  head () {
    return {
      title:'新闻详情-少儿编程教育',
      meta:[
        { hid: 'description', name: 'description', content: '少儿编程,教育,培训,英语,政治,历史,物理,化学,生物,语文,数学,线上选课,视频选课' }
      ]
    }
  },
  mounted () {
    if (process.client&&!this.firstRender) {
      this.firstRender = false
      this.getBanner()
      this.getInfo()
    }
  },
  methods:{
    async getBanner () {
       
        let bannerData = await api.banner_list({type:3})
        let banner;
        try{
          banner = bannerData.data[0].banner_url
        }catch(e){

        }
        this.banner = banner;
    },
   async getInfo () {
      let {id} = this.$route.params
      let param = {
        id
      }
      let infoData =  await api.news_detail(param)
      this.content = infoData.data.detail
      this.title = infoData.data.title
    }
  }
}
</script>
<style lang="scss" scoped>
    .news-wrap{
      width: 100%;
      .news-inner{
        width: 100%;
        .news-banner{
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
        .news-content{
          width:100%;
          background-color:#fff;
          min-height: 1029px;
          padding-top:37px;
          .news-title{
            font-size: 24px;
            color:#333;
            margin-bottom: 30px;
            text-align: center;
          }
          .news-conten-inner{
            width: 1200px;
            margin:0 auto;
            overflow: hidden;
            
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
