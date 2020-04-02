<!--
 * @Author: David
 * @Date: 2019-10-22 14:06:52
 * @LastEditTime: 2019-12-04 15:35:42
 * @LastEditors: Do not edit
 * @Description: 订单状态页面
 -->
<template>
  <div class="order-status-wrap">
      <div class="order-status">
        <!-- 等待付款 -->
        <div class="wait-pay" v-if="status==1">
          <waitPay
          :info="info"
          @refresh="handleRefresh"
          @changestatus="handleChangestatus"
          >

          </waitPay>
        </div>

        <!-- 付款成功选座 -->
        <div class="choose-seat" v-if="status==2">
          <chooseSeat
          :info="info"
          @changestatus="handleChangestatus2"          >
            
          </chooseSeat>
        </div>

        <!-- 订单完成 -->
        <div class="order-success" v-if="status==3">
          <success
          :info="info"
          >

          </success>


        </div>

        <!-- 订单失败 -->
        <div class="order-success" v-if="status==4">
          <failedorder
          :info="info"
          >

          </failedorder>
        </div>

      </div>
  </div>
</template>
<script>
import waitPay from '@/components/waitPay'
import chooseSeat from '@/components/chooseSeat'
import success from '@/components/success'
import failedorder from '@/components/failedorder'
import api from '@/utils/api'
export default {
  components:{waitPay,chooseSeat,success,failedorder},
  name:'orderStatus',
  head () {
    return {
      title:'我的订单-少儿编程教育',
      meta:[
        { hid: 'description', name: 'description', content: '少儿编程,教育,培训,英语,政治,历史,物理,化学,生物,语文,数学,线上选课,视频选课' }
      ]
    }
  },
  methods:{
    getOrderDetail () {
        return new Promise((res,rej)=>{
            let id = this.$route.params.id
            api.order_detail({order_id:id})
            .then(data=>{
                this.info = data.data
                res(data.data)
            })
            .catch(e=>{
                rej()
            })
        })
    },
    handleRefresh () {
      this.getOrderDetail()
      .then((data)=>{
          if (data.status==0||data.status==1) {
              this.status = 1;
              return;
          }

          if (data.status==3&&data.seat_no==0) {
            this.status = 2;
            return;
          }

          if (data.status==2) {
            this.status = 4;
            return
          }

          this.status =3;
      })
    },
    handleChangestatus (status) {
      
        if (status==2) {
          this.status=4;
        }
        if (status==3) {
          this.status=2;
        }
        if (status==4) {
          this.status=4;
        }
        if (status==5) {
          this.status=4;
        }

    },
    handleChangestatus2 (status) {
        this.status=status;
    }
  },
  mounted () {
      this.getOrderDetail()
      .then((data)=>{
           if (data.status==0||data.status==1) {
              this.status = 1;
              return;
          }

          if (data.status==3&&data.seat_no==0) {
            this.status = 2;
            return;
          }

          if (data.status==2) {
            this.status = 4;
            return
          }

          this.status =3;
      })
  },
  data () {
    return {
      status:0,
      info:{
        
      },
      
    }
  }
}
</script>
<style lang="scss" scoped>
    .order-status-wrap{
      width:100%;
      .order-status{
        width:1200px;
        margin:0 auto;
        .wait-pay{
          padding-top:20px;
        }
        .choose-seat{
          padding-top:20px;
        }
      }
    }
</style>