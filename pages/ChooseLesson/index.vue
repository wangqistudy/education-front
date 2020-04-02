<!--
 * @Author: David
 * @Date: 2019-10-18 14:27:29
 * @LastEditTime: 2019-12-04 15:32:36
 * @LastEditors: Do not edit
 * @Description: 选课中心
 -->
<template>
  <div class="choose-lesson-wrap">
      <div class="choose-lesson">
          <!-- 选项框组 -->
          <div class="select-box">
            <div class="selectItem" v-for="(sel,index) in selectList" :key="index">
                <lineSelect
                v-model="selRes[sel.filed]"
                :info="sel"
                >
                  
                </lineSelect>
            </div>
          </div>
          <!-- 选项框组 -->
          <div class="lesson-list">
            <p class="lesson-list-header">共<span>{{totalCount}}</span>个课程</p>
            <div class="list" v-if="tableData&&tableData.length>0">
              <div class="lesson-list-wrap"
                v-for="(lesson,index) in tableData"
                :key="index"
                :class="{right:index%2==1,left:index%2==0}"
              >
                  <lessonCard
                  :info="lesson"
                  >

                  </lessonCard>
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
                  @current-change="handleCurrentChange1"
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
import lessonCard from '@/components/lessonCard'
import appIcon from '@/components/appIcon'
import pagination from '@/mixins/pagination'
import viewTime from '@/mixins/viewTime'
import api from '@/utils/api'
import ChooseLesson from '@/asyncData/ChooseLesson'
export default {
  name:'chooseLesson',
  components:{lineSelect,lessonCard,appIcon},
  mixins:[pagination,viewTime],
  asyncData:ChooseLesson,
  data () {
    return {
      selRes :{

      },
      selectList:[],
      listApi:api.course_list,
      pageSize:50
    }
  },
  head () {
    return {
      title:'选课中心-少儿编程教育',
      meta:[
        { hid: 'description', name: 'description', content: '少儿编程,教育,培训,英语,政治,历史,物理,化学,生物,语文,数学,线上选课,视频选课' }
      ]
    }
  },
  mounted () {
    if (process.client&&!this.firstRender){
      this.firstRender = false;
      
      this.getSelectList(this.$route.query.teacher?{teacher_id:this.$route.query.teacher}:{})
      .then((data)=>{
        this.selectList.forEach(item=>{
          this.$set(this.selRes,item.filed,item.selections[0].value)
        })
        this.setDataFilters(this.setDataFilters(Object.assign({},this.selRes)))
      })
    }
  },
  watch :{
     selRes :{
       handler () {
         let teacher_id = this.$route.query.teacher
         if (teacher_id) {
            this.setDataFilters(Object.assign({},this.selRes,{teacher_id}))  
         }else{
           this.setDataFilters(Object.assign({},this.selRes))  
         }
         this.getDisTime&&this.getDisTime();
         this.resetStart&&this.resetStart();
         this.getList()
         .then(data=>{
          let {searchLogId} = data
          this.searchLogId = searchLogId
         })
       },
       deep:true
     }
  },
  methods:{
    handleCurrentChange1 (page) {
      this.currPage = page;
      this.getDisTime&&this.getDisTime()
      this.getList()
      .then(data=>{
        let {searchLogId} = data
        this.searchLogId = searchLogId
      })
    },
    getSelectList () {
      
        return new Promise((res,rej)=>{
            api.course_config()
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
    .choose-lesson-wrap{
      width:100%;
      min-height:100%;
      background-color:#f1f4f9;
      .choose-lesson{
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
        .lesson-list{
          margin-top:14px;
          .lesson-list-header{
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
        .list{
          width:100%;
          overflow: hidden;
          .lesson-list-wrap{
            width: 50%;
            max-width: 580px;
            margin-bottom:30px;
            &.right{
              float: left;
            }
            &.left{
              float: left;
              margin-right:30px;
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
      }
    }
    
</style>