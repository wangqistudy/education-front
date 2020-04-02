/*
 * @Author: David
 * @Date: 2019-10-18 09:05:56
 * @LastEditTime: 2019-10-26 08:41:08
 * @LastEditors: Do not edit
 * @Description: 信息弹窗工具
 */
import {getStore} from '@/utils/store'
function baseMessage (type,content,detail) {
  let store = getStore()
  
  if (store.state.alertModal.info.show){
    store.dispatch('closeMessage',{})
    setTimeout(()=>{
      store.dispatch('alertModal/openMessage',{
        type:type,
        msg:content,
        subMsg:detail
      })
    },300)
  }else{
    store.dispatch('alertModal/openMessage',{
      type:type,
      msg:content,
      subMsg:detail
    })
  }
}


function messageSuccess (content,detail) {
 
  baseMessage('success',content,detail)
    
}

function messageError (content,detail) {
  baseMessage('error',content,detail)
}

function messageWarning (content,detail) {
  baseMessage('warnint',content,detail)
}

export {messageSuccess,messageError,messageWarning};

export default {messageSuccess,messageError,messageWarning};
