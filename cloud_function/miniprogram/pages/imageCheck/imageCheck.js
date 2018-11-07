Page({
  imgCheck:function(){
        wx.cloud.callFunction({
            name:'imageCheck'
        }).then(res =>{
            console.log(JSON.parse(res.result.body))
        })
    }
})