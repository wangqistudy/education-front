<!--
 * @Author: David
 * @Date: 2019-10-18 16:32:04
 * @LastEditTime: 2019-10-18 17:01:52
 * @LastEditors: Do not edit
 * @Description: 选择器
 -->
<template>
  <div class="line-select-wrap">
      <div class="line-select" :style="{paddingLeft:labelWidth}">
          <span class="select-label" :style="{width:labelWidth,textAlign:labelAlign}">
              {{info.label}}
          </span>
          <span class="select-item" v-for="(val,index) in info.selections" :key="index" :class="{act:val.value==value}"
          @click="handleChange(val)"
          >
            {{val.label}}
          </span>
      </div>
  </div>
</template>
<script>
export default {
  name:'lineSelect',
  model: {
    prop: 'value',
    event: 'changeSel'
  },
  props:{
    labelWidth:{
      type:String,
      default () {
        return '50px'
      }
    },
    labelAlign:{
      type:String,
      default () {
        return 'left'
      }
    },
    info:{
      type:Object,
      required:true
    },
    value:{
      type:[Number,String],
      default () {
        return 0
      }
    }
  },
  data () {
    return {
      
    }
  },
  methods:{
    handleChange (val) {
      this.$emit('changeSel',val.value)
    }
  }
  
}
</script>

<style lang="scss" scoped>
    .line-select-wrap{
      width:100%;
      .line-select{
        width:100%;
        position: relative;
        .select-label{
          color:#999999;  
          position: absolute;
          left:0;
          top:0;
        }
        .select-item{
          color:#333333;
          margin-right:34px;
          cursor: pointer;
          &.act{
            color:#0566ce;
          }
          &:hover{
            color:#0566ce;
          }
        }
      }
    }
</style>