const app = getApp();

Page({
  // 数据
  data: {
    slides: [],
    entities: [],
 },
  onLoad(){
    this.setData({
      slides:app.globalData.slides,
      entities:app.globalData.vehicles
    })

  },
  testDrive(){
    console.log('test drive');
  },
  readMore(event){
     //小程序js api；
    wx.navigateTo({
      url: `/pages/vehicles/show?id=${event.target.dataset.id}`
    })
  }
})