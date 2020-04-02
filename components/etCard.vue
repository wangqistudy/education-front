<!--
 * @Author: David
 * @Date: 2019-10-28 08:59:51
 * @LastEditTime: 2019-10-29 16:09:57
 * @LastEditors: Do not edit
 * @Description: 精英课程卡片
 -->
<template>
  <div class="et-wrapper">
      <div class="et">
        <div class="et-img">
          <img :src="info.thumbnail" alt="">
        </div>
        <div class="et-desc">
          <div class="et-info">
            <h2>{{info.name}}</h2>
            <p>学科带头人：{{info.academic_leader}}</p>
          </div>
          <div class="icon">
            <div class="icon-inner">
                <i class="el-icon-right">
                  
                </i>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  name:'etcard',
  props:{
    info:{
      type:Object,
      default () {
        return {
          
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .et-wrapper{
    width:380px;
    height: 320px;
    border-radius: 10px;
    box-shadow: 0px 0px 8px #f2f2f2;
    overflow: hidden;
    .et{
      width: 100%;
      height: 100%;
      
      cursor: pointer;
      &:hover{
        .icon-inner{
          background-color:#0566ce;
          .el-icon-right{
            color:#fff;
          }
          
        }
      }
      .et-img{
        width: 100%;
        height: 238px;
        img{
          width: 100%;
          height:100%;
        }
      }
      .et-desc{
        width: 100%;
        height: 82px;
        padding:15px 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .et-info{
          height:100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          h2{
            font-size:16px;
            color:#333333;
          }
          p{
            color:#666666;
            font-size:14px;
          }
        }
        .icon  {
          .icon-inner{
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size:30px;
            color: #c9c9c9;
          }
        }
      }
    }
  }
</style>