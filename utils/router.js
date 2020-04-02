/*
 * @Author: David
 * @Date: 2019-10-25 17:41:56
 * @LastEditTime: 2019-10-26 09:59:40
 * @LastEditors: Do not edit
 * @Description: 
 */
let router;

function getRouter() {
  return router
}

function setRouter (routers) {
  router = routers;
}

export {getRouter,setRouter}

export default {
  getRouter,setRouter
}
