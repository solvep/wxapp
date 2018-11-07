
const db = wx.cloud.database();
const userInfo = db.collection('userInfo');
Page({
  data:{
    userList:[]
  },
  onLoad:function(){
    userInfo.get().then(res =>{
        this.setData({
          userList:res.data
        })
      }
    )
  },
  getUserInfo:function(result){
    // console.log(result);
    // openId 用户独有，我们拿不到，但是小程序的云函数可以拿，以前是好几个接口才能拿到
    // 云函数权限是超级管理员
    wx.cloud.callFunction({
      name:'getOpenId',
      complete: res => {
        //用户来了
        // console.log(res);
        // 一个用户生成了多条记录，错误 拿出_openId 到userinfo里面先查一下，where 
        let openid = res.result.openId
        // console.log(res.result);
        userInfo.where({
          _openid:openid
        }).count().then(res =>{
          console.log(res);
          if(res.total == 0){
          userInfo.add({
          data:result.detail.userInfo
        }).then(res =>{
          console.log(res);
        })
          }
        })
        
      }
    })
  },

  onShareAppMessage: (res) => {
    return {
      title: '唐唐的私照App',
      path: '/pages/index/index',
      imageUrl: 'https://636f-codingdream-74b4e5-1256758450.tcb.qcloud.la/687434.png',
      success: res => {
        console.log('转发成功')
      },
      fail: res => {
        console.log('转发失败')
      }
    }
  }
})