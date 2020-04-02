<!--
 * @Author: David
 * @Date: 2019-10-21 14:40:37
 * @LastEditTime: 2019-12-04 09:50:58
 * @LastEditors: Do not edit
 * @Description: 我的订单
 -->
<template>
  <div class="lesson-wrap">
      <div class="lesson-inner">
        <div class="lesson-container">
            <h2 class="title">课程收藏</h2>
            <div class="lesson-list">
                <div class="list" v-if="tableData.length>0">
                    <div class="lesson-list-wrap"
                      v-for="(lesson,index) in tableData"
                      :key="index"
                      :class="{right:index%2==1,left:index%2==0}"
                    >
                        <lessonCard
                        :info="lesson"
                        @refresh_lesson="handleRefreshLesson"
                        >

                        </lessonCard>
                    </div>
                      
                  </div>

                  <div class="empty-list" v-if="tableData.length<=0&&!pageLoading">
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
  </div>
</template>
<script>
import lessonCard from '@/components/lessonCard'
import pagination from '@/mixins/pagination'
import api from '@/utils/api'
import appIcon from '@/components/appIcon'
export default {
  name:'collectLesson',
  mixins:[pagination],
  components:{lessonCard,appIcon},
  data  () {
    return {
      pageSize:8,
      listApi:api.course_collector_list
    }
  },
  mounted() {
    this.getList()
  },
  methods:{
    handleRefreshLesson () {
      this.getList()
    }
  }
}
</script>
<style lang="scss" scoped>
  .lesson-wrap{
    width:100%;
    .lesson-inner{
      width:100%;
      .lesson-container{
          .title{
            padding-top:10px;
            font-size:24px;
            font-weight: 400;
            padding-left:10px;
            color:#333333;
            margin-bottom:36px;
          }
          
          
      }
      
    }

    .lesson-list{
        max-width: 1200px;
        width: 100%;
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
        .list{
          width:100%;
          margin-top:37px;
          overflow: hidden;
          .lesson-list-wrap{
            margin-bottom:30px;
            max-width: 580px;
            width: 45%;
            
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