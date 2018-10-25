const app = getApp()

Page({
    data:{
      stories:[],
      currentVid:null,
      currentVideo:null,
    },
  onLoad() {
    this.setData({
      stories: app.globalData.stories

    })
    // console.log(this.data);
  },
  play(event){
    if(this.data.currentVid !== null){
      this.data.currentVideo.pause();
    }
    const vid = event.currentTarget.dataset.vid;
    const currentVideo = wx.createVideoContext(`${vid}`)
    this.setData({
      currentVideo,
      currentVid:vid
    })
  }
});