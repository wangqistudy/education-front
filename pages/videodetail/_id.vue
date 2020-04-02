<!--
 * @Author: David
 * @Date: 2019-10-22 09:03:00
 * @LastEditTime: 2019-12-04 15:36:50
 * @LastEditors: Do not edit
 * @Description: 视频详情
 -->
<template>
  <div class="video-detail-wrap">
      <div class="video-detail-inner">
          <div class="detail-container">

              <!-- 详情介绍 -->
              <div class="detail-content">
                  <div class="content-header">
                      <span>课程详情</span>
                  </div>
                  <div class="contentHtml" >
                      <div class="lesson-hours">
                         <h2 class="header-name">
                          {{info.title}}
                        </h2>
                      </div>
                      <div class="video_desc">
                          <div class="header">
                            
                            <p class="header-desc">
                              <span class="teacher">主讲： <router-link :to="`/teacher/${info.teacher_id}`">{{info.teacherName}}</router-link> </span>
                            </p>
                          </div>

                          <div class="video-content" >
                              <video id="video" controls preload="none" width="680" height="382" v-if="info.url" 
                              :poster="info.thumbnail"
                              >
                                <source :src="info.url" type='video/mp4' />
                              </video>
                          </div>
                      </div>

                      <div class="lesson-hours">
                          <h3>课程大纲 </h3>
                          <div class="outline" v-html="info.detail">
                            
                          </div>
                      </div>
                  </div>
              </div>


          </div>
      </div>
  </div>
</template>
<script>
import  api from '@/utils/api'
import moment from '@/utils/localMoment'
import videoItem from '@/asyncData/videoItem'
import viewTime from '@/mixins/viewTime'
export default {
  name:'videoDetail',
  asyncData:videoItem,
  mixins:[viewTime],
  mounted() {
      if (process.client&&!this.firstRender) {
        this.firstRender = false
        this.getInfo()
      }
  },
  head () {
    return {
      title:'视频详情-少儿编程教育',
      meta:[
        { hid: 'description', name: 'description', content: '少儿编程,教育,培训,英语,政治,历史,物理,化学,生物,语文,数学,线上选课,视频选课' }
      ]
    }
  },
  data () {
    return {
      
      info:{
          
      }
      
      
    }
  },
  computed: {
    
  },
  filters:{
    localtimeFilter (str) {
        return moment(str).format('LL')
    }
  },
  methods: {
    
    getInfo () {
      return new Promise((res,rej)=>{
        let id = this.$route.params.id
        api.video_detail({id})
        .then(data=>{
          this.info = data.data
          res()
        })
        .catch(()=>{
          rej()
        })
      })
      

    }
  },
}
</script>
<style lang="scss" scoped>
  .video-detail-wrap{
    width:100%;
    .video-detail-inner{
      width:100%;
      .detail-container{
        width:1200px;
        margin:0 auto;
        padding-top:20px;
        .detail-content{
            width:100%;
            background-color:#fff;
            .content-header{
                width: 100%;
                height: 50px;
                background-color:#e3f1ff;
                line-height: 50px;
                padding-left:36px;
                color:#0566ce;
                font-size:16px;
            }
            .contentHtml{
              min-height: 720px;
              .video_desc{
                width:680px;
                margin:0 auto;
                padding-top:10px;
                .header{
                  display:flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-bottom:30px;
                  padding:0 10px;
                  h2{
                    font-size:16px;
                    color:#333333;
                  }
                  p{
                    font-size:14px;
                    .teacher{
                      // margin-right:31px;
                      a{
                        color:#0566ce;
                      }
                    }
                    .lessonCount{
                      span{
                        color:#ff7885;
                      }
                    }
                  }
                }
                .video-content{
                  width:100%;
                  height: 382px;
                  background-color:#000;
                  #video{
                    width: 100%;
                    height: 100%;
                  }
                }
              }

              .lesson-hours{
                width:1000px;
                margin:0 auto;
                margin-top:38px;
                .header-name{
                  font-size: 16px;
                  color: #333333;
                }
                h3{
                  font-size:16px;
                  color:#333333;
                }
                .outline{
                  padding-left:38px;
                  padding-top:20px;
                  /deep/img{
                    max-width:80%;
                    margin-bottom: 20px;
                  }
                  /deep/p{
                    text-indent: 2em;
                    margin-bottom:20px;
                  }
                }
              }

            }
        }
      }
    }
  }
</style>