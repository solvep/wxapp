import drawEffect from '../../lib/effect'
Page({
  data:{
    width:0,
    scale:1,
  },
  onLoad(){
    wx.getSystemInfo({
      success: (res)=> {
        let width = res.windowWidth
        this.setData({
          width,
          scale:width / 375
        });
    }
    });

    // 初始化canvas
    const canvasId = "effect";
    // canvas绘图 内部的世界context绘图的上下文环境
    const ctx = wx.createCanvasContext(canvasId);
    // canvas的绘制大小  下雨的效果没什么界面的设计
    // 750 针对设计稿优先 canvas 是一张画布
    let {width,scale}= this.data
    let height = 768 / 2 * scale
    let rain = drawEffect(ctx,width,height,{amount:100,speedFactor:0.03})
    rain.run();
  }
})