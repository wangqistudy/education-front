<!--
 * @Author: David
 * @Date: 2019-10-16 10:52:55
 * @LastEditTime: 2019-12-05 17:48:14
 * @LastEditors: Do not edit
 * @Description: 导航栏
 -->
<template>
  <div class="app-nav-warpper">
      <div class="nav-inner flex flex-align-center flex-space-between">
          <!-- logo部分 --> 
          <div class="nav-logo flex flex-align-center">
              <img src="~@/assets/icon_demo.png" alt="" class="logo">
              <p >{{company_name}}</p>
          </div>
          <!-- logo部分 -->

          <!-- 导航部分 -->
          <div class="nav-list-wrap flex flex-space-between flex-align-center">

              <ul class="nav-lists flex">
                  <li v-for="(val,index) in nav_options" :key="index"
                  :class="{act:navAct(val)}"
                  >   
                      <a v-if="user.discuz_token&&val.label=='交流中心'" target="_blank" :href="`http://admin.zwk7.top/upload?discuz_token=${user.discuz_token}`">{{val.label}}</a>
                      <span v-else @click="handleLinkTo(val)" >{{val.label}}</span>
                      
                  </li>
              </ul>

              <!-- 登录注册按钮 -->
              <el-button class="login-btn" @click="openLogin" v-if="!user.id">
                <span>登录/注册</span>
              </el-button>


              <!-- 登录人信息图标 -->
                <div class="userinfo" v-else>
                  <div class="avatar-wrap">
                      <appIcon
                      v-if="user.sex==1"
                      iconName="icon-nan1"
                      :size="1"
                      >
                      </appIcon>
                      <appIcon
                      v-else
                      iconName="icon-nv2"
                      :size="1"
                      >
                      </appIcon>
                  </div>
                    
                  <span class="username ellipsis" :title="user.name||user.login||user.mobile">{{user.name||user.login||user.mobile}}</span>
                  <appIcon
                  iconName="icon-tuichu"
                  :size="1.5"
                  style="cursor:pointer;"
                  title="退出登录"
                  @click.native="logout"
                  >
                    
                  </appIcon>
                  
                </div>
              <!-- 登录人信息图标 -->

          </div>
          <!-- 导航部分 -->

          

      </div>
  </div>
</template>
<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import appIcon from '@/components/appIcon'
export default {
  components:{appIcon},
  name:'app-nav',
  data () {
    return {
      company_name:'少儿编程',
      nav_options:[
        {
          label:'首页',
          path:'/',
          includePath:['/']
        },
        {
          label:'选课中心',
          path:'/chooselesson',
          includePath:['/chooselesson','/order','/lesson']
        },
        {
          label:'名师介绍',
          path:'/teacherdetail',
          includePath:['/teacherdetail','/teacher']
        },
        {
          label:'视频点播',
          path:'/video',
          includePath:['/video','/videodetail']
        },
        {
          label:'交流中心',
          path:'/comunity',
          includePath:['/comunity']
        },
        {
          label:'新闻资讯',
          path:'/news',
          includePath:['/news','/newsdetail']
        },
        {
          label:'关于我们',
          path:'/about',
          includePath:['/about']
        },
        {
          label:'个人中心',
          path:'/usercenter',
          includePath:['/usercenter']
        }
      ]
    }
  },
  computed:{
    ...mapState({
      user:state=>state.user.user,
      vuexRoute:state=>state.route
    }),
    
  },
  methods:{
    navAct (item) {
      let {includePath} = item
      return includePath.some(str=>{
        if (str==='/'){
          return this.$route.path === item.path;
        }else{
          return this.$route.path.indexOf(str)>=0
        }
      })
      return true
    },
    handleLinkTo (item) {
      if (item.label=='交流中心'&&!this.user.discuz_token) {
        this.openLogin()
        return;
      }
      this.$router.push({path:item.path})
    },
    ...mapActions({
      openLogin:'user/openLogin',
      openRegister:'user/openRegister',
      openForgetModel:'user/openForgetModel',
      closeForgetModel:'user/closeForgetModel',
      closeLoginModel:'user/closeLoginModel',
      LogOut:'user/logout',
    }),
    logout () {
        this.LogOut({cb:()=>{
          
        }})
    },
    getCurrPath (val) {

    }
    
  }
}
</script>
<style lang="scss" scoped>
    @import '../style/base.scss';
    .app-nav-warpper{
      width:100%;
      height:100px;
      background-color:#fff;
      min-width: 1200px;
      display: flex;
      align-items: center;
      .nav-inner{
        width:1200px;
        margin:0 auto;
      }

      .nav-logo{
        img{
          width:62px;
          height:62px;
        }
        p{
          font-size:30px;
          color:$baseBlueColor;
        }
      }

      .logo{
        margin-right:8px;
      }

      .login-btn{
        border-radius: 40px;
        background-color:$baseBlueColor;
        color:#fff;
        border:none;
        font-size:$baseFontSize;
        padding:10px 25px;
        &:active{
          background-color:darken($color: $baseBlueColor, $amount: 10%)
        }
      }
      
      .nav-lists{
        li{
          margin-right:35px;
          font-size:18px;
          color:#333;
          position: relative;
          cursor: pointer;
          &.act{
            color:$baseBlueColor;
          }
          &:hover{
            color:$baseBlueColor;
            a{
              text-decoration: none;
            }
          }
          &.active{
            color:$baseBlueColor;
          }
        }
      }
    }
    .userinfo{
      display:flex;
      align-items: center;
      .username{
        margin-right:5px;
        max-width: 100px;
      }
      .avatar-wrap{
        width: 36px;
        height: 36px;
        font-size:30px;
        margin-right:10px;
        background-color:#b1cdf5;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        border-radius: 36px;
        overflow:hidden;
        
      }

    }
    
</style>