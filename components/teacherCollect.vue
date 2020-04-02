<!--
 * @Author: David
 * @Date: 2019-10-21 14:40:37
 * @LastEditTime: 2019-11-29 09:56:19
 * @LastEditors: Do not edit
 * @Description: 我的订单
 -->
<template>
  <div class="lesson-wrap">
      <div class="lesson-inner">
        <div class="lesson-container">
            <h2 class="title">名师收藏</h2>
            <div class="teacher-list">
            <div class="teacher-container">
                <div class="list" v-if="tableData.length>0">
                  <div class="teacher-list-wrap"
                    v-for="(teacher,index) in tableData"
                    :key="index"
                    :class="{margin0:((index+1)%4==0)}"
                  >
                      <teacherCard
                      :info="teacher"
                      @refresh_teacher="handleRefreshTeacher"
                      >

                      </teacherCard>
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
  </div>
</template>
<script>
import lessonCard from '@/components/lessonCard'
import teacherCard from '@/components/teacherCard'
import pagination from '@/mixins/pagination'
import api from '@/utils/api'
import appIcon from '@/components/appIcon'
export default {
  name:'order',
  mixins:[pagination],
  components:{lessonCard,teacherCard,pagination,appIcon},
  data  () {
    return {
      pageSize:8,
      listApi:api.teacher_collector_list
    }
  },
  methods:{
    handleRefreshTeacher () {
      this.getList()
    }
  },
  mounted () {
    this.getList();
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
.lesson-list{
        max-width: 1200px;
        min-width: 1200px;
        .list{
          width:100%;
          margin-top:37px;
          overflow: hidden;
          .lesson-list-wrap{
            margin-bottom:30px;
            &.right{
              float: right;
            }
            &.left{
              float: left;
            }
          }
        }
        
      }
      .teacher-list{
        width: 1200px;
      }
      .teacher-container{
            padding:20px 18px 0;
            width:1200px;
            margin:0 auto;
            background-color:#fff;
            min-height: 735px;
            .list{
              
              overflow: hidden;
              .teacher-list-wrap{
                margin-bottom:25px;
                float: left;
                margin-right:70px;
                &.margin0{
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
          }
</style>