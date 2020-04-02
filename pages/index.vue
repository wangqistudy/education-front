<!--
 * @Author: David
 * @Date: 2019-10-16 09:21:37
 * @LastEditTime: 2019-12-04 15:31:53
 * @LastEditors: Do not edit
 * @Description: 
 -->
<template>
  <div class="home">
      <div class="homeInner">
          <!-- 浮动广告 -->
          <div class="float_ad" :class="{act:isAdAct}" v-if="isShowAd&&floatnews.id">
              <router-link :to="`/newsdetail/${floatnews.id}`">
                <img :src="floatnews.thumbnail" alt=""> 
              </router-link>
              <p class="close" @click="isShowAd=false">
                <i class="el-icon-circle-close" style="color:#666;"></i>
              </p>
          </div>


          <!-- banner图 -->
          <div class="banner-wrap">
              <div class="swiper-containers">
                  <swiper
                  :list="bannerList"
                  :pagination="true"
                  :autoplay="5000"
                  ref="mySwiper"
                  :loop="true"
                  >

                  </swiper>
              </div>
          </div>




          <!-- 选课中心 -->
          <div class="select-lesson-center indexBlock">
              <div class="lesson-list indexInner">
                  <infoHeader
                  title="选课中心"
                  color="#38aeff"
                  fontColor='#333333'
                  >

                  </infoHeader>

                  <div class="list">
                    <div class="lesson-list-wrap"
                      v-for="(lesson,index) in courseSelect"
                      :key="index"
                      :class="{right:index%2==1,left:index%2==0}"
                    >
                        <lessonCard
                        :info="lesson"
                        >

                        </lessonCard>
                    </div>
                      
                  </div>

                  <div class="more-btn-wrap">
                    <blueBtn
                    lable="查看更多课程"
                    @click="$router.push('/chooselesson')"
                    >

                    </blueBtn>
                  </div>

                  

                  
              </div>
          </div>

          <!-- 精英课程 -->
          <div class="et-center indexBlock">

            <div class="et-list indexInner">
              
                <infoHeader
                title="精英课程"
                color="#38aeff"
                fontColor='#333333'
                >

                </infoHeader>

                <div class="list">

                  <div class="et-list-wrap" 
                  v-for="(et,index) in etList"
                  :key="index"
                  >
                      <etCard
                      :info="et"
                      @click.native="$router.push(`/etdetail/${et.id}`)"
                      >
                        
                      </etCard>
                  </div>
                  
                </div>

            </div>
            
          </div>

          <!-- 名师展示 -->
          <div class="teacher-center indexBlock">
              <div class="teacher-list indexInner">
                  <infoHeader
                  title="名师展示"
                  color="#38aeff"
                  fontColor='#333333'
                  >

                  </infoHeader>

                  <div class="list">
                    <div class="teacher-list-wrap"
                      v-for="(teacher,index) in teachers"
                      :key="index"
                    >
                        <teacherCard
                        :info="teacher"
                        >

                        </teacherCard>
                    </div>
                      
                  </div>

                  <div class="more-btn-wrap">
                    <blueBtn
                    lable="查看更多名师"
                    @click="$router.push('/teacherdetail')"
                    >

                    </blueBtn>
                  </div>

                  

                  
              </div>
          </div>

          <!-- 新闻资讯 -->
          <div class="news-center indexBlock">
              <div class="news-list indexInner">
                  <infoHeader
                  title="新闻资讯"
                  color="#38aeff"
                  fontColor='#333333'
                  >

                  </infoHeader>

                  <div class="list">
                    <div class="news-list-wrap"
                      v-for="(news,index) in newsList"
                      :key="index"
                      :class="{right:index%2==1,left:index%2==0}"
                    >

                        <newCard
                        :info="news"
                        >

                        </newCard>
                       
                    </div>
                      
                  </div>

                  <div class="more-btn-wrap">
                    <blueBtn
                    lable="查看更多新闻"
                    @click="$router.push('/news')"
                    >

                    </blueBtn>
                  </div>

                  

                  
              </div>
          </div>


          <!-- 校区展示 -->
          <div class="area-center indexBlock">
              <div class="area-list indexInner">
                  <infoHeader
                  title="校区展示"
                  color="#38aeff"
                  fontColor='#333333'
                  endColor="#fff"
                  >

                  </infoHeader>

                  <div class="list">
                    <div class="area-list-wrap"
                      v-for="(area,index) in addressList"
                      :key="index"
                      :class="{right:index%2==1,left:index%2==0}"
                    >

                        <areaCard
                        :info="area"
                        >
  
                        </areaCard>
                       
                    </div>
                      
                  </div>

                  

                  
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import swiper from '@/components/swiper'
import infoHeader from '@/components/infoHeader'
import lessonCard from '@/components/lessonCard'
import blueBtn from '@/components/blueBtn'
import teacherCard from '@/components/teacherCard'
import newCard from '@/components/newCard'
import etCard from '@/components/etCard'
import areaCard from '@/components/areaCard'
import pageFooter from '@/components/pageFooter'
import {mapState,mapActions} from 'vuex'
import store from '@/store/index'

export default {
  name: 'home',
  components:{swiper,infoHeader,lessonCard,blueBtn,teacherCard,newCard,areaCard,pageFooter,etCard},
  data () {
    return {
      isAdAct:false,
      isShowAd:true,
      adSrc:require('@/assets/ad_demo.png')
    }
  },
  head () {
    return {
      title:'首页-少儿编程教育',
      meta:[
        { hid: 'description', name: 'description', content: '少儿编程,教育,培训,英语,政治,历史,物理,化学,生物,语文,数学,线上选课,视频选课' }
      ]
    }
  },
  async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
      if (process.client) {
        return {}
      }
      await store.dispatch('global/getTeachers')
      await store.dispatch('global/getNewsList')
      await store.dispatch('global/getAddressList')
      await store.dispatch('global/getEtList')
      await store.dispatch('global/getFloatNews')
      return {firstRender:true}
  },
  computed: {
    ...mapState({
      bannerList:state=>state.global.banners,
      courseSelect:state=>state.global.courseSelect,
      teachers:state=>state.global.teachers,
      newsList:state=>state.global.newsList,
      addressList:state=>state.global.addressList,
      etList:state=>state.global.etList,
      floatnews:state=>state.global.floatnews
    })
  },
  beforeDestroy () {
    if (process.client) {
      document.removeEventListener('scroll',this.$scrollList);  
    }
    
  },
  mounted() {
      if (process.client) {
          let scrollLis = ()=>{
          let top;
          if (document.documentElement){
            top = document.documentElement.scrollTop
          }else if (document.body){
            top = document.documentElement.scrollTop
          }
          if (top>=501) {
              this.isAdAct = true
          }else{
            this.isAdAct = false
          }
        }
        document.addEventListener('scroll',scrollLis)
        this.$scrollList = scrollLis
      }
      if (process.client&&!this.firstRender){
        this.firstRender = false;
        this.getTeachers()
        this.getNewsList()
        this.getAddressList()
        this.getEtList()
        this.getFloatNews()
      }
      
  },
  methods:{
    ...mapActions({
      getTeachers:'global/getTeachers',
      getNewsList:'global/getNewsList',
      getAddressList:'global/getAddressList',
      getEtList:'global/getEtList',
      getFloatNews:'global/getFloatNews',
    })
  }
}
</script>

<style lang="scss" scoped>
  @keyframes zoomIn {
    0% {
      transform: scale(0.95);
    }

    100% {
      transform: scale(1.05);
    }
  }
  .float_ad{
    position: absolute;
    top:436px;
    right:50px;
    width: 240px;
    height: 136px;
    z-index:200;
    img{
      transform-origin: center top;
      animation: zoomIn 0.8s linear 0s infinite alternate forwards;
    }
    cursor: pointer;
    &.act{
      position: fixed;
      top:40px;
      right:50px; 
    }
    .close{
      font-size:30px;
      top:-30px;
      right:-30px;
      position: absolute;
    }
    img{
      width:100%;
      height:100%;
    }
  }

  .home{
    width:100%;
    .homeInner{
      width:100%;
      padding-bottom:105px;
      position: relative;
      


      .banner-wrap{
        width: 100%;
        height:400px;
        .swiper-containers{
          width:100%;
          height:100%;
        }
      }
    }
    .indexBlock{
      padding-top:40px;
      padding-bottom:34px;
      &.et-center{
        background-color:#fff;
      }
      &.teacher-center{
        background-color:#fff;
        background-image:url('~@/assets/mingshi.png');
        background-position:center top;
        background-size:100% auto;
      }
      &.select-lesson-center{
        background-color:#f3f9fd;
        background-image:url('~@/assets/2bg-1.png');
        background-position:center top;
        background-size:100% auto;
      }
      &.news-center{
        background-color:#f8f8f8;
        background-image:url('~@/assets/2bg-2.png');
        background-position:center top;
        background-size:100% auto;
      }
      &.area-center{
        background:#fff;
      }
      .indexInner{
        width:1200px;
        margin:0 auto;
        .more-btn-wrap{
          padding-top:20px;
          display: flex;
          justify-content: center;
        }
      }
      .et-list{
         
         .list{
           margin-top:37px;
            // overflow: hidden;
          
            width:100%;
           display: flex;
           justify-content: space-between;
         }
      }
      .teacher-list{
        .list{
          width:100%;
          margin-top:37px;
          overflow: hidden;
          display: flex;
          justify-content: space-between;
        }
        .more-btn-wrap{
          padding-top:37px;
        }
      }
      .lesson-list{
        .list{
          width:100%;
          margin-top:27px;
          overflow: hidden;
          padding-top:10px;
          .lesson-list-wrap{
            margin-bottom:30px;
            max-width: 580px;
            width: 50%;
            &.right{
              float: right;
            }
            &.left{
              float: left;
            }
          }
        }
        
      }

      .news-list{
        .list{
          width:100%;
          margin-top:37px;
          overflow: hidden;
          .news-list-wrap{
            margin-bottom:20px;
            &.right{
              float: right;
            }
            &.left{
              float: left;
            }
          }
        }
        
      }

      .area-list{
        .list{
          width:100%;
          margin-top:37px;
          overflow: hidden;
          .area-list-wrap{
            margin-bottom:64px;
            &.right{
              float: right;
            }
            &.left{
              float: left;
            }
          }
        }
        
      }
      
    }
  }

    
</style>
