<!--
 * @Author: David
 * @Date: 2019-10-22 14:32:46
 * @LastEditTime: 2019-11-28 15:51:42
 * @LastEditors: Do not edit
 * @Description: 等待支付页面
 -->
<template>
  <div class="wait-wrap">
      <div class="wait-content">
          <div class="wait-head">
              <div class="left-side">
                  <appIcon
                  iconName="icon-xingzhuang"
                  :size="4.5"
                  color="#4e97fc"
                  >

                  </appIcon>
                  <div class="order-desc">
                    <p class="desc-title">
                      订单提交成功，请您尽快付款！  订单号：{{info.order_sn}}
                    </p>
                    <p class="desc-mention">
                      该订单将为您保留{{effectiveTime_str}}，请抓紧付款
                    </p>
                  </div>
              </div>
              <div class="right-side">
                  <span class="price-label">应付金额：</span>
                  <p class="price">
                    <span>￥</span>
                    <span>{{info.final_price}}</span>
                  </p>
              </div>
          </div>

          <div class="pay-method">
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="支付宝支付" name="payPal">
                  <div class="paypal">
                      <div class="payPal-erwm">
                        <div class="wrap">
                            <img :src="aliSrc" alt="">
                        </div>
                      </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="微信支付" name="weChat">
                    <div class="wechat">
                      <div class="wechat-erwm">
                          <div class="wrap">
                              <img :src="wechatSrc" alt="">
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
import moment from '@/utils/localMoment'
import api from '@/utils/api'
import QRCode from 'qrcode'
import {apiList} from '@/utils/api'
import {baseUrl} from '@/utils/fetch'
export default {
  name:'waitPay',
  components:{appIcon},
  props:{
    info:{
      type:Object,
      required:true
    }
  },
  mounted () {
    let timeStr = this.info.order_create_time.replace(/-/g,'/')
    let startTime = new Date(timeStr).getTime()
    this.$exposeNextTime = startTime+this.info.effectiveTime*60*1000
    
    if (this.info.status==0||this.info.status==1){
        this.startCounter();
        this.getErwm()
    }
  },
  data () {
    return {
      activeName:'payPal',
      effectiveTime_str:'00:00',
      aliSrc:'',
      wechatSrc:''
    }
  },
  beforeDestroy() {
    this.stopCountter();
    this.stopCheckPayStatus();
  },
  watch:{
    activeName (news) {
      if (news == 'payPal'&&!this.aliSrc) {
        this.getAliPay()
      }
      if (news == 'weChat'&&!this.wechatSrc) {
        this.getWecahtPay()
      }
    }
  },
  methods: {
    handleClick () {
      
    },
    getErwm (){
      if (this.activeName == 'payPal'){
        this.getAliPay()
      }
      if (this.activeName == 'weChat'){
        this.getWecahtPay()
      }
    },
    getAliPay () {
        let order_id = this.info.id
        api.alipay({order_id})
        .then(data=>{
          let codeStr = data.data.qrcode
          this.genarateErwm(codeStr).then(data=>{
            codeStr = data;
            this.aliSrc = codeStr
            this.checkPayStatus()
          })
          
        })

    },  
    getWecahtPay () {
      let order_id = this.info.id
      api.wechat_pay({order_id})
      .then(data=>{
          this.wechatSrc = data.data.qrcode
          this.checkPayStatus();
      })
    },
    genarateErwm (url) {
      let str = QRCode.toDataURL(url);
      return str
    },
    aliasQrcode (str) {
        // 匹配script
        let reg = /<script>.+<\/script>$/
        let htmlStr = str.replace(reg,'');
        let wrapper = document.createElement('div')
        wrapper.innerHTML = htmlStr;
        let formDom = wrapper.firstElementChild
        let inputs = formDom.children
        let param = {}
        let strs = ""
        for (let i=0,len=inputs.length;i<len;i++){
            param[inputs[i].name] = inputs[i].defaultValue
        }
        Object.keys(param).forEach(key=>{
          if (key) {
            strs+=(`&${key}=${param[key]}`)
          }
        })
        let url = formDom.action+strs;
        
    },
    checkPayStatus () {
        let order_id = this.info.id
        api.pay_check({order_id})
        .then(data=>{
          let {status} = data.data;
          if (status==1) {
            if (!this.$timer2) {
              this.$timer2 = setInterval(()=>{
                this.checkPayStatus()
              },5000)
            }
          }else{
            this.stopCheckPayStatus()
            this.$emit('changestatus',status);
          }
          
        })
        .catch(()=>{
            this.stopCheckPayStatus()
        })
    },

    stopCheckPayStatus () {
      clearInterval(this.$timer2)
      this.$timer2 = null
    },
    
    startCounter () {
        let step = () =>{
          let currTime = Date.now()
          let disTime = this.$exposeNextTime-currTime
          
          if (disTime<=0) {
              this.effectiveTime_str = "00:00"
              this.stopCountter()
              return;
          }
          let str = this.getTimeStr(disTime);
          this.effectiveTime_str = str;
        }
        if (!this.$timer) {
          this.$timer = setInterval(()=>{
            step()
          },1000)
        }
    },
    stopCountter () {
       clearInterval(this.$timer)
       this.$timer = null
    },
    getTimeStr (disTime) {
        let m = Math.floor(disTime/60000);
        let s = Math.floor((disTime%60000)/1000)
         m = m>10?m:`0${m}`
         s = s>10?s:`0${s}`
         return m+':'+s;
    }
  },
  
}
</script>
<style lang="scss" scoped>

  .wait-wrap{
    width: 100%; 
    .wait-content{
      width:100%;
      .wait-head{
        width:100%;
        padding:30px 23px 24px 40px;
        background-color:#fff;
        display:flex;
        justify-content: space-between;
        align-items: center;
        .left-side{
          display: flex;
          
          .order-desc{
            margin-left:32px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
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

      .pay-method{
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
        .paypal{
          width:100%;
          min-height: 442px;
          .payPal-erwm{
            width:557px;
            height:427px;
            background-image:url('~@/assets/paypalbg.jpg');
            background-repeat: no-repeat;
            background-position: center top;
            background-size:100% auto;
            margin:0 auto;
            position: relative;
            .wrap{
              position: absolute;
              top: 158px;
              left: 120px;
              img{
                width: 160px;
                height:160px;
              }
            }
          }
        }

        .wechat{
          width:100%;
          min-height: 394px;
          .wechat-erwm{
            width:476px;
            height:322px;
            background-image:url('~@/assets/wechatPaybg.jpg');
            background-repeat: no-repeat;
            background-position: center top;
            background-size:100% auto;
            margin:0 auto;
            margin-top: 52px;
            position: relative;
            .wrap{
              position: absolute;
              top:88px;
              left:85px;
              img{
                width: 160px;
                height:160px;
              }
            }
          }

        }
      }
    }
  }
  
</style>