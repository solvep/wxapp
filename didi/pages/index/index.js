//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isLoading: true,
    navData:[]
  },
  onLoad: function () {
    this.requestCart();
    this.requestWaitingtime();
  },
  requestCart(e) {
    wx.request({
      url: 'https://www.easy-mock.com/mock/5aded45053796b38dd26e970/comments#!method=get',
      success: (res) =>{

      const navData = res.data.navData;
      const imgUrls = res.data.imgUrls;
      const cost = res.data.cost
      this.setData({
        navData,
        imgUrls,
        cost
      })
      }
    })
  }, 
  requestWaitingtime() {
    setTimeout(() => {
      util.request({
        url: 'https://www.easy-mock.com/mock/5aded45053796b38dd26e970/comments#!method=get',
        mock: false,
        data: {
        }
      }).then((res) => {
        const arr = res.data.waitingTimes;
        //   console.log(arr)
        var index = Math.floor((Math.random() * arr.length));
        // console.log(arr[index])
        this.setData({
          isLoading: false,
          waitingTimes: arr[index]
        })
      })
    }, 1000);
  },
})
