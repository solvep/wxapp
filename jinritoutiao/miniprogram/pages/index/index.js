wx.cloud.init({
})
const db = wx.cloud.database();
const articles = db.collection('articles');
Page({
  data:{
      searchtitleList:[
        "小米9曝光 | 阿里巴巴市值 | 刘强东最新消息",
        "阿里巴巴市值 | 雷军的代码 | 小马智星",
        "刘强东最新消息 | 林宥嘉 | 姚期智",
        "华为mate20 | 人工智能| DL深度学习",
        "京东市值 | 今日头条上市 | 肖申克的救赎",
        "达摩教学 | 94年上帝想看电影 | 东华理工大学",
        "RNG最后团战语音 | IG必胜 | S8赛冠军",
        "美女与野兽全集 | 日本女优的日常 | 好看大片",
        "睡美人视频 | 文档流 | css渲染",
        "张三的故事 | 睡美人的故事 | 美女与野兽"
      ],
      searchtitle:'',
      category:[
        {name:'关注',id:'guanzhu'},{name:'推荐',id:'tuijian'},
        { name:'热点',id:'redian'},{ name:'南昌',id:'nanchang'},
        {name:'视频', id:'shipin'},{name:'小视频',id:'xiaoshipin'
        },{name:'问答',id:'wenda'},{name:'图片',id:'tupian'},
        {name:'娱乐',id:'yule'},{ name:'科技',id:'keji'},
      ],
      curIndex:1, 
      clientHeight:750,
      toView: 'tuijian',
      articles:{}
  },
  onLoad(){
    articles.get().then(res =>{
      console.log(res.data)
      this.setData({
        articles:res.data
      }, () => {
        wx.hideLoading()
      })
    })
    this.setData({
      searchtitle:this.data.searchtitleList[Math.floor(Math.random() * 10 + 1)] , //强行制造随机出现的假象
    })
    wx.getSystemInfo({
        success:(res) => {
         this.setData({
            clientHeight: res.windowHeight
          });
        }
      });
  
  },
  toSearchview() {
    wx.navigateTo({
      url: '../search/search'
    })
  },
  switchCategory(e) {
    this.setData({
      curIndex: e.currentTarget.dataset.index,
      toView: e.currentTarget.dataset.id,
    })
  },
  swiperchange: function (e) {
    var that = this
    console.log(e.detail.current)
    that.setData({
      curIndex: e.detail.current
    })
    }
})