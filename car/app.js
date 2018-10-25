App({
  onLaunch () {
    // console.log('应用启动')
    wx.request({
      url: 'https://www.easy-mock.com/mock/5bcdcea16c5cf5220c328d64/car/car#!method=get',
      success: (respones) => {
        // const {slides,vehicles,stories} = respones.data;
        // console.log(slides, vehicles,stories);
        Object.assign(this.globalData,respones.data);
         console.log(this.globalData);
      }
    })
  },
  //全局的数据 App.js 是全局的 在页面的任何地方都可以用到 用户的登陆状态
  globalData:{
   motto:'间隔最棒'
  }
})