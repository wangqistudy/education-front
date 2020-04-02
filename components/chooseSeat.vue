<!--
 * @Author: David
 * @Date: 2019-10-22 14:32:46
 * @LastEditTime: 2019-12-03 19:01:55
 * @LastEditors: Do not edit
 * @Description: 选择座位页面
 -->
<template>
  <div class="seat-wrap">
      <div class="seat-content">
          <div class="seat-head">
              <div class="left-side">
                  <appIcon
                  iconName="icon-xingzhuang"
                  :size="4.5"
                  color="#4e97fc"
                  >

                  </appIcon>
                  <div class="order-desc">
                    <p class="desc-title">
                      订单已支付成功！  请您尽快选座！
                    </p>
                  </div>
              </div>
              
          </div>
          
          <div class="seat-list">
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="选择位置" name="chooseSeat">
                  <div class="choose-seat">
                    
                     <!-- 讲台位置 -->
                     <div class="platform">
                        <div class="dest-item plat">
                            讲台
                        </div>
                     </div>

                     <!-- 课桌列表 -->
                     <div class="dest-list">
                          <div class="dest-line" v-for="(line,index) in destList" :key="index">
                              <div class="dest-item" v-for="(dest,index2) in line" :key="index2" :title="getTitle(index,index2)" 
                              :class="[dest.is_choosed==0?'able':dest.is_choosed==1?'disable':'disable',(selectIndex[0]===index&&selectIndex[1]===index2)?'act':'']"
                              @click="handleSelectSeat(dest,index,index2)"
                              >
                                <span v-if="(selectIndex[0]===index&&selectIndex[1]===index2)">
                                    {{getTitle(index,index2)}}
                                </span>
                                <span v-else>
                                  {{dest.is_choosed==0?'可选':dest.is_choosed==1?'不可选':'未知'}}
                                </span>
                                  
                              </div>
                          </div>

                          <div class="more-btn-wrap">
                            <blueBtn
                            lable="确定"
                            @click="handleSelectClick"
                            >

                            </blueBtn>
                          </div>
                          
                     </div>

                  </div>
                </el-tab-pane>              
              </el-tabs>
          </div>

      </div>
  </div>
</template>
<script>
import appIcon from '@/components/appIcon'
import blueBtn from '@/components/blueBtn'
import api from '@/utils/api'
import {messageError} from '@/utils/messageBox'
export default {
  name:'waitPay',
  props:{
    info:{
      type:Object,
      required:true
    }
  },
  components:{appIcon,blueBtn},
  data () {
    return {
      activeName:'chooseSeat',
      selectIndex:[],
      destList:[
        
      ]
    }
  },
  watch:{
    info (news) {
        
        this.getSeatList();
    }
  },
  mounted () {
    this.getSeatList()
  },
  methods: {
    handleClick () {

    },
    handleSelectClick () {
        if (this.selectIndex.length<2) {
          messageError('请先选择座位！')
          return ;
        }
        let seat = this.destList[this.selectIndex[0]][this.selectIndex[1]]
        let order_id = this.info.id;
        let {seat_no} = seat
        api.course_seat_choose({order_id,seat_no})
        .then(data=>{
          
          this.$emit('changestatus',3)
        })

    },
    getSeatList () {
      let order_id = this.info.id
      api.course_seat_list({order_id})
      .then(data=>{
          this.destList = data.data.seatInfo
      })
    },
    getTitle (row,col) {
        return (row+1)+' 排 '+(col+1)+' 列'
    },
    handleSelectSeat (dest,row,col) {
        if (dest.is_choosed!=0){
          return;
        }
        this.selectIndex = [row,col]
    }
  },
  
}
</script>
<style lang="scss" scoped>

  .seat-wrap{
    width: 100%; 
    .seat-content{
      width:100%;
      .seat-head{
        width:100%;
        padding:30px 23px 24px 40px;
        background-color:#fff;
        display:flex;
        align-items: center;
        .left-side{
          display: flex;
          
          .order-desc{
            margin-left:32px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding:5px 0;
            .desc-title{
              font-size:16px;
              color:#333333;
              font-weight:500;
            }
            .desc-mention{
              font-size:14px;
              color:#ff6c4a;
            }
          }
        }
        .right-side{
          display:flex;
          align-items: center;
          .price-label{
            font-size: 14px;
            color:#666666;
          }
          .price{
            display:flex;
            align-items: flex-end;
            color:#ff3b50;
            span:first-child{
              font-size: 16px;
            }
            span:last-child{
              font-size:23px;
            }
          }
        }
      }

      .seat-list{
        width:100%;
        margin-top:20px;
        padding:15px 20px 40px;
        background-color:#fff;
        .el-tabs{
          /deep/.el-tabs__nav-wrap{
            padding-left:20px;
          }
          /deep/.el-tabs__item{
            font-size:18px;
          }
        }
        .choose-seat{
          width:100%;
          min-height: 442px;
        }
      }
    }
  }


  .dest-item{
    width: 120px;
    height:40px;
    font-size:16px;
    color:#0566ce;
    text-align: center;
    line-height: 40px;
    border:1px solid #0566ce;
    margin-left:30px;
    &.plat{
      border:1px solid #666;
      color: #666;
      margin:0 auto;
      margin-bottom:20px;
    }
  }

  .dest-line{
    overflow: hidden;
    margin-bottom:27px;
    display: flex;
    justify-content: center;
    .dest-item{
        &:first-child{
          margin-left:0px;
        }
        &.able{
          cursor: pointer;
          &.act{
            background-color:#0566ce;
            color:#fff;
          }
        }
        &.disable{
          background-color:#d2d2d2;
          border-color:#d2d2d2;
          color:#fff;
          cursor: not-allowed;
        }

    }
  }

   .more-btn-wrap{
      padding-top:20px;
      display: flex;
      justify-content: center;
    }

</style>