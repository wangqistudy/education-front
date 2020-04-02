<!--
 * @Author: David
 * @Date: 2019-10-21 14:40:37
 * @LastEditTime: 2019-11-29 17:09:39
 * @LastEditors: Do not edit
 * @Description: 我的订单
 -->
<template>
  <div class="order-wrap">
      <div class="order-inner">

        <div class="order-container">
            <h2 class="title">我的订单</h2>
        
        <div class="order-sel">
          <span :class="{act:orderType==-1}" @click="orderType = -1">全部订单</span> | 
          <span :class="{act:orderType==1}" @click="orderType = 1">待支付</span> | 
          <span :class="{act:orderType==3}" @click="orderType = 3">已支付</span> | 
          <span :class="{act:orderType==2}" @click="orderType = 2">已取消</span> 
        </div>

        <div class="order-list">
            <el-table
            :data="tableData"
            header-row-class-name="headrow"
            header-cell-class-name="headrowcell"
            >

              <el-table-column
              prop="order_sn"
              label="订单号"
              header-align="center"
              align="center"
              show-overflow-tooltip
              >

              </el-table-column>
              
              <el-table-column
              prop="semesterName"
              label="学期"
              header-align="center"
              align="center"
              show-overflow-tooltip
              >

              </el-table-column>

              <el-table-column
              prop="courseName"
              label="课程标题"
              header-align="center"
              align="center"
              min-width="120px"
              show-overflow-tooltip
              >

                <template slot-scope="scope">
                    <span class="linkToLesson">
                      <router-link :to="`/lesson/${scope.row.course_id}`">
                        {{scope.row.courseName}}
                      </router-link>
                    </span>
                </template>
                
              </el-table-column>

              <el-table-column
              prop="teacherName"
              label="授课老师"
              header-align="center"
              align="center"
              >

                <template slot-scope="scope">
                    <span class="linkToLesson" v-for="(teacher,index) in getTeachers(scope.row)" :key="index">
                      <router-link :to="`/teacher/${teacher.id}`">
                        {{teacher.name||'未知'}}
                      </router-link>
                      <span v-if="index<getTeachers(scope.row).length-1">,</span>
                    </span>
                </template>

              </el-table-column>

              <el-table-column
              prop="lessonDate"
              label="课程日期"
              header-align="center"
              align="center"
              min-width="120px"
              show-overflow-tooltip
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
              show-overflow-tooltip
              >

              </el-table-column> -->

              <el-table-column
              prop="courseClassHour"
              label="课时"
              header-align="center"
              align="center"
              show-overflow-tooltip
              >

              </el-table-column>

              <el-table-column
              prop="source_price"
              label="价格"
              header-align="center"
              align="center"
              show-overflow-tooltips
              >

              </el-table-column>

              <el-table-column
              prop="source_price"
              label="原价格"
              header-align="center"
              align="center"
              show-overflow-tooltips
              >

              </el-table-column>

              <el-table-column
              prop="final_price"
              label="实付价格"
              header-align="center"
              align="center"
              show-overflow-tooltips
              >

              </el-table-column>



              <el-table-column
              prop="schoolName"
              label="校区"
              header-align="center"
              align="center"
              min-width="140px"
              show-overflow-tooltip
              >

              </el-table-column>

              <el-table-column
              prop="classroom_id"
              label="教室"
              header-align="center"
              align="center"
              show-overflow-tooltip
              >

              </el-table-column>

              <el-table-column
              prop="seat_no"
              label="座位"
              header-align="center"
              align="center"
              >

                <template slot-scope="scope">
                    <span v-if="scope.row.seat_no>0">{{scope.row.seatDesc}}</span>
                    <el-button v-if="scope.row.seat_no==0&&scope.row.status==3" size="mini" class="chooseBtn" @click="$router.push(`/order/${scope.row.id}`)">
                      选座
                    </el-button>
                </template>
                  
              </el-table-column>

              <el-table-column
              prop="order_create_time"
              label="下单时间"
              header-align="center"
              align="center"
              min-width="120px"
              show-overflow-tooltip
              >

              </el-table-column>

              <el-table-column
              prop="status"
              label="状态"
              header-align="center"
              align="center"
              >

                <template slot-scope="scope">
                    
                    <el-button class="payBtn" size="mini" v-if="scope.row.status==0||scope.row.status==1" @click="$router.push(`/order/${scope.row.id}`)" :disabled="scope.row.waitPayButton==0" :title="scope.row.waitPayButton==0?'该订单已取消':'去支付'">
                        去支付
                    </el-button>

                    <span class="gray" v-if="scope.row.status==2">
                        订单取消
                    </span>
                    <span class="green" v-if="scope.row.status==3">
                        支付成功
                    </span>
                    <span class="gray" v-if="scope.row.status==4">
                        支付失败
                    </span>
                    <span class="red" v-if="scope.row.status==5">
                        退款
                    </span>
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

          
      </div>
      </div>
  </div>
</template>
<script>
import pagination from '@/mixins/pagination'
import moment from '@/utils/localMoment'
import api from '@/utils/api'
export default {
  name:'order',
  mixins:[pagination],
  data  () {
    return {
      
      orderType:-1,  
      listApi:api.course_order_list
    }
  },
  filters:{
    localtimeFilter (str) {
        return moment(str).format('LL')
    }
  },
  watch:{
    orderType (news) {
      this.setDataFilters({status:news})
      this.getList({status:news})
    }
  },
  mounted () {
    this.setDataFilters({status:this.orderType})
    this.getList({status:this.orderType})
  },
  methods:{
      getTeachers (row) {
        let {teacherName,teacher_ids} = row
        if (!teacherName||!teacher_ids) {
          return []
        }
        // console.log(teacherName,teacher_ids)
        let res = [],
            teacher_name_arr = teacherName.split(';'),
            teacher_id_arr = teacher_ids.split(',');
          teacher_name_arr.forEach((name,index)=>{
              res.push({name,id:teacher_id_arr[index]})
          })

        return res
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
  .red{
    color:red;
  }
  .payBtn,.chooseBtn{
    border-radius:0;
    border: 1px solid #0566ce;
    color:#4e97fc;
    .is-disabled{
        color: #c0c4cc;
        cursor: not-allowed;
        background-image: none;
        background-color: #fff;
        border-color: #ebeef5;
    }
  }
</style>