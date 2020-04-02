/*
 * @Author: David
 * @Date: 2019-10-24 11:49:34
 * @LastEditTime: 2019-11-26 11:42:59
 * @LastEditors: Do not edit
 * @Description: 浏览时间混合器
 */
import api from '@/utils/api'
export default {
    data () {
      return {  
        
      }
    },
    mounted() {
        this.$startViewTamp = new Date().getTime()
    },
    beforeDestroy() {
      
      this.getDisTime()
    },
    methods: {
        getDisTime () {
          this.$startViewEndTamp = new Date().getTime()
          
          if (this.$startViewTamp&&this.$startViewEndTamp) {
              this.reportViewTime&&this.reportViewTime(this.$startViewEndTamp-this.$startViewTamp)
          }
        },
        reportViewTime (disTime) {
          if (this.searchLogId>0) {
            api.report_search_log({duration:Math.ceil(disTime/1000),searchLogId:this.searchLogId})
          }
        },
        resetStart () {
          this.$startViewTamp = new Date().getTime()
        }
    },
}