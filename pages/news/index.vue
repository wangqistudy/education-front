<!--
 * @Author: David
 * @Date: 2019-10-21 09:55:49
 * @LastEditTime: 2019-12-04 15:33:56
 * @LastEditors: Do not edit
 * @Description: 新闻中心
 -->
<template>
  <div class="news-wrap">
      <div class="news-inner">
        <div class="news-banner">
          <div class="img" :style="{backgroundImage:`url(${banner})`}"></div>
        </div>
      
        <div class="news-container">
            <div class="news-list" v-if="tableData&&tableData.length>0">
              <div class="list-wrap" v-for="(item,index) in tableData" :key="index">
                  <newsItem
                  :info="item"
                  >
                    
                  </newsItem>
              </div>
               <div class="news-pagination">
                <el-pagination
                background
                layout="prev, pager, next"
                prev-text="上一页"
                next-text="下一页"
                @current-change="handleCurrentChange"
                :page-size="pageSize"
                :hide-on-single-page="true"
                :total="totalCount">
                </el-pagination>
              </div>
            </div>

            <div class="empty-list" v-if="!tableData||(tableData.length<=0&&!pageLoading)">
              <appIcon
              iconName="icon-zanwu1"
              :size="7"
              color="#bfbfbf"
              >
                
              </appIcon>
              <p>暂无信息</p>
          </div>

           
        </div>
      </div>
  </div>
</template>
<script>
import newsItem from '@/components/newsItem'
import appIcon from '@/components/appIcon'
import api from '@/utils/api'
import pagination from '@/mixins/pagination'
import news from '@/asyncData/news'
export default {
  name:'newsList',
  mixins:[pagination],
  components:{
    newsItem,
    appIcon
  },
  head () {
    return {
      title:'新闻资讯-少儿编程教育',
      meta:[
        { hid: 'description', name: 'description', content: '少儿编程,教育,培训,英语,政治,历史,物理,化学,生物,语文,数学,线上选课,视频选课' }
      ]
    }
  },
  asyncData:news,
  data () {
    return {
      banner:'',
      listApi:api.news_full_list
    }
  },
  mounted() {
      if (process.client&&!this.firstRender) {
        this.firstRender = false;
        this.getBanner()
        this.getList()
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
      this.banner = banner
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
      .news-container{
        width: 100%;
        overflow: hidden;
        background-color:#fff;
        .news-list{
          width:1200px;
          padding-top:40px;
          padding-bottom:40px;
          margin:0 auto;

          .list-wrap{
            margin-bottom:40px;
          }
        }
        .empty-list{
          width:100%;
          margin-top:37px;
          overflow: hidden;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          padding-bottom:30px;
          p{
            font-size:20px;
            text-align: center;
            margin-top:30px;
            color:#bfbfbf;
          }
        }
      }

      .el-pagination{
        text-align: center;
        /deep/.number{
          background-color:transparent;
          border:1px solid #e6e6e6;
        }
        /deep/.el-icon{
          background-color:transparent;
        }
        /deep/.number.active{
          background-color:#ff6c4a;
          color:#fff;
        }
        /deep/{
          button{
            padding:0 15px;
            background-color:transparent;
            border: 1px solid #e6e6e6;
          }
        }
      }
    }
  }
</style>