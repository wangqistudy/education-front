/*
 * @Author: David
 * @Date: 2019-10-26 09:52:46
 * @LastEditTime: 2019-10-26 12:29:31
 * @LastEditors: Do not edit
 * @Description: 解析cookie
 */
function cookieParse (str) {
  
  let cjson = {

  }
  if (!str){
    return cjson
  }
  str.split(';').forEach(kv=>{
    let key = kv.split('=')[0]
    if (key) {
      key = key.replace(/\s+/g,'')
    }
    let value = kv.split('=')[1]
    if (value){
      value = value.replace(/\s+/g,'')
    }
    cjson[key] = value
  })
  return cjson
}
export default cookieParse;