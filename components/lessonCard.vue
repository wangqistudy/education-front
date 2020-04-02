<!--
 * @Author: David
 * @Date: 2019-10-17 08:57:10
 * @LastEditTime: 2019-12-05 15:30:32
 * @LastEditors: Do not edit
 * @Description: 课程卡片
 -->
<template>
  <div class="lesson-card-wrap" @click="$router.push(`/lesson/${info.course_id||info.id}`)">
      <div class="lesson-cover">
        <router-link :to="`/lesson/${info.course_id||info.id}`">
          <img :src="info.thumbnail" alt="">
        </router-link>
      </div>
      <div class="lesson-info">
          <div class="base-info">
            <h3 class="lesson_head">
              <p class="lesson_name">
                <router-link :to="`/lesson/${info.course_id||info.id}`">{{info.name}}</router-link>
              </p>
              <p>
                <span class="money_type">￥</span>
                <span class="lesson_price">{{info.source_price}}</span>
              </p>
              
            </h3>

            <p class="lesson_time ellipsis">{{info.class_start_date|localtimeFilter}} - {{info.class_end_date|localtimeFilter}}</p>

            <p class="lesson_teacher">
              <span class="teacher" v-if="info.teachers[1]&&info.teachers[1].length">
                主讲:<router-link  v-for="(teacher,index) in info.teachers[1]" :key="index" :to="`/teacher/${teacher.teacher_id}`">{{teacher.teacher_name}}{{index==(info.teachers[1].length-1)?'':','}}</router-link>
              </span>
              <span class="lesson_count">
                课时:{{info.class_hour}}
              </span>
            </p>

            <p class="lesson_schooleName">
              <span>校区:{{info.schoolName||'--'}}</span>
            </p>
            
          </div>
          <div class="opt-info">
              <div class="p">
                <span class="lesson-leave">
                    剩余名额：{{(info.left_num>=0?(info.left_num+''):0)||info.leftNum}}
                </span>
                <div class="lesson-collect" 
                @click.stop="handleCollect"
                >
                    <appIcon
                    iconName="icon-yishoucang"
                    :size="1.2"
                    v-if="info.isCollected==1"
                    >

                    </appIcon>
                    <appIcon
                    iconName="icon-shoucang"
                    :size="1.2"
                    v-else
                    >

                    </appIcon>

                    
                    <span :class="{collected:info.isCollected==1}">
                      {{info.isCollected==1?'已收藏':'收藏'}}
                    </span>
                </div>
              </div>
              
          </div>
      </div>
  </div>
</template>
<script>
import appIcon from '@/components/appIcon'
import moment from '@/utils/localMoment'
import api from '@/utils/api'
export default {
  name:'lesson-card',
  components:{appIcon},
  props:{
    info:{
      type:Object,
      default(){
        return {
          img_src:require('@/assets/lesson_demo.jpg'),
          lesson_name:'tt2019初中数学秋季课',
          lesson_price:'1980',
          teacherName:'宋诗雨',
          lessonCount:'45',
          leave_count:'76',
          is_collected:1
        }
      }
    }
  },
  filters:{
    localtimeFilter (str) {
        return moment(str).format('LL')
    }
  },
  computed: {
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
    }
  },
  data () {
    return {
      
    }
  },
  methods: {
    handleCollect () {
        if (this.info.isCollected==0) {
          this.addCollect()
        }
        if (this.info.isCollected==1) {
          this.removeCollect()
        }
        
    },
    addCollect () {
      let id = this.info.course_id||this.info.id
      api.course_collector_add({course_id:id})
      .then((data)=>{
          this.info.isCollected = 1
          this.$emit('refresh_lesson')
      })
    },
    removeCollect () {
      let id = this.info.course_id||this.info.id
      api.course_collector_remove({course_id:id})
      .then((data)=>{
          this.info.isCollected = 0
          this.$emit('refresh_lesson')
      })
    }
  },
}
</script>
<style lang="scss" scoped>
  @import '../style/base.scss';
  .lesson-card-wrap{
    width: 100%;
    height:170px;
    border-radius: 10px;
    overflow: hidden;
    background-color:#fff;
    // display: flex;
    // justify-content: space-between;
    position: relative;
    transition: all .15s linear;
    top:0;
    cursor: pointer;
    // &:hover{
    //   top:-5px;
    // }
    .lesson-cover{
        width:243px;
        height:100%;
        float: left;
        img{
          width: 100%;
          height:100%;
          object-fit: cover;
        }
    }
    .lesson-info{
      height:100%;
      padding:10px 8px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .base-info{
        padding-bottom:9px;
        border-bottom:1px solid #e0e0e0;
      }
      .opt-info{
        display: flex;
        align-items: center;
        
        .p{
          display: flex;
          justify-content: space-between;
          width:100%;
          .lesson-leave{
            color: $baseBlueColor;
          }
          .lesson-collect{
            display: flex;
            align-items: center;
            cursor: pointer;
            span{
              margin-left:5px;
            }
          }
          .collected{
            color:$baseRedColor;
          }
        }
      }
    }
    
    .lesson_head{
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      .lesson_name{
        font-size:16px;
        a:hover{
          color:$baseBlueColor;
        }
      }
      .money_type{
        color:$baseRedColor;
      }
      .lesson_price{
        font-size:20px;
        color:$baseRedColor;
      }
    }
    .lesson_time{
      color:#666666;
      margin-top:10px;
    }
    .lesson_teacher{
      display:flex;
      justify-content: space-between;
      color:#333333;
      margin-top:10px;
      a:hover{
        color:$baseBlueColor;
      }
    }
    .lesson_schooleName{
        color: #333333;
        margin-top: 10px;
        font-size:14px;
    }
  }
</style>