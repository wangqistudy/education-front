<!--
 * @Author: David
 * @Date: 2019-10-22 11:18:29
 * @LastEditTime: 2019-12-04 15:35:52
 * @LastEditors: Do not edit
 * @Description: 老师详情
 -->
<template>
  <div class="teacher-info-wrap">
      <div class="teacher-info-inner">
          <div class="teacher-header-mg">
            <div class="img" :style="{backgroundImage:`url(${heaerImg})`}"></div>
          </div>
          <div class="main-content">
              <div class="nav-block">
                <span>
                  <router-link to="/teacherdetail">名师列表</router-link>  
                </span> 
                <span>&gt;</span> 
                <span>名师详情</span>
              </div>

              <div class="info-content">
                  <div class="info-panel">
                    <div class="info-avatar">
                      <div class="avatar-wrap">
                        <img :src="info.thumbnail" alt="">  
                      </div>
                    </div>
                    <div class="info-detial">
                        <h2 class="teachername">
                          <span>{{info.name}}老师</span>
                          <span>|</span>
                          <span>{{info.educationLevelName}}</span>
                        </h2>
                        <p>教学科目：{{info.subjectName}}</p>
                        <p>毕业院校：{{info.school}}</p>
                        <div class="button-list">

                            <el-button class="collect-btn" @click="handleCollect"> 
                              {{info.isCollected==0?'点击收藏':'取消收藏'}}
                            </el-button>

                            <el-button class="join-btn" @click="$router.push('/chooselesson?teacher='+info.id)"> 
                              立即报名
                            </el-button>
                            
                        </div>
                    </div>
                    
                  </div>
              </div>

              <div class="info-desc">
                <h2>老师简介</h2>
                <div class="desc" v-html="info.detail" v-if="info.detail">
                  
                </div>
                <div class="desc" v-else>
                  暂无
                </div>
              </div>
              
          </div>
      </div>
  </div>
</template>
<script>
import api from '@/utils/api'
import teacherItem from '@/asyncData/teacherItem'
import viewTime from '@/mixins/viewTime'
export default {
  name:'teacherInfo',
  asyncData:teacherItem,
  mixins:[viewTime],
  data () {
    return {
      heaerImg:'',
      info:{
        avatar:``,
        name:'',
        graduation:'',
        content:``
      }
    }
  },
  head () {
    return {
      title:'老师详情-少儿编程教育',
      meta:[
        { hid: 'description', name: 'description', content: '少儿编程,教育,培训,英语,政治,历史,物理,化学,生物,语文,数学,线上选课,视频选课' }
      ]
    }
  },
  mounted() {
    if (process.client&&!this.firstRender) {
      this.firstRender = false
      this.getBanners()
      this.getInfo()
    }
  },
  methods:{
    
    getBanners () {
      api.banner_list({type:2})
      .then(data=>{
        try{
          this.heaerImg = data.data[0].banner_url
        }catch(e){
          
        }
        
      })
    },
    getInfo () {
      let id = this.$route.params.id
      api.teacher_detail({id})
      .then(data=>{
        this.info = data.data
      })

    },
    handleCollect () {
      if (this.info.isCollected==0){
        this.collect_add()
      }
      if (this.info.isCollected==1) {
        this.collect_remove()
      }
    },
    collect_add () {
      let teacher_id = this.info.id
      api.teacher_collector_add({teacher_id})
      .then(data=>{
        this.info.isCollected = 1
      })
    },
    collect_remove () {
      let teacher_id = this.info.id
      api.teacher_collector_remove({teacher_id})
      .then(data=>{
        this.info.isCollected = 0
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .teacher-info-wrap{
    width:100%;
    .teacher-info-inner{
      width:100%;
      background-color:#fff;
      .teacher-header-mg{
          width:100%;
          height: 220px;
          .img{
            width: 100%;
            height: 100%;
            background-position: center top;
            background-repeat: no-repeat;
            background-size: cover;
          }
        }
        .main-content{
          width:1200px;
          margin:0 auto;
          padding-top:24px;
          padding-bottom:103px;
          .nav-block{
            margin-bottom:28px;
            font-size:16px;
            color:#333333;
            span:nth-child(2){
              margin:0 15px;
            }
            span:nth-child(1){
              cursor: pointer;
              a:hover{
                color:#0566ce;
              }
            }
            span:nth-child(3){
              cursor: pointer;
              color:#0566ce;
            }
          }
          .info-content{
            width:100%;
            .info-panel{
              display:flex;
              align-items: center;
              .info-avatar{
                width: 230px;
                height:230px;
                background-color:#38aeff;
                border-radius: 230px;
                padding:4px;
                margin-right:30px;
                .avatar-wrap{
                  width:100%;
                  height:100%;
                  border-radius:100%;
                  overflow: hidden;
                  img{
                    width:100%;
                    height:100%;
                    object-fit: cover;
                  }
                }
              }
              .info-detial{
                .teachername{
                  margin-bottom:16px;
                }
                p{
                  line-height: 34px;
                  font-size:18px;
                }
                .button-list{
                  margin-top:32px;
                }
                .teachername>span:nth-child(2){
                  margin:0 15px;
                }
                .button-list{
                  .collect-btn{
                    color: #ff6c4a;
                    border-color:#ff6c4a;
                  }
                  .join-btn{
                    border-color:#ff6c4a;
                    background-color:#ff6c4a;
                    color:#fff;
                    &:active{
                      background-color:darken( #ff6c4a, 10%);
                    }
                  }
                }
              }
            }
          }
          .info-desc{
            margin-top:37px;
            .desc{
              padding-left:20px;
              margin-top:20px;
              line-height: 25px;
              font-size:16px;
              color:#333333;
            }
            h2{
              font-size:30px;
              color:#333333;
              padding-left:20px;
              position: relative;
              line-height: 30px;
              &::before{
                content:'';
                position: absolute;
                
                width: 4px;
                top:0;
                bottom:0;
                left:0;
                background-color:#66a6ff;
                
              }
            }
          }
        }
    }
  }
</style>