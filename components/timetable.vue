<!--
 * @Author: David
 * @Date: 2019-10-21 14:40:37
 * @LastEditTime: 2019-10-29 18:10:06
 * @LastEditors: Do not edit
 * @Description: 我的课表
 -->
<template>
  <div class="order-wrap">
      <div class="order-inner">

        <div class="order-container">
            <h2 class="title">我的课表</h2>
        
        <div class="order-sel">
          <span :class="{act:timetableType==1}" @click="timetableType = 1">日历</span> | 
          <span :class="{act:timetableType==2}" @click="timetableType = 2">课表</span> 
        </div>

        <div class="order-list" v-if="timetableType==2">
            <el-table
            :data="tableData"
            header-row-class-name="headrow"
            header-cell-class-name="headrowcell"
            >

              
              
              <el-table-column
              prop="semesterName"
              label="学期"
              header-align="center"
              align="center"
              >

              </el-table-column>

              <el-table-column
              prop="name"
              label="课程标题"
              header-align="center"
              align="center"
              min-width="120px"
              >

                <template slot-scope="scope">
                    <span class="linkToLesson">
                      <router-link :to="`/lesson/${scope.row.id}`">
                        {{scope.row.name}}
                      </router-link>
                    </span>
                </template>
                
              </el-table-column>

              <el-table-column
              prop="teacher"
              label="授课老师"
              header-align="center"
              align="center"
              >

                <template slot-scope="scope">
                    <span class="linkToLesson">
                      <router-link :to="`/teacher/${getTeacherInfo(scope.row).teacher_id}`">
                        {{getTeacherInfo(scope.row).teacher_name}}
                      </router-link>
                    </span>
                </template>

              </el-table-column>

              <el-table-column
              prop="lessonDate"
              label="课程日期"
              header-align="center"
              align="center"
              min-width="120px"
              >
                
                  <template slot-scope="scope">
                    <span>
                      {{scope.row.class_start_date|localtimeFilter}} - {{scope.row.class_end_date|localtimeFilter}}      
                    </span>
                </template>
              </el-table-column>
              
              <!-- <el-table-column
              prop="class_time"
              label="上课时间"
              header-align="center"
              align="center"
              min-width="120px"
              >
                  
              </el-table-column> -->

              


              <el-table-column
              prop="schoolName"
              label="校区"
              header-align="center"
              align="center"
              min-width="140px"
              >

              </el-table-column>

              <el-table-column
              prop="classroom_id"
              label="教室"
              header-align="center"
              align="center"
              >

              </el-table-column>

              <el-table-column
              prop="seat_no"
              label="座位"
              header-align="center"
              align="center"
              >

                <template slot-scope="scope">
                    <span>{{scope.row.seatDesc}}</span>
                   
                </template>
                  
              </el-table-column>

            </el-table>

            <div class="pagination">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currPage"
                :page-size="pageSize"
                layout="prev, pager, next, jumper"
                :total="totalCount">
              </el-pagination>
            </div>
        </div>

        <div class="timetable" v-if="timetableType==1">
            <calendar
            @changedate="handleChangeDate"
            >
              
            </calendar>
        </div>

          
      </div>
      </div>
  </div>
</template>
<script>
import calendar from '@/components/calendar'
import api from '@/utils/api'
import pagination from '@/mixins/pagination'
import moment from '@/utils/localMoment'
export default {
  name:'timetable',
  components:{calendar},
  mixins:[pagination],
  data  () {
    return {
      timetableType:1,  //1 日历  2 课表
      listApi:api.user_course_list
    }
  },
  mounted() {
    this.getList()
  },
  filters:{
    localtimeFilter (str) {
        return moment(str).format('LL')
    }
  },
  methods:{
    handleChangeDate ({news,cb,fcb}) {
      api.calendar({month:news})
      .then(data=>{
        let arr = Object.keys(data.data).map(item=>{
          return {
            date:item,
            lessons:data.data[item]
          }
        })
        cb&&cb(arr)
      })
      .catch(()=>{
        fcb&&fcb()
      })
    },
    getTeacherInfo (row) {
      let teachers = row.teachers
      if (teachers[1].length>0){
        return teachers[1][0];
      }else if (teachers[2].length>0) {
        return teachers[1][0];
      }
      return {
        teacher_id:undefined,
        teacher_name:'未知'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .order-wrap{
    width:100%;
    .order-inner{
      width:100%;
      .order-container{
          .title{
            padding-top:10px;
            font-size:24px;
            font-weight: 400;
            padding-left:10px;
            color:#333333;
            margin-bottom:36px;
          }
          .order-sel{
            padding-left:10px;
            margin-bottom:20px;
            span{
              margin:0 20px;
              font-size:18px;
              color:#333;
              cursor: pointer;
              &.act{
                color:#0566ce;
              }
              &:first-child{
                margin-left:0;
              }
            }
          }
          .order-list{
            background-color:#fff;
            /deep/.headrow{
              height: 40px;
            }
            /deep/.headrowcell{
              background-color:#0566ce;
              font-size: 14px;
              font-weight: 400;
            }
            /deep/.has-gutter{
              color:#fff;
            }
            .pagination{
              padding:10px 0;
              border-top:1px solid #ddd;
            }
          }
      }
      
    }
  }
  .linkToLesson{
    color:#277aed;
  }
  .green{
    color:#06cc76;
  }
  .gray{
    color:#333333;
  }
  .payBtn,.chooseBtn{
    border-radius:0;
    border: 1px solid #0566ce;
    color:#4e97fc;
  }
  .timetable{
    width:100%;
    padding:30px 24px 0;
    height:686px;
    background-color:#fff;
  }
</style>