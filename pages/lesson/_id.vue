<!--
 * @Author: David
 * @Date: 2019-10-22 09:03:00
 * @LastEditTime: 2019-12-04 15:34:57
 * @LastEditors: Do not edit
 * @Description: 课程详情
 -->
<template>
  <div class="lesson-detail-wrap">
      <div class="lesson-detail-inner">
          <div class="detail-container">
              
              <!-- 详情面板 -->
              <div class="detail-panel">
                <div class="detail-panel-inner">
                    <div class="detail-pic">
                        <img :src="info.thumbnail" alt="">
                    </div>
                    <div class="detail-info">
                        <h2 class="lesson-title">
                            {{info.name}}
                        </h2>

                        <p class="lesson-time">
                          上课时间：{{info.class_start_date|localtimeFilter}} - {{info.class_end_date|localtimeFilter}}
                        </p>

                        <p class="lesson-teacher">
                          <span>主讲老师： <router-link :to="`/teacher/${getTeacher.id}`">{{getTeacher.teacher_name}}</router-link> </span>  
                          <span>总共课时：<span>{{info.class_hour}}</span>课时</span>  
                          <span>剩余名额：<span>{{info.total_num-info.selected_num}}</span></span>  
                        </p>

                        <p class="leasson-leave">
                          授课校区：{{info.school_name}}
                        </p>
                        <p class="lesson-price">
                          <span>￥</span>
                          <span>{{info.source_price}}</span>
                        </p>

                        <div class="button-list">

                            <el-button class="collect-btn" @click="handleCollect"> 
                              {{info.isCollected==1?'取消收藏':'收藏课程'}}
                            </el-button>

                            <el-button class="join-btn" @click="handleAdd"> 
                              立即报名
                            </el-button>
                            
                        </div>
                    </div>
                </div>

                <div class="lesson-list">
                    <span class="table-label">
                        课程安排：
                    </span>
                    <div class="order-list">
                        <el-table
                        :data="tableData"
                        header-row-class-name="headrow"
                        header-cell-class-name="headrowcell"
                        >

                          
                          
                          <el-table-column
                          type="index"
                          label="序号"
                          header-align="center"
                          align="center"
                          >

                          </el-table-column>

                          <el-table-column
                          prop="class_date"
                          label="日期"
                          header-align="center"
                          align="center"
                          min-width="120px"
                          >

                            
                          </el-table-column>

                          <el-table-column
                          label="时间"
                          header-align="center"
                          align="center"
                          >
                              <template slot-scope="scope">
                                <span>{{(scope.row.class_date+' '+scope.row.class_time_start)|filterSeconds}}
                                      至
                                      {{(scope.row.class_date+' '+scope.row.class_time_end)|filterSeconds}}
                                </span>
                              </template>

                          </el-table-column>

                          <el-table-column
                          prop="weekName"
                          label="星期"
                          header-align="center"
                          align="center"
                          min-width="120px"
                          >

                          </el-table-column>
                          
                          <el-table-column
                          prop="hour_num"
                          :label="`课时数(${getHourNum})`"
                          header-align="center"
                          align="center"
                          min-width="120px"
                          >

                          </el-table-column>

                          


                          <el-table-column
                          prop="teacherName"
                          label="主讲老师"
                          header-align="center"
                          align="center"
                          
                          >

                          </el-table-column>


                        </el-table>

                        <div class="pagination">
                          <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page.sync="currPage"
                            :page-size="pageSize"
                            layout="prev, pager, next, jumper"
                            :total="totalCount">
                          </el-pagination>
                        </div>
                    </div>
                </div>
                  
                  
              </div>

              <!-- 详情介绍 -->
              <div class="detail-content">
                  <div class="content-header">
                      <span>课程详情</span>
                  </div>
                  <div class="contentHtml" >
                      <div class="real-content" v-html="info.detail">
                          
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
import pagination from '@/mixins/pagination'
import viewTime from '@/mixins/viewTime'
import lessonItem from '@/asyncData/lessonItem'
import {mapActions, mapState} from 'vuex'
export default {
  name:'lessonDetail',
  mixins:[pagination,viewTime],
  asyncData:lessonItem,
  mounted() {
    if (process.client&&!this.firstRender){
      this.firstRender = false
      this.getInfo()
    }
    
  },
  head () {
    return {
      title:'课程详情-少儿编程教育',
      meta:[
        { hid: 'description', name: 'description', content: '少儿编程,教育,培训,英语,政治,历史,物理,化学,生物,语文,数学,线上选课,视频选课' }
      ]
    }
  },
  data () {
    return {
      listApi:api.course_hours,
      info:{
        src:require('@/assets/lesson_demo.jpg'),
        title:'2019初中数学秋季课',
        time:'9月11日-1月1日    每周三19：00-21：00',
        teacher:'宋诗雨',
        totalCount:15,
        lessonLeave:76,
        prize:1950,
        address:'蜀山区校区（合肥市蜀山区黄山路456号王城大厦2楼）',
        desc:`<p><br></p><p><span class="fr-video fr-dvb fr-draggable" contenteditable="false" draggable="true"><video class="fr-draggable" controls="" src="https://s3-eu-west-1.amazonaws.com/froala-eu/temp_files%2F1571712281909-ef24cf8445dba45ad259910635d16c68.mp4" style="width: 678px; height: 383px;">Your browser does not support HTML5 video.</video></span><img class="fr-fir fr-dii" width="200" src="https://cdn0.froala.com/assets/editor/pages/v3/editor-photo-0c6048e9ae73fe1da41b5e805324e919.png" alt="Editor photo"></p><p><br></p><p>Froala Editor is a lightweight WYSIWYG HTML Editor written in Javascript that enables rich text editing capabilities for your applications. <span class="fr-emoticon fr-deletable fr-emoticon-img" style="background: url(https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/1f600.svg);">&nbsp;</span>&nbsp;</p><p>Its complete <a href="/wysiwyg-editor/v2.0/docs" title="Documentation"><i class="fa fa-book fr-deletable"></i> documentation</a>, specially designed <a href="#frameworks" title="Frameworks"><i class="fa fa-puzzle-piece fr-deletable"></i> framework plugins</a> and <a href="/wysiwyg-editor/v2.0/examples" title="Examples">tons of examples</a> make it easy to integrate. We&#39;re continuously working to add in new features and take the Javascript web WYSIWYG editing capabilities beyond its current limits.</p>`
      },
      
      
    }
  },
  computed: {
    getHourNum () {
      let count = 0;
      if (this.tableData.length>0) {
        count = this.tableData.reduce((sum,curr)=>{
            return sum +curr.hour_num
        },count)
      }
      return count;
    },
    isShowTeacher () {
      return this.info.teachers&&this.info.teachers[1]&&this.info.teachers[1].length>0
    },
    getTeacher () {
      if (!this.isShowTeacher){
        return {
          id:'',
          teacher_name:'未知'
        }
      }
      return {
        id:this.info.teachers[1][0].teacher_id,
        teacher_name:this.info.teachers[1][0].teacher_name
      }
    },
    ...mapState({
      enteredDocument:state=>state.global.enteredDocument
    })
  },
  filters:{
    localtimeFilter (str) {
        return moment(str).format('LL')
    },
    filterSeconds (str) {
      // console.log(str)
      return moment(str).format('HH:mm')
    }
  },
  methods: {
   
    ...mapActions({
        openAgreement:'user/openAgreement',
        closeAgreement:'user/closeAgreement',
    }), 
    handleAdd () {
      let areeCb = () =>{
          let course_id = this.info.id
          api.course_order_create({course_id})
          .then(data=>{
              this.$router.push('/order/'+data.data.id)
              areeCb = null;
          })
      }
      this.openAgreement({
        title:'报名协议',
        content:this.enteredDocument,
        areeCb
      })
    },
    getInfo () {
      let id = this.$route.params.id
      if (id) {
        this.setDataFilters(Object.assign({},this.dataFilters,{id}))
      }
      api.course_detail({id})
      .then(data=>{
        let {searchLogId} = data.data
        this.searchLogId = searchLogId
        this.$set(this,'info',data.data)
        this.getList({id:this.info.id})
      })
    },
    handleCollect () {
        if (this.info.isCollected==0) {
          this.addCollect()
        }
        if (this.info.isCollected==1) {
          this.removeCollect()
        }
    },
    addCollect () {
      let id = this.info.id
      api.course_collector_add({course_id:id})
      .then((data)=>{
          this.info.isCollected = 1
      })
    },
    removeCollect () {
      let id = this.info.id
      api.course_collector_remove({course_id:id})
      .then((data)=>{
          this.info.isCollected = 0
      })
    }
  },
}
</script>
<style lang="scss" scoped>
  .lesson-detail-wrap{
    width:100%;
    .lesson-detail-inner{
      width:100%;
      .detail-container{
        width:1200px;
        margin:0 auto;
        padding-top:20px;
        .detail-panel{
          width:100%;
          padding:15px 0 30px 20px;
          background-color:#fff;
          .detail-panel-inner{
            display:flex;
            align-items: center;
            .detail-pic{
              width: 342px;
              height: 240px;
              border-radius: 10px;
              overflow: hidden;
              img{
                width:100%;
                height:100%;
                object-fit: cover;
              }
            }
            .detail-info{
              margin-left:24px;
              padding:10px 0;
              .lesson-title{
                font-size:24px;
                font-weight: 500;
                margin-bottom:15px;
              }
              .lesson-time{
                color: #333333;;
                font-size:16px;
                margin-bottom:15px;
              }
              .lesson-teacher{
                margin-bottom:15px;
                font-size:16px;
                &>span:first-child{
                  a{
                    color:#4e97fc;
                  }
                  margin-right:25px;
                }
                &>span:nth-child(2){
                  margin-right:25px;
                  span{
                    color:#ff3b50;
                  }
                }
                &>span:last-child{
                  span{
                    color:#ff3b50;
                  }
                }
              }
              .leasson-leave{
                font-size:16px;
                margin-bottom:15px;
              }
              .lesson-price{
                display: flex;
                align-items: flex-end;
                color:#ff3b50;
                margin-bottom:18px;
                span:first-child{
                  font-size:16px;
                }
                span:last-child{
                  font-size:23px;
                }
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
          .lesson-list{
            width: 100%;
            padding-left:90px;
            position: relative;
            margin-top:20px;
            padding-right: 90px;
            .table-label{
              position: absolute;
              top:0;
              width: 90px;
              left: 0;
              text-align: right;
              line-height: 40px;
              font-size:16px;
              color:#333333;
            }
          }
        }

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
                margin-top:32px;
            }
            .contentHtml{
              min-height: 720px;
              .real-content{
                width:926px;
                margin:0 auto;
                padding-top:24px;
              }
            }
        }
      }
    }
  }

  .order-list{
    background-color:#fff;
    /deep/.headrow{
      height: 40px;
    }
    /deep/.headrowcell{
      background-color:#e3f1ff;
      font-size: 14px;
      font-weight: 400;
    }
    /deep/.has-gutter{
      color:#0566ce;
    }
    .pagination{
      padding:10px 0;
      border-top:1px solid #ddd;
    }
  }
  .real-content{
    /deep/img{
      max-width: 80%;
    }
  }
</style>