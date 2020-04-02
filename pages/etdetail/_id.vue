<!--
 * @Author: David
 * @Date: 2019-10-28 09:34:43
 * @LastEditTime: 2019-12-04 15:34:40
 * @LastEditors: Do not edit
 * @Description: 精英课程详情
 -->
<template>
  <div class="et-detail-wrapper">
      <div class="et-detail">
          
          <div class="et-detail-info">
              <div class="et-detail-header">
                <h2>{{info.name}}</h2>
                <p>学科带头人:{{info.academic_leader}}</p>
              </div>
              <div class="et-html" v-html="info.detail">

              </div>
          </div>
      </div>
  </div>
</template>
<script>
import etDetail from '@/asyncData/etDetail'
import api from '@/utils/api'
import viewTime from '@/mixins/viewTime'
export default {
  name:'etDetail',
  asyncData:etDetail,
  mixins:[viewTime],
  mounted () {
    if (process.client&&!this.firstRender){
      this.firstRender = false;
      this.getDetail()
    }
  },
  head () {
    return {
      title:'精英课程-少儿编程教育',
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
  methods:{
    
    async getDetail () {
      let {id} = this.$route.params
      let param = {
        id
      }
      let infoData =  await api.et_detail(param)
      this.info = infoData.data;
    }
  }
}
</script>

<style lang="scss" scoped>
  .et-detail-wrapper{
    width:100%;
    height:100%;
  }
  .et-detail{
    width: 1200px;
    margin:0 auto;
    padding-top:20px;
    .et-header{
      padding-top:36px;
      padding-left:40px;
      padding-bottom:30px;
      background-color:#fff;
      display: flex;

      .et-cover{
        width:302px;
        height: 204px;
        border-radius: 10px;
        overflow: hidden;
        margin-right:24px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .et-desc{
        padding-top:25px;
        h2{
          font-size:24px;
          color:#333333;
          margin-bottom:24px;
        }
        p{
          font-size: 16px;
          color:#333333;
        }
      }
    }
    .et-detail-info{
      width: 100%;
      background-color:#fff;
      margin-top:10px;
      padding-top:36px;
      padding-bottom:30px;
    }
    .et-html{
      width: 926px;
      margin:0 auto;
      /deep/img{
        max-width: 90%;
      }
    }
  }
  .et-detail-header{
    text-align: center;
    color:#333333;
    h2{
      font-size:24px;
      margin-bottom:15px;
    }
    p{
      font-size:16px;
      margin-bottom:20px;
    }
  }
</style>