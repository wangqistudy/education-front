<!--
 * @Author: David
 * @Date: 2019-10-21 08:58:25
 * @LastEditTime: 2019-12-04 16:53:19
 * @LastEditors: Do not edit
 * @Description: 视频卡片
 -->
<template>
  <div class="video-card-wrap">
      <div class="video-card">
        <div class="video-poster" @click="handleLinkTo">
            <img :src="info.thumbnail" alt="">
            <div class="master">
                <appIcon
                :size="3"
                color="#ffff"
                iconName="icon-bofang"
                >
                </appIcon>
            </div>
        </div>
        <div class="video-info">
            <h3 class="video-title">
                <router-link :to="`/videodetail/${info.id}`">{{info.title}}</router-link>
            </h3>

            <p class="video-detail">
              <span>主讲： <router-link :to="`/teacher/${info.teacher_id}`">{{info.teacherName}}</router-link> </span>
              <span>{{info.watch_num}}人点播</span>
            </p>

        </div>
      </div>
  </div>
</template>
<script>
import appIcon from '@/components/appIcon'
export default {
  name:'videoCard',
  components:{appIcon},
  props:{
    info :{
      type:Object,
      default () {
        return {
          id:'11',
          poster:require('@/assets/video_demo.jpg'),
          name:'2019初中数学秋季课',
          teacher:'宋诗雨',
          viewCount:1847
        }
      }
    }
  },
  data () {
    return {

    }
  },
  methods :{
    handleLinkTo () {
      this.$router.push(`/videodetail/${this.info.id}`)
    }
  }
}
</script>
<style lang="scss" scoped>

.video-card-wrap{
  width:378px;
  border-radius:10px;
  overflow:hidden;
  .video-card{
    width:100%;
    .video-poster{
      width: 100%;
      height: 180px;
      position: relative;
      img{
        width: 100%;
        height:100%;
        object-fit: cover;
      }
      .master{
        width: 100%;
        height: 100%;
        position: absolute;
        top:0;
        left:0;
        display:flex;
        align-items: center;
        justify-content: center;
        background-color:rgba(0,0,0,0.5);
        cursor: pointer;
      }
      
    }
    .video-info{
      background-color:#fff;
      padding:14px 30px 22px 10px;
      width: 100%;
      .video-title{
        font-size:16px;
        color:#333333;
        margin-bottom:16px;
        a:hover{
          color:#0566ce;
        }
      }
      .video-detail{
        color:#333333;
        display: flex;
        justify-content: space-between;
        a{
          color:#0566ce;
        }

      }
    }
  }
}
  
</style>