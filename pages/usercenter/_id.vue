<!--
 * @Author: David
 * @Date: 2019-10-21 11:34:10
 * @LastEditTime: 2019-12-05 17:33:26
 * @LastEditors: Do not edit
 * @Description: 个人中心
 -->
<template>
  <div class="user-wrap">
      <div class="user">
        <div class="user-container">
            <div class="left-side">
                <!-- 信息面板 -->
                <div class="info-panel">
                  <div class="avatar-info">
                      <div class="avatar">
                        <div class="avatar-inner">
                          <appIcon
                          :iconName="user.sex==1?'icon-nan1':'icon-nv2'"
                          :size="1.8"
                          >

                          </appIcon>
                        </div>
                        
                        <div class="edit-icon" @click="handleEditInfo">
                           <appIcon
                           iconName="icon-bianji"
                           :size="0.9"
                           color="#2378d5"
                           >

                          </appIcon>
                        </div>
                      </div>
                      <div class="user-name">
                          <p class="name ellipsis" :title="user.name">{{user.name}}</p>
                          <p class="mobile">{{user.mobile}}</p>
                      </div>
                  </div>
                  <div class="base-info">
                    <p class="sex">性别：{{user.sex==1?'男':'女'}}</p>
                    <p class="sex">年级：{{(user.gradeName?user.gradeName:'')||'--'}}</p>
                    <p class="sex">学校：{{user.school||'--'}}</p>
                  </div>
                  
                </div>

                <div class="user-opt">
                    <div class="opt-header">
                        <span>个人中心</span>
                    </div>
                    <div class="opt-list">
                        <ul class="menu-list">
                          <li v-for="(item,index) in menuList" :key="index" :class="{act:currMenu==item.name}"
                          @click="handleMenu(item)"
                          >
                            {{item.label}}
                          </li>
                        </ul>
                    </div>
                </div>

                <!-- tab面板 -->
            </div>
            <div class="right-side">
                <component :is="currMenu"></component>
            </div>
        </div>
      </div>
  </div>
</template>
<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
import myOrder from '@/components/order'
import timetable from '@/components/timetable'
import lessonCollect from '@/components/collectLesson'
import teacherCollect from '@/components/teacherCollect'
import appIcon from '@/components/appIcon'
export default {
  name:'userCenter',
  components:{appIcon,myOrder,timetable,lessonCollect,teacherCollect},
  head () {
    return {
      title:'个人中心-少儿编程教育',
      meta:[
        { hid: 'description', name: 'description', content: '少儿编程,教育,培训,英语,政治,历史,物理,化学,生物,语文,数学,线上选课,视频选课' }
      ]
    }
  },
  data () {
    return {
      currMenu:'myOrder',
      menuList:[
        {
          label:'我的订单',
          name:'myOrder'
        },
        {
          label:'我的课表',
          name:'timetable'
        },
        {
          label:'课程收藏',
          name:'lessonCollect'
        },
        {
          label:'名师收藏',
          name:'teacherCollect'
        },
      ]
    }
  },
  computed:{
    ...mapState({
      user:state=>state.user.user
    })
  },
  methods:{
    ...mapActions({
      openInfo:'user/openInfo'
    }),
    handleMenu (item) {
        if (item.name==this.currMenu) {
          return;
        }
        this.currMenu = item.name;
    },
    handleEditInfo () {
      this.openInfo(true);
    }
  }
}
</script>
<style lang="scss" scoped>
    .user-wrap{
      width:100%;
      .user{
        width:100%;
        .user-container{
          max-width:1618px;
          min-width: 1200px;
          margin: 0 auto;
          padding-top:20px;
          min-height: 855px;
          .left-side{
            width: 230px;
            float: left;
            .info-panel{
              width: 100%;
              border:1px solid #dddddd;
              padding:11px 10px 16px;
              background-color:#fff;
              .avatar-info{
                width:100%;
                display: flex;
                align-items: center;
                .avatar{
                  width:70px;
                  height: 70px;
                  position: relative;
                  
                  .edit-icon{
                    position: absolute;
                    width: 24px;
                    height: 24px;
                    border-radius: 24px;
                    overflow: hidden;
                    border:1px solid #fff;
                    background-color:#b1cdf5;
                    top:-3px;
                    right:-8px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor:pointer;
                  }
                  .avatar-inner{
                    width:100%;
                    height: 100%;
                    display: flex;
                    align-items: flex-end;
                    justify-content: center;
                    font-size: 30px;
                    background-color:#b1cdf5;
                    border-radius: 100%;
                    overflow: hidden;
                  }
                }
                .user-name{
                  margin-left:18px;
                  .name{
                    max-width: 120px;
                  }
                  p{
                    font-size: 18px;
                    color:#333333;
                    &:first-child{
                      margin-bottom:16px;
                    }
                    &:last-child{
                      font-size: 14px;
                    }
                  }
                  
                }
              }
              .base-info{
                padding-left:10px;
                margin-top:10px;
                p{
                  margin-bottom:7px;
                  word-wrap:break-word;
                  word-break: break-all;
                  &:last-child{
                    margin-bottom:0;
                  }
                }
              }
            }

            .user-opt{
              width:100%;
              margin-top:20px;
              .opt-header{
                width:100%;
                height: 40px;
                background-color:#0566ce;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .opt-list{
                height: 572px;
                background-color:#fff;
                width:100%;
                padding-top:10px;
                .menu-list{
                  width:100%;
                  li{
                    width: 100%;
                    text-align: center;
                    line-height: 40px;
                    position: relative;
                    cursor: pointer;
                    &:hover{
                        background-color:#f1f4f9;
                    }
                    &.act{
                      background-color:#f1f4f9;
                      &::before{
                        content:'';
                        position: absolute;
                        height: 40px;
                        left:0;
                        top:0;
                        width: 4px;
                        background-color:#0566ce;
                      }
                    }
                  }
                }
              }
            }
          }
          .right-side{
            overflow: hidden;
            padding-left:18px;
          }
        }
      }
    }
</style>