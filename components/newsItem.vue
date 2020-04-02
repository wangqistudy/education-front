<!--
 * @Author: David
 * @Date: 2019-10-21 10:07:05
 * @LastEditTime: 2019-10-30 17:49:24
 * @LastEditors: Do not edit
 * @Description: 新闻Item
 -->
<template>
  <div class="news-item-wrap" @click="$router.push(`/newsdetail/${info.id}`)">
    <div class="news-item-inner">
        <div class="news-date"> 
          <div class="date">
            <h2>{{info.publish_time|timeFilter}}</h2>
            <p class="line"></p>
          </div>
          <div class="icon">
              <div class="icon-inner">
                  <i class="el-icon-right">
                    
                  </i>
              </div>
          </div>
        </div>
        <div class="news-preview">
          <h3 class="ellipsis title">
            <router-link :to="`/newsdetail/${info.id}`">{{info.title}}</router-link>
          </h3>
          <p>{{info.brief_introduction}}</p>
        </div>
        <div class="news-img">
            <img :src="info.thumbnail" alt="">
        </div>
    </div>
      
  </div>
</template>
<script>
import moment from '@/utils/localMoment'
export default {
  name:'newsItem',
  props:{
    info:{
      type:Object,
      default () {
        return {
          id:'23',
          title:'必须要读的十本书——让你受益一生”',
          preViewContent:'有人说，阅读和生活中的很多其他事一样，有意思比有意义更有意义。你读过的书，走过的路都会不知不觉中变成你身体的一部分。古往今来，行走江湖的必备技能包括：读书。',
          img:require('@/assets/neww_demo.jpg'),
          time:'2019-10-11 00:00:00'
        }
      }
    }
  },
  filters:{
    timeFilter (str) {
        return moment(str).format('MM-DD')
    }
  },
  data () {
    return {
      
    }
  }
}
</script>
<style lang="scss" scoped>
  .news-item-wrap{
    width: 100%;
    padding:0 13px 0px;
    .news-item-inner{
      padding-bottom:28px;
      border-bottom:1px solid #e6e6e6;
      display: flex;
      justify-content: space-between;
      cursor: pointer;
      .news-item-inner{
        width: 100%;
      }
      &:hover{
        .icon-inner{
            color:#fff;
            background-color:#0566ce;
            .el-icon-right{
              color:#fff;
            }
        }
        .title{
          color:#0566ce;
        }
      }
    }
    .news-date{
      width: 136px;
      .date{
        display: flex;
        align-items: center;
        h2{
          font-size: 30px;
          color:#999999;
        }
        .line{
          border-bottom:1px solid #cccccc;
          width: 46px;
        }
      }
      .icon  {
        padding-left:6px;
        margin-top:26px;
        .icon-inner{
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size:30px;
          color: #c9c9c9;
        }
      }  
    }

    .news-preview{
      width: 666px;
      padding-top:8px;
      h3{
        font-size:16px;
        color:#333333;
      }
      p{
        color:#666666;
        line-height: 24px;
        margin-top:30px;
      }
    }
    .news-img{
      width:230px;
      height: 136px;
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
</style>