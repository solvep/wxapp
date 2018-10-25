// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      value:''
  },
  onChange(e){
    this.setData({
      value:e.detail
    })
    // console.log(e.detail)
  },
  onSearch(event){
    if(this.data.value){
      wx.showToast({
        title:'搜索：'+this.data.value,
        icon:'none'
      })
    }
  },
  onCancel(event){
    wx.showToast({
      title:'取消',
      icon:'none'
    })
  }
})