<!--
 * @Author: David
 * @Date: 2019-10-18 17:37:24
 * @LastEditTime: 2019-12-04 15:33:05
 * @LastEditors: Do not edit
 * @Description: 名师介绍
 -->
<template>
  <div class="teacher-detail-wrap">
      <div class="teacher-detail">
          <div class="teacher-header-mg">
            <div class="img" :style="{backgroundImage:`url(${heaerImg})`}"></div>
          </div>

          <div class="select-list">
            <div class="selectInner">
              <span v-for="(item,index) in selectList" :key="index" :class="{act:selectValue==item.value}" @click="handleSelect(item)">{{item.label}}</span>  
            </div>
            
          </div>

          <div class="teacher-list">
            <div class="teacher-container">
                <div class="list"
                v-if="tableData&&tableData.length>0"
                >
                  <div class="teacher-list-wrap"
                    v-for="(teacher,index) in tableData"
                    :key="index"
                    
                  >
                      <teacherCard
                      :info="teacher"
                      >
                          
                      </teacherCard>
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

                <div class="pagination">
                    <el-pagination
                      @current-change="handleCurrentChange"
                      :current-page.sync="currPage"
                      :page-size="pageSize"
                      layout="prev, pager, next, jumper"
                      :total="totalCount"
                      :hide-on-single-page="true"
                      >
                    </el-pagination>
                  </div>
                </div>
            </div>

            
      </div>
  </div>
</template>
<script>
import teacherCard from '@/components/teacherCard'
import api from '@/utils/api'
import pagination from '@/mixins/pagination'
import viewTime from '@/mixins/viewTime'
import appIcon from '@/components/appIcon'
import teacherdetail from '@/asyncData/teacherdetail'
export default {
  name:'teacherDetail',
  components:{teacherCard,appIcon},
  mixins:[pagination,viewTime],
  asyncData:teacherdetail,
  data () {
    return {
      heaerImg:'',
      selectValue:null,
      selectList:[
        {label:'所有老师',value:0},
        {label:'数学老师',value:1},
        {label:'物理老师',value:2},
        {label:'化学老师',value:3}
      ],
      listApi:api.teacher_list,
      pageSize:30
    }
  },
  head () {
    return {
      title:'名师介绍-少儿编程教育',
      meta:[
        { hid: 'description', name: 'description', content: '少儿编程,教育,培训,英语,政治,历史,物理,化学,生物,语文,数学,线上选课,视频选课' }
      ]
    }
  },
  mounted () {
    if (process.client&&!this.firstRender) {
      this.firstRender = false
      this.getOptions()
      .then(()=>{
        this.selectValue = this.selectList[0].value
      })
      this.getBanners()
    }
  },
  watch:{
    selectValue () {
      this.setDataFilters({subject_id:this.selectValue})
      this.getList()
    }
  },
  methods:{
    
    handleSelect (item) {
      this.selectValue = item.value
    },
    getOptions () {
      return new Promise((res,rej)=>{
        api.teacher_search_config()
        .then(data=>{
          let {subject} = data.data
          this.selectList = Object.keys(subject).map(key=>{
            return  {label:subject[key],value:key}
          })
          this.selectList.unshift({label:'所有老师',value:-1})
          res()
        })
        .catch(()=>{
          rej()
        })
      })
      
    },
    getBanners () {
      api.banner_list({type:2})
      .then(data=>{
        try{
          this.heaerImg = data.data[0].banner_url
        }catch(e){

        }
        
      })
    }
  }
}
</script>
<style lang="scss" scoped>
    .teacher-detail-wrap{
      width:100%;
      .teacher-detail{
        width:100%;
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

        .select-list{
            width:100%;
            .selectInner{
              width:1200px;
              margin:0 auto;
              padding-top:26px;
              padding-bottom:16px;
              span{
                font-size:18px;
                color:#333333;
                margin-right:42px;
                cursor: pointer;
                &.act{
                  color:#0566ce;
                }
              }
            }
        }

        .teacher-list{
          background-color:#fff;
          padding-bottom:30px;
          .teacher-container{
            padding-top:20px;
            width:1200px;
            margin:0 auto;
            .list{
              width:100%;
              overflow: hidden;
              margin-bottom: 30px;
              .teacher-list-wrap{
                margin-bottom:25px;
                float: left;
                margin-left: 70px;
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
    }
</style>