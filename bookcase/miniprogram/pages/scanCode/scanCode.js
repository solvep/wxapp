// miniprogram/pages/scanCode/scanCode.js
Page({
  scanCode: function() {
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['barCode'],
      success: res => {
       /*  wx.showToast({
          title: JSON.stringify(res.data)
        }) */
        console.log(res);
        wx.cloud.callFunction({
          name:'bookinfo',
          data:{
            isbn:res.result
          },success: res =>{
            // console.log(res);
            const bookString = res.result;
            const db = wx.cloud.database();
            const book = db.collection('mybook');
            db.collection('mybook').add({
              data:JSON.parse(bookString)
            })
          }
        })
      }
    })
  }
  
})