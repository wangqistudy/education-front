/*
 * @Author: David
 * @Date: 2019-10-25 17:41:56
 * @LastEditTime: 2019-10-25 19:16:32
 * @LastEditors: Do not edit
 * @Description: 
 */
let store;

function getStore() {
  return store
}

function setStore (stores) {
  store = stores;
}

export {getStore,setStore}

export default {
  getStore,setStore
}
