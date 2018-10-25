import api from "./api.js"  //为了抽象封装 离开了页面时个独立的就可以为多个地方提供
import util from '../utils/util'   //工具去判断这些回调函数

function requset(url, data, successCb, errorCb, completeCb){
  wx.request({
    url,
    data,
    method:'GET',
    success:(res) =>{
      if(res.statusCode == 200 && util.isFunction(successCb))
      successCb(res.data)
    },
    error: () =>{
      if (util.isFunction(successCb))
      errorCb();
    },
    complete: () =>{
      if (util.isFunction(successCb))
      completeCb();
    }
  })
}
function requsetSearchBook(data,successCb,errorCb,completeCb){
  requset(api.APT_BOOK_SEARCH, data, successCb, errorCb,completeCb)
}
function requsetBookDetail(id, data, successCb, errorCb, completeCb){
  requset(api.API_BOOK_DETAIL.replace(':id', id), data, successCb, errorCb, completeCb)
}
export default{
  requsetSearchBook,
  requsetBookDetail
}