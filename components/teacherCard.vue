<!--
 * @Author: David
 * @Date: 2019-10-17 11:11:47
 * @LastEditTime: 2019-12-04 14:10:56
 * @LastEditors: Do not edit
 * @Description: 老师卡片
 -->
<template>
  <div class="teacher-card-wrapper">
      <div class="avatar-wrapper">
          <div class="avatar">
            <router-link :to="`/teacher/${info.teacher_id||info.id}`">
              <img :src="info.thumbnail" alt="">
            </router-link>
            
          </div>
      </div>

      <div class="teacher-info">
        <p><router-link :to="`/teacher/${info.teacher_id||info.id}`">{{info.name}}老师</router-link> | {{info.educationLevelName}}</p>
        <p>教学科目：{{info.subjectName}}</p>
        <p>毕业院校：{{info.school}}</p>
      </div>

      <div class="details-button">
          <redBtn
          :lable="info.isCollected==0?'点击收藏':'取消收藏'"
          @click="handleCollect"
          >
            
          </redBtn>
      </div>
      
  </div>
</template>
<script>
import api from '@/utils/api'
import redBtn from '@/components/redBtn'
export default {
  components:{redBtn},
  name:'teacherCard',
  props:{
    info:{
      type:Object,
      default () {
        return{
          avatar:require('@/assets/teacher_demo.jpg'),
          teacherName:'于波'
        }
      }
    }
  },
  data () {
    return {

    }
  },
  methods: {
    handleCollect () {
      if (this.info.isCollected==0){
        this.collect_add()
      }
      if (this.info.isCollected==1) {
        this.collect_remove()
      }
      
    },
    collect_add () {
      let teacher_id = this.info.teacher_id||this.info.id
      api.teacher_collector_add({teacher_id})
      .then(data=>{
        this.info.isCollected = 1
        this.$emit('refresh_teacher')
      })
    },
    collect_remove () {
      let teacher_id = this.info.teacher_id||this.info.id
      api.teacher_collector_remove({teacher_id})
      .then(data=>{
        this.info.isCollected = 0
        this.$emit('refresh_teacher')
      })
    }
  },
  
}
</script>

<style lang="scss" scoped>
  @import '@/style/base.scss';
    .teacher-card-wrapper{
      width:220px;
      .avatar-wrapper{
        width:100%;
        height: 220px;
        background-color:#38aeff;
        padding:4px;
        border-radius: 220px;
        overflow: hidden;
        margin-bottom:8px;
        .avatar{
          width:100%;
          height:100%;
          border-radius: 100%;
          overflow: hidden;
          border-radius: 220px;
          img{
            object-fit: cover;
            width:100%;
            height:100%;
          }
        }
      }
      .teacher-info{
        p{
          text-align: center;
          margin-bottom:8px;
          a:hover{
            color:$baseBlueColor;
          }
        }
        
      }
      .details-button{
        display:flex;
        justify-content: center;
      }
    }
</style>