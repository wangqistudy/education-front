<!--
 * @Author: David
 * @Date: 2019-10-18 18:02:10
 * @LastEditTime: 2019-12-04 15:33:22
 * @LastEditors: Do not edit
 * @Description: 视频点播中心
 -->
<template>
  <div class="video-wrap">
      <div class="video-inner">
        <div class="select-box">
          <div class="selectItem" v-for="(sel,index) in selectList" :key="index">
              <lineSelect
              v-model="selRes[sel.filed]"
              :info="sel"
              >
                
              </lineSelect>
          </div>
      </div>
      <div class="video-list">
        <p class="video-list-header">共<span>{{totalCount}}</span>个课程</p>
        <div class="list"
        v-if="tableData&&tableData.length>0"
        >
            <div class="listWrap" v-for="(videoItem,index) in tableData" :key="index"
            :class="{noMargin:(index+1)%3==0}"
            >
                <videoCard
                :info="videoItem"
                >
                  
                </videoCard>
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

      
    </div>
  </div>
</template>
<script>
import lineSelect from '@/components/lineSelect'
import videoCard from '@/components/videoCard'
import api from '@/utils/api'
import pagination from '@/mixins/pagination'
import video from '@/asyncData/video'
import appIcon from '@/components/appIcon'

export default {
  components:{lineSelect,videoCard,appIcon},
  mixins:[pagination],
  name:'videos',
  asyncData:video,
  data () {
    return {
        selRes:{},
        selectList:[],
        listApi:api.video_list,
        pageSize:50
    }
  },
  head () {
    return {
      title:'视频点播-少儿编程教育',
      meta:[
        { hid: 'description', name: 'description', content: '少儿编程,教育,培训,英语,政治,历史,物理,化学,生物,语文,数学,线上选课,视频选课' }
      ]
    }
  },
  mounted () {
    if (process.client&&!this.firstRender) {
      this.firstRender = false
      this.getSelectList()
      .then(()=>{
          let param = {}
          this.selectList.forEach(item=>{
            param[item.filed] = item.selections[0].value
          })
          this.$set(this,'selRes',param);
      })
    }
    
  },
  watch :{
     selRes :{
       handler () {
         this.setDataFilters(Object.assign({},this.selRes))
         this.getList()
       },
       deep:true
     }
  },
  methods:{
    getSelectList () {
        return new Promise((res,rej)=>{
            api.video_search_config()
            .then(data=>{
              let dict = {
                grades:'年级',
                semesters:'学期',
                subjects:'科目',
                types:'类型',
                schools:'校区'
              }
              let arr = Object.keys(data.data).map(key=>{
                  let arrs = data.data[key].map(item=>{
                    return {
                      label:item.value,
                      value:item.id
                    }
                  })
                  arrs.unshift({
                    label:'不限',
                    value:-1
                  })
                  return {
                    label:dict[key],
                    filed:key,
                    selections:arrs
                  }
              })
              this.selectList = arr;
              res()
            })
            .catch(()=>{
              rej()
            })
        })
    }
  }
}
</script>
<style lang="scss" scoped>
    .video-wrap{
      width:100%;
      .video-inner{
        width:1200px;
        margin:0 auto;
        padding-top: 20px;
        .select-box{
          background-color:#fff;
          width: 100%;
          padding-left:16px;
          padding-top:20px;
          overflow: hidden;
          .selectItem{
            margin-bottom:20px;
          }
        }
        .video-list{
          margin-top:14px;
          .list{
            width:100%;
            overflow: hidden;
            display: flex;
            flex-wrap:wrap;
            .listWrap{
              margin-right:30px;
              margin-bottom:32px;
              
              &.noMargin{
                margin-right:0;
                
              }
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
            p{
              font-size:20px;
              text-align: center;
              margin-top:30px;
              color:#bfbfbf;
            }
          }
          .video-list-header{
            text-indent: 1em;
            margin-bottom:10px;
            span{
              color:#ff3b50;
            }
          }

          .el-pagination{
            text-align: center;
            /deep/.number{
              background-color:#fff;
              border:1px solid #e6e6e6;
            }
            /deep/.el-icon{
              background-color:transparent;
            }
            /deep/.number.active{
              background-color:#ff6c4a;
              color:#fff;
            }
            /deep/.btn-prev{
              background-color:#fff;
            }
            /deep/.btn-next{
              background-color:#fff;
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
    }
    
</style>