<!--
 * @Author: David
 * @Date: 2019-10-16 09:21:37
 * @LastEditTime: 2019-12-05 16:30:39
 * @LastEditors: Do not edit
 * @Description: app
 -->
<template>
  <div id="app">
    <div id="appNav" class="absolute">
        <AppNav></AppNav>
    </div>

    <div id="appBody">
      <nuxt/>  
    </div>

    <div id="appFooter">
      <!-- 底部 -->
      <div class="footerWrap">
        <pageFooter
        bgColor='#f9f9f9'
        >

        </pageFooter>
        </div>
    </div>

    <!-- 登录modal -->
    <!-- 登录注册 -->
            <el-dialog :visible.sync="loginModel.show" width="404px" :close-on-click-modal="false"
            @close="resetFileds('loginForm')"
            >
                  <div class="login_rigster">
                      <div class="login_header flex flex-space-between">
                          <span :class="[loginModel.tab=='1'?'act':'']" @click="openLogin">扫码登录</span>
                          <span :class="[loginModel.tab=='2'?'act':'']" @click="openRegister">手机登录</span>
                      </div>
                      <div class="login_body">
                          
                          <!-- 二维码登录 -->
                          <div class="wxlogincard" v-show="loginModel.tab=='1'">
                              <div class="erwm-wrap">
                                  <img :src="qrcodeImg" alt="">
                              </div>
                              <p><span>无需注册</span>，打开微信扫码使用</p>
                          </div>

                          <!-- 手机登录 -->
                          <div class="mobilelogincard" v-show="loginModel.tab=='2'">
                              <el-form :model="mobileLoginForm" :rules="formRule" ref="loginForm">
                                    <el-form-item prop="mobile">
                                        <el-input placeholder="请输入手机号" v-model="mobileLoginForm.mobile">

                                        </el-input>
                                    </el-form-item>
                                    <el-form-item prop="password">
                                        <el-input placeholder="请输入密码" type="password" v-model="mobileLoginForm.password">
                                            
                                        </el-input>
                                    </el-form-item>


                                    <el-form-item prop="code" class="codeFormItem">
                                        <el-input placeholder="请输入图片验证码" v-model="mobileLoginForm.code" style="width:172px;">
                                        </el-input>
                                        <div class="imgCode" @click="getCodeImg">
                                          <img :src="codeImg" alt="">
                                        </div>
                                    </el-form-item>
                                   
                                    <el-form-item class="recordFormItem">
                                        <el-checkbox v-model="recordInfo">记住我的账号</el-checkbox>
                                        <p @click="handleForgetPass">忘记密码?</p>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button class="submitBtn" @click="handleLogin" :loading="loginLoading.loading">
                                                  {{loginLoading.loadingText}}
                                        </el-button>
                                    </el-form-item>
                              </el-form>
                          </div>
                          <!-- 手机登录 -->


                      </div>
                  </div>
            </el-dialog>
        <!-- 登录注册 -->


        <!-- 手机绑定 -->
        <el-dialog :visible.sync="bindModel.show" width="404px" :close-on-click-modal="false" :show-close="bindModel.showClose"
        @close="resetFileds('registerForm')"
        >
                  <div class="login_rigster">
                      <div class="login_header flex flex-space-center">
                          <span :class="['act']">绑定手机号</span>
                      </div>
                      <div class="login_body">

                          <!-- 手机注册 -->

                          <div class="mobilelogincard">
                              <el-form :model="mobileBindForm" :rules="mobileFormRule" ref="registerForm">
                                    <el-form-item prop="mobile">
                                        <el-input placeholder="手机号" v-model="mobileBindForm.mobile">

                                        </el-input>
                                    </el-form-item>
                                    <el-form-item prop="code">
                                        <el-input placeholder="验证码" v-model="mobileBindForm.code"
                                        class="phoneCode"
                                        :class="[isSendedCode?'disa':'']"
                                        >
                                              <template slot="append">
                                                 <span @click="getCode" v-if="showCode" style="cursor:pointer">获取验证码</span>
                                                 <span v-else>{{count}}s后重新发送</span> 
                                              </template>
                                        </el-input>
                                    </el-form-item>
                                     <el-form-item prop="password">
                                        <el-input placeholder="登录密码(8-16位数字\字母组合)" type="password" v-model="mobileBindForm.password">
                                            
                                        </el-input>
                                    </el-form-item>
                                     <el-form-item prop="repassword">
                                        <el-input placeholder="请确认登录密码" type="password" v-model="mobileBindForm.repassword">
                                            
                                        </el-input>
                                    </el-form-item>

                                    <el-form-item class="agreementItem" prop="agreement">
                                       <el-checkbox v-model="mobileBindForm.agreement">我同意</el-checkbox>
                                        <p @click="viewAgreement">《用户注册协议》</p>
                                    </el-form-item>

                                    <el-form-item>
                                        <el-button class="submitBtn" @click="doBindMobile" :loading="registerLoading.loading">
                                                  {{registerLoading.loadingText}}
                                        </el-button>
                                    </el-form-item>
                              </el-form>
                          </div>
                          <!-- 手机注册 -->


                      </div>
                  </div>
            </el-dialog>

        <!-- 手机绑定 -->



    <!-- 忘记密码modal -->
    <el-dialog :visible.sync="forgetPassModel" width="404px" :close-on-click-modal="false" @close="()=>{closeForgetModel();resetFileds('forgetForm')}">
              <div class="login_rigster">
                  <div class="login_header flex flex-space-center">
                      <span :class="[true?'act':'']">忘记密码</span>
                  </div>
                  <div class="login_body">

                      <!-- 手机注册 -->

                      <div class="mobilelogincard">
                          <el-form :model="forgetForm" :rules="fogetFormRule" ref="forgetForm">
                                <el-form-item prop="mobile">
                                    <el-input placeholder="手机号" v-model="forgetForm.mobile">

                                    </el-input>
                                </el-form-item>
                                <el-form-item prop="code">
                                    <el-input placeholder="验证码" v-model="forgetForm.code"
                                    class="phoneCode"
                                    :class="[isSendedCode?'disa':'']"
                                    >
                                          <template slot="append">
                                              <span @click="getCode1" v-if="showCode1" style="cursor:pointer">获取验证码</span>
                                              <span v-else>{{count1}}s后重新发送</span> 
                                          </template>
                                    </el-input>
                                </el-form-item>
                                  <el-form-item prop="password">
                                    <el-input placeholder="登录密码(8-16位数字\字母组合)" type="password" v-model="forgetForm.password">
                                        
                                    </el-input>
                                </el-form-item>
                                  <el-form-item prop="repassword">
                                    <el-input placeholder="请确认登录密码" type="password" v-model="forgetForm.repassword">
                                        
                                    </el-input>
                                </el-form-item>

                                <el-form-item>
                                    <el-button class="submitBtn" @click="doForget" :loading="forgetLoading.loading">
                                          {{forgetLoading.loadingText}}
                                    </el-button>
                                </el-form-item>
                          </el-form>
                      </div>
                      <!-- 手机注册 -->


                  </div>
              </div>
        </el-dialog>
        <!-- 忘记密码modal -->


        <!-- 协议modal -->
        <el-dialog :visible.sync="areementModalInfo.show" width="603px" :close-on-click-modal="false" style="border-radius:10px;" :show-close="false">
            <template slot="title">
                <h3 class="areemntTitle">{{areementModalInfo.title}}</h3>
            </template>
            <div class="areementWrap">
              <el-scrollbar style="height:100%">
                  <div class="arementContent" v-html="areementModalInfo.content">
                    
                  </div>
              </el-scrollbar>
            </div>

            <template slot="footer">
                <div class="footer-btn">
                    <redBtn
                    lable="我已阅读"
                    @click="handleViewedAgree"
                    ></redBtn>
                </div>
            </template>
        </el-dialog>
        <!-- 协议modal -->


        <!-- 基本资料modal -->
          <el-dialog :visible.sync="infoModel.show" width="404px"  :close-on-click-modal="false" :show-close="infoModel.showClose"
          @opened="handleInfoOpend"
          @close="resetFileds('infoForm')"
          >
              <div class="login_rigster">
                  <div class="login_header flex flex-space-center">
                      <span :class="[true?'act':'']" >基本资料填写</span>
                  </div>
                  <div class="login_body">

                      <!-- 手机注册 -->

                      <div class="mobilelogincard">
                          <el-form :model="infoForm" :rules="infoFormRule" ref="infoForm">
                                <el-form-item prop="name">
                                    <el-input placeholder="请输入姓名" v-model="infoForm.name">

                                    </el-input>
                                </el-form-item>
                                <el-form-item prop="sex">
                                   <div class="sexWrap">
                                     <span>
                                       性别：
                                     </span>
                                     <el-radio-group v-model="infoForm.sex">
                                        <el-radio :label="1">男</el-radio>
                                        <el-radio :label="2">女</el-radio>
                                      </el-radio-group>
                                   </div>
                                </el-form-item>
                                  <el-form-item prop="grade">
                                    <el-select placeholder="请输选择年级" type="password" v-model="infoForm.grade">
                                        <el-option
                                        v-for="(grade,index) in gradeOptions"
                                        :key="index"
                                        :label="grade.label"
                                        :value="grade.value"
                                        >

                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                  <el-form-item prop="schoolName">
                                    <el-input placeholder="请确入学校名称" v-model="infoForm.schoolName">
                                        
                                    </el-input>
                                </el-form-item>

                                <el-form-item>
                                    <el-button class="submitBtn" @click="doSubInfo" :loading="infoLoading.loading">
                                              {{infoLoading.loadingText}}
                                    </el-button>
                                </el-form-item>
                          </el-form>
                      </div>
                      <!-- 手机注册 -->


                  </div>
              </div>
        </el-dialog>
        <!-- 基本资料modal -->


        <!-- 信息modal -->


        <el-dialog :visible.sync="messageInfo.show" width="404px"  :close-on-click-modal="false" :show-close="true">

            <div class="messageWrap">
              <div class="messageIcon">
                  <appIcon
                  iconName="icon-AIOS_zhucechenggong"
                  :size="1.6"
                  v-if="messageInfo.type=='success'"
                  >

                  </appIcon>
                  <appIcon
                  iconName="icon-cuowu"
                  :size="1.6"
                  v-else-if="messageInfo.type=='error'"
                  >

                  </appIcon>
                  <appIcon
                  iconName="icon-jinggao"
                  :size="1.6"
                  v-else
                  >

                  </appIcon>
              </div>

              
              <div class="messageContent">
                  <h3>{{messageInfo.msg}}</h3>
              </div>

              <div class="messageDetail" v-if="messageInfo.subMsg" v-html="messageInfo.subMsg">

              </div>

            </div>
              
        </el-dialog>


        <!-- 信息modal -->


        




    
  </div>
</template>

<script>
  import AppNav from '@/components/appNav'
  import {mapState,mapActions,mapMutations} from 'vuex'
  import redBtn from '@/components/redBtn'
  import pageFooter from '@/components/pageFooter'
  import appIcon from '@/components/appIcon'
  import messageBox from '@/utils/messageBox'
  import {getKey,setKey,removeKey} from '@/utils/cookieStorage'
  import {baseUrl} from '@/utils/fetch'
  import api from '@/utils/api'
  export default {
      name:'app',
      components:{AppNav,redBtn,appIcon,pageFooter},
      async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
        let data = await api.gradeOptions()
        let gradeOptions = data.data.map(item=>{
            return {value:item.id,label:item.value}
          });
        return {gradeOptions,firstRendered:true}
      },
      mounted () {
          if (process.client) {
              document.getElementById('app').style.minHeight = window.innerHeight+'px';
              this.getGradeOptions()
          }
      },
      data () {
        // 手机验证
        let validatorMobile = (rule,value,cb)=>{
            if (!value){
              return cb(new Error('手机号不能为空'))
            }
            let reg = /^1[3456789]\d{9}$/
            if (!reg.test(value)){
              return cb(new Error('手机号格式不正确'))
            }
            cb()
        }

        // 密码验证
        let validatorPassword = (rule,value,cb)=>{
           if (!value){
              return cb(new Error('密码不能为空'))
            }
            let reg = /^[0-9A-Za-z]{8,16}$/
            if (!reg.test(value)){
              return cb(new Error('密码应为8-16位数字、字母组成'))
            }
            cb()
        }

        // 密码验证
        let validatorPasswordEmpty = (rule,value,cb)=>{
           if (!value){
              return cb(new Error('密码不能为空'))
            }
            
            cb()
        }

        // 验证码验证
        let validatorCode = (rule,value,cb)=>{
            if (!value){
              return cb(new Error('验证码不能为空'))
            }
            cb()
        }

        // 注册验证重复密码
        let validatorRepass = (rule,value,cb)=>{
             if (!value){
              return cb(new Error('密码重复不能为空'))
            }
             if (value!=this.mobileBindForm.password){
              return cb(new Error('两次输入的密码不一致'))
            }
            cb()
        }

        // 忘记密码验证重复密码
        let validatorRepassForget = (rule,value,cb)=>{
             if (!value){
              return cb(new Error('密码重复不能为空'))
            }
             if (value!=this.forgetForm.password){
              return cb(new Error('两次输入的密码不一致'))
            }
            cb()
        }

        // 注册协议
        let validatorAgreement = (rule,value,cb)=>{
          if (!value){
            return cb(new Error('请勾选用户协议'))
          }
          cb()
        }

        // 信息姓名校验
        let validatorName = (rule,value,cb)=>{
          if (!value){
            return cb(new Error('请填写姓名'))
          }
          cb()
        }

        // 年级校验
        let validatorGrade = (rule,value,cb)=>{
          if (!value){
            return cb(new Error('请选择年级'))
          }
          cb()
        }

        // 学校校验
        let validatorSchool = (rule,value,cb)=>{
          if (!value){
            return cb(new Error('请填写学校'))
          }
          cb()
        }


        return {
          firstRendered:false,
          qrcodeImg:'',
          mobileLoginForm:{
            mobile:'',
            password:'',
            code:''
          },
          showCode:true,
          showArgreement:false,
          showInfoForm:false,
          isSendedCode:false,
          count:60,
          showCode1:true,
          isSendedCode1:false,
          count1:60,
          recordInfo:false,
          gradeOptions:[
            
          ],
          mobileBindForm:{
            mobile:'',
            code:'',
            password:'',
            repassword:'',
            agreement:false

          },
          infoForm:{
            name:'',
            sex:1,
            grade:'',
            schoolName:''
          },
          infoFormRule:{
            name:[
              {validator:validatorName}
            ],
            grade:[
              {validator:validatorGrade}
            ],
            schoolName:[
              {validator:validatorSchool}
            ]
          },
          forgetForm:{
            mobile:'',
            code:'',
            password:'',
            repassword:''
          },
          mobileFormRule:{
            mobile:[
              {validator:validatorMobile}
            ],
            password:[
              {validator:validatorPassword}
            ],
            code:[
              {validator:validatorCode}
            ],
            repassword:[
              {validator:validatorRepass}
            ],
            agreement:[
              {validator:validatorAgreement}
            ]
          },
          fogetFormRule:{
            mobile:[
              {validator:validatorMobile}
            ],
            password:[
              {validator:validatorPassword}
            ],
            code:[
              {validator:validatorCode}
            ],
            repassword:[
              {validator:validatorRepassForget}
            ]
          },
          loginLoading:{
            loading:false,
            loadingText:'登录'
          },
          registerLoading:{
            loading:false,
            loadingText:'注册'
          },
          forgetLoading:{
            loading:false,
            loadingText:'确定'
          },
          infoLoading:{
            loading:false,
            loadingText:'确定'
          },
          formRule:{
            mobile:[
               {validator:validatorMobile}
            ],
            password:[
              {validator:validatorPasswordEmpty}
            ],
            code:[
              {validator:validatorCode}
            ]
          }
        }
      },
      watch:{
        showCode (news) {
            if (!news){
              let step = ()=>{
                this.count>1&&this.count--
                if (this.count==1){
                  this.showCode = true;
                  this.count = 60
                }else{
                  setTimeout(()=>{
                    step()
                  },1000)
                }
              }
              setTimeout(step,1000)
            }
        },
        showCode1 (news) {
            if (!news){
              let step = ()=>{
                this.count1>1&&this.count1--
                if (this.count1==1){
                  this.showCode1 = true;
                  this.count1 = 60
                }else{
                  setTimeout(()=>{
                    step()
                  },1000)
                }
              }
              setTimeout(step,1000)
            }
        },
        'loginModel.show' :function (news) {
            if (news&&this.loginModel.tab==1) {
                this.get_qrcode()
            }
            if(!news) {
              clearTimeout(this.timer)
              this.timer = null
            }
        },
        'loginModel.tab':function (news) {
            if (news!=1) {
              clearTimeout(this.timer)
              this.timer = null
            }else{
              this.loginModel.show&&this.get_qrcode()
            }
        }
      },
      computed:{
        ...mapState({
          user:state=>state.user.user,
          setting:state=>state.global.setting,
          loginModel:state=>state.user.loginModel,
          forgetPassModel:state=>state.user.forgetPassModel,
          infoModel:state=>state.user.infoModel,
          bindModel:state=>state.user.bindModel,
          imgUUid:state=>state.user.imgUUid,
          codeImg:state=>state.user.codeImg,
          messageInfo:state=>state.alertModal.info,
          areementModalInfo:state=>state.user.areementModalInfo,
          registerDocument:state=>state.global.registerDocument,
          enteredDocument:state=>state.global.enteredDocument
        })
      },
      methods:{
        resetFileds (refKey) {
          this.$refs[refKey]&&this.$refs[refKey].resetFields()
        },
        ...mapMutations({
            updateUser:'user/updateUser'
        }),
        ...mapActions({
          openLogin:'user/openLogin',
          openRegister:'user/openRegister',
          openForgetModel:'user/openForgetModel',
          closeForgetModel:'user/closeForgetModel',
          closeLoginModel:'user/closeLoginModel',
          openBindMobileDialog:'user/openBindMobileDialog',
          closeBindMobileDialog:'user/closeBindMobileDialog',
          openAgreement:'user/openAgreement',
          closeAgreement:'user/closeAgreement',
          openInfo:'user/openInfo',
          closeInfo:'user/closeInfo',
          bind_mobile:'user/bind_mobile',
          getCodeImg:'user/getCodeImg',
          login:'user/login',
          forgetPass:'user/forgetPass',
          updateuserinfo:'user/updateuserinfo',
          getUserInfoByToken:'user/getUserInfoByToken',
          getSetting:'global/getSetting',
          getBanners:'global/getBanners',

        }),
        updateInfo () {
          if (getKey('xinyidai_Token')){
            this.getUserInfoByToken()
          }
        },
        handleInfoOpend () {
            if (this.infoModel.showClose==true){
              Object.keys(this.infoForm).forEach(key=>{
                if (key=='grade'){
                  this.infoForm[key] = this.user['grade_id']
                }else if (key=='schoolName'){
                  this.infoForm[key] = this.user['school']
                }else{
                  this.infoForm[key] = this.user[key];
                }
              })
            }
        },
        handleLogin () {
            this.$refs.loginForm.validate(valid=>{
              if (valid){
                this.loginLoading.loading = true
                this.loginLoading.loadingText = '登录中....'
                let {mobile,password,code} = this.mobileLoginForm
                let uuid = this.imgUUid
                this.login({param:{login:mobile,password,captcha:code,uuid},scb:(data)=>{
                  this.loginLoading.loading = false
                  this.loginLoading.loadingText = '登录'
                  this.closeLoginModel()
                  if (!data.data.name){
                      this.openInfo()
                  }

                  if (this.recordInfo) {
                      setKey('xiyidai:mobile',mobile)
                      setKey('xiyidai:password',password)
                  }else{
                      removeKey('xiyidai:mobile')
                      removeKey('xiyidai:password')
                  }

                },fcb:()=>{
                  this.loginLoading.loading = false
                  this.loginLoading.loadingText = '登录'
                }})
              }
            })
        },  
        doBindMobile () {
          this.$refs.registerForm.validate(valid=>{
            if (valid) {
              // 提交
              this.registerLoading.loading = true
              this.registerLoading.loadingText = '正在注册中....'
              let {mobile,password,code} = this.mobileBindForm;
              let open_id = this.user.open_id
              this.bind_mobile({param:{mobile,password,code,open_id},scb:()=>{
                 this.registerLoading.loading = false
                 this.registerLoading.loadingText = '注册'
                 this.closeBindMobileDialog()
                 if (!this.user.name){
                      this.openInfo()
                  }
              },fcb:()=>{
                  this.registerLoading.loading = false
                 this.registerLoading.loadingText = '注册'
              }})
            }
          })
        },
        // 获取公众号二维码
          get_qrcode () {
            api.get_qrcode()
            .then(data=>{
              this.qrcodeImg = data.data.qrCodeUrl
              this.login_token = data.data.loginToken
              this.startTimeStamp = null;
              this.qrcodeLogin();
            })
          },
          // 开始轮询
          qrcodeLogin (){
            this.startTimeStamp = this.startTimeStamp || Date.now();
            this.$http.post(`${baseUrl}/v1/front/wechat/login_wechat`,{loginToken:this.login_token})
            .then(data=>{
              data = data.data
                if (data.code==777){
                  messageBox.messageError(data.message||'该用户已被禁止');
                }
                if (data.code==-1){
                    this.timer = setTimeout(()=>{
                      let stamp = Date.now();
                      if (stamp-this.startTimeStamp>=60*1000*2){
                        this.closeLoginModel()
                        return;
                      }
                      this.qrcodeLogin()
                    },1000)
                }
                if (data.code==0){
                  this.updateUser(data.data);
                  this.closeLoginModel()
                  if (!this.user.mobile){
                    setTimeout(()=>{
                      this.openBindMobileDialog(false)
                    },1000)
                  }
                }
            })
          },
        doForget () {
          this.$refs.forgetForm.validate(valid=>{
            if (valid){
              this.forgetLoading.loading = true
              this.forgetLoading.loadingText = '提交中....'
              let {mobile,password,code} = this.forgetForm;
              this.forgetPass({param:{mobile,password,code},scb:()=>{
                this.forgetLoading.loading = false
                this.forgetLoading.loadingText = '确定'
                this.openRegister()
              },fcb:()=>{
                this.forgetLoading.loading = false
                this.forgetLoading.loadingText = '确定'
              }})
            }
          })
        },
        doSubInfo () {
          this.$refs.infoForm.validate((valid)=>{
            if (valid){
                this.infoLoading.loading = true;
                this.infoLoading.loadingText = '提交中....';
                let {name,sex,grade,schoolName} = this.infoForm
                this.updateuserinfo({param:{name,sex,grade,school_name:schoolName},scb :()=>{
                    this.infoLoading.loading = false;
                    this.infoLoading.loadingText = '确定';
                    let flag  = this.infoModel.showClose
                    this.closeInfo()
                    !flag&&messageBox.messageSuccess('恭喜您，注册成功！',`

                      <div style="margin-top:30px;text-align:center">
                          <p style="font-size:18px;color:#ff6c4a;margin-bottom:15px;">QQ：${this.setting.qq}</p>
                          <p style="color:#666666">请添加少儿编程QQ号，群里有老师专门为您解答各类问题</p>
                      </div>
                    
                    `)

                },fcb:()=>{
                    this.infoLoading.loading = false;
                    this.infoLoading.loadingText = '确定';
                }})
            }
          })
        },
        handleViewedAgree () {
          this.closeAgreement()
        },
        viewAgreement () {
          this.closeLoginModel()
          this.$viewCb = ()=>{
            this.mobileBindForm.agreement = true;
          }
          let areeCb = () =>{
              setTimeout(()=>{
                this.$viewCb()
                this.$viewCb = null
                areeCb = null
              },300)
          }
          setTimeout(()=>{
            this.openAgreement({title:'用户协议',content:this.registerDocument,areeCb})
          },300)
        },
        handleForgetPass () {
          this.closeLoginModel()
          setTimeout(()=>{
            this.openForgetModel()
          },500)
          
        },
        getCode () {
          if (!/^1[345678]\d{9}$/.test(this.mobileBindForm.mobile)){
            messageBox.messageError('手机号格式不正确')
            return;
          }
          api.sendCode({mobile:this.mobileBindForm.mobile})
          .then((data)=>{
              this.showCode = false
          })
        },
        getCode1 () {
          if (!/^1[345678]\d{9}$/.test(this.forgetForm.mobile)){
            messageBox.messageError('手机号格式不正确')
            return;
          }
          api.sendCode({mobile:this.forgetForm.mobile,type:1})
          .then((data)=>{
              this.showCode1 = false
          })
        },
        getGradeOptions () {
          api.gradeOptions()
          .then(data=>{
            this.gradeOptions = data.data.map(item=>{
              return {value:item.id,label:item.value}
            });
          })
        }
      }
  }
</script>

<style lang="scss">
@import './style/init.scss';
body,html{
  height:100%;
}
body{
  overflow-y:auto;
  overflow-x:auto;
}
#app {
  font-family: "PingFang SC", "Microsoft YaHei", -apple-system-font, 黑体, "Helvetica Neue", Helvetica, STHeiTi, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height:100%;
  padding-top:100px;
  padding-bottom:130px;
  position: relative;
  min-width: 1250px;
  background-color:#f1f4f9;
}
#appNav {
  top:0;
  left:0;
  width: 100%;
}
#appBody{
  width: 100%;
  height:100%;
  background-color:#f1f4f9;
}
// 登录注册窗口
  .login_rigster{
    width:100%;
    border-radius: 8px;
    padding:0 32px;
    .login_header{
       overflow: hidden;
       margin-bottom: 38px;
       font-size: 16px;
       
      span{
        font-size: 16px;
        color:#999999;
        cursor: pointer;
        &.act{
          color:#000;
        }
       
      }
      
    }
    .login_body{
      width:100%;

      .wxlogincard{
        text-align: center;
        .erwm-wrap {
          width:222px;
          height:222px;
          margin:0 auto;
        }
        img{
          width:222px;
          height:222px;
          margin-bottom:33px;
        }
        p{
          font-size:14px;
          span{
            color:red;
          }
        }
      }
      .submitBtn{
        width:100%;
        color:#fff;
        background:#0566ce;
        border:none;
        padding:0;
        line-height: 36px;
        &:active{
          background-color:darken(#0566ce,10%);
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
    .el-input{
      /deep/.el-input__inner{
          height: 38px;
          line-height: 38px;
      }
    }
    .codeFormItem{
      /deep/.el-form-item__content{
        display:flex;
        justify-content: space-between;
      }
      .imgCode{
        width:118px;
        height:38px;
        display: inline-block;
        border-radius: 4px;
        border: 1px solid #DCDFE6;
        img{
          width:100%;
          height:100%;
        }
      }
    }
    .recordFormItem{
      /deep/.el-form-item__content{
        display:flex;
      }
      p{
        margin-left: 120px;
        cursor:pointer;
        color:#0566ce;
      }
    }
    .agreementItem{
      /deep/.el-form-item__content{
        display:flex;
      }
      p{
        margin-left: 10px;
        cursor:pointer;
        color:#0566ce;
      }
    }

    .phoneCode{
      /deep/.el-input-group__append{
        background-color: #0566ce;
        border: 1px solid #0566ce;
        color:#fff;
        
      }
    }

    .el-dialog__wrapper{
      /deep/.el-dialog{
        border-radius:10px;
      }
      /deep/.el-dialog__header{
        padding-bottom:0;
      }
      /deep/.el-dialog__footer{
        padding-top:0;
      }
    }

    .areementWrap{
      width:100%;
      background:#fff;
      height: 500px;
      overflow-x:hidden;
      overflow-y: auto;
     /deep/.el-scrollbar__wrap{
        overflow-x:hidden;
      }
      .arementContent{
        /deep/p{
          line-height: 26px;
          text-indent: 2em;
          color:#333333;
        }
      }
      
    }
     .areemntTitle{
        text-align: center;
      }
    .footer-btn{
        display: flex;
        justify-content: center;
      }
      .el-select{
        width:100%;
      }

      .messageContent{
        margin-top:24px;
        text-align:center;
        
        h3{
          color:#666666;
          font-size:18px;
        }
      }
      .messageDetail{
        text-align: center;
      }

      .messageIcon{
        font-size:30px;
        display: flex;
        justify-content: center;
      }
      #appFooter{
        width:100%;
        position: absolute;
        bottom:0;
        left:0;
        min-width: 1250px;
        .footerWrap{
          width: 100%;
        }
      }
      .arementContent{
        padding-right:8px;
      }
</style>
