<!--
 * @Author: David
 * @Date: 2019-10-17 14:19:22
 * @LastEditTime: 2019-10-28 08:42:47
 * @LastEditors: Do not edit
 * @Description: 校区卡片
 -->
<template>
  <div class="area-card-wrapper">
      <div class="area-image">
        <img :src="info.thumbnail" alt="">
      </div>
      <div class="area-info">
        <h3 class="area-name">{{info.name}}</h3>
        <div class="p">
          <appIcon iconName="icon-dizhi" :size="1.5"></appIcon>
          <span>{{info.address}}</span>
        </div>

        <div class="p">
          <appIcon iconName="icon-dianhua" :size="1.5"></appIcon>
          <span>{{info.mobile}}</span>
        </div>

      </div>
  </div>
</template>
<script>
import appIcon from '@/components/appIcon'
export default {
  name:'areaCard',
  components:{appIcon},
  props:{
    info : {
      type:Object,
      default () {
        return {
          image:require('@/assets/area_demo.jpg'),
          name:'政务区置地校区',
          address:'合肥市怀宁路置地广场c座12楼402室',
          mobile:'16578678900'
        }
      }
    }
  },
  data () {
    return {
      
    }
  }
}
</script>
<style lang="scss" scoped>
    .area-card-wrapper{
      width: 600px;
      height: 146px;
      display: flex;
      
      .area-image{
        width: 212px;
        height:100%;
        border-radius: 5px;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .area-info{
        padding-top:15px;
        margin-left:15px;
        h3{
          color:#093c6b;
          font-size:18px;
          margin-bottom:30px;
        }
        .p{
          margin-bottom:10px;
          display: flex;
          align-items: center;
          span{
            margin-left:5px;
          }
        }
      }
    }
</style>