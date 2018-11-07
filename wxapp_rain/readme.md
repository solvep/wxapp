canvas 游戏及特效
小程序里canvas 大小是px scale 
绘图API 跟web中有区别   

ctx + 绘图API 将绘制的细节封装出去
画布 wx.createCanvasContext() 跟web不一样的地方
它的实现使用了IOS/Android的一套
封装 绘图这块，封装到utils里 统一封装
canves-id="effect" 
ctx，
画布大小 解构width scale height
用结构不要直接this.data 更大的消耗  this.data 是比较大的
drawEffect(width,height,scale,....)

utils 
    小程序里canvas，特效只有一部分，将它封装吧，有利于将复杂部分隐去，适合多人合作