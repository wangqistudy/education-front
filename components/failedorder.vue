<!--
 * @Author: David
 * @Date: 2019-10-22 17:30:07
 * @LastEditTime: 2019-11-28 11:57:42
 * @LastEditors: Do not edit
 * @Description: 完成订单
 -->
<template>
  <div class="order-success-wrap">
      <div class="order-success">
          <div class="order-inner">
              <appIcon
              iconName="icon-zhifushibai1"
              :size="6"
              ></appIcon>
              <div class="desc">
                  <h3>{{getDescStr}}！</h3>
                  <p>订单详细信息可在个人中心中查看</p>
              </div>
              <blueBtn
              lable="查看订单"
              :width="200"
              :height="40"
              @click="$router.push('/usercenter')"
              >

              </blueBtn>
          </div>
      </div>
  </div>
</template>
<script>
import appIcon from '@/components/appIcon'
import blueBtn from '@/components/blueBtn'
export default {
  name:'orderSuccess',
  components:{appIcon,blueBtn},
  props:{
    info:{
      type:Object,
      default () {
        return {
          
        }
      }
    }
  },
  data () {
    return {

    }
  },
  computed:{
    getDescStr () {
      let dict = {
        '2':'订单已取消'
      }
      if (this.info.status&&dict[this.info.status]) {
        return dict[this.info.status];
      }
      return '支付失败'
    }
  }
}
</script>
<style lang="scss" scoped>
  .order-success-wrap{
    width: 100%;
    .order-success{
      width:1200px;
      margin:0 auto;
      margin-top:70px;
      height: 464px;
      padding-top:60px;
      background-color:#fff;
      .order-inner{
        width: 400px;
        height:100%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        .desc{
          margin-top:38px;
          margin-bottom:60px;
          text-align: center;
          h3{
            font-size:24px;
            color:#333333;
            margin-bottom:28px;
          }
          p{
            font-size:18px;
            color:#666666;
          }
        }
      }
    }
  }
</style>