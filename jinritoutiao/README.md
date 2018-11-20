#### 应该每一个前端开发者都有一颗~~全干~~全栈的心💗吧。 那就让云开发满足你
云开发一出来就开始玩，云数据库，云函数，全栈的体验和开发速度，真的不是一般的爽。 接下来工作中要开发一款新闻类小程序，于是就开始了对头条君的调研，此篇文章，是我的个人总结和分析，欢迎大佬拍砖。
## 一. 准备
---
* 小程序云开发必须有小程序AppId才能使用，所以首先应先注册一个小程序账号（如果已有请忽略）。设置->开发设置中的小程序AppId
*  开发工具：编辑器-[vscode](https://code.visualstudio.com/Download)， [微信开发者工具](https://developers.weixin.qq.com/minigame/dev/devtools/download.html)
*  辅助工具：
    1. [Markman](http://www.getmarkman.com/)：图标标注工具，可用于取色、测量。
    2. [小程序云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)：文档
    3. [Iconfont-阿里巴巴矢量图标库](http://www.iconfont.cn/collections/detail?spm=a313x.7781069.1998910419.de12df413&cid=1312): 各种你需要的图标，下载代码，体量比用图片小多了
* 组件库
：刚开始项目的时候我使用了vant组件库，想快速的完成项目，写着写着就发现使用起来有点麻烦，样式达不到自己想要的。所以我果断抛弃了它，我当然不能承认自己菜，只好说这个组件坑，我的项目中也就没使用组件库。但用组件库能极大的提升开发的速度，听大佬说[wux](https://wux-weapp.github.io/wux-weapp-docs/#/quickstart)这个组件库很好用，同行们可以试试。感觉“真香”的记得告诉我
    
看看效果图：（没有展示全，下面有更多配图以供学习这个项目）

![](https://user-gold-cdn.xitu.io/2018/11/20/1672ccc1dabb6f48?w=401&h=710&f=gif&s=4638267)

## 二. 先聊聊云开发
---
**小程序云开发是什么？？？**
> 开发者可以使用云开发开发微信小程序、小游戏，无需搭建服务器，即可使用云端能力。

> 云开发为开发者提供完整的云端支持，弱化后端和运维概念，无需搭建服务器，使用平台提供的 API
> 进行核心业务开发，即可实现快速上线和迭代，同时这一能力，同开发者已经使用的云服务相互兼容 > ，并不互斥。

> 目前提供三大基础能力支持：
> * 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写自身业务逻辑代码
> * 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 数据库
> * 存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理

这是官方文档的描述

其实简单的来说小程序云开发是一款Serverless服务，开发者可以使用它开发微信小程序、小游戏，无需搭建服务器，即可使用云端能力。目前提供云函数、数据库、存储三大基础能力支持。，并且将这些能力封装成特定的接口，以wx.cloud.xxx来进行调用。
## 三.数据库建立
---
根据需求建立了三个集合 
1. 文章基本信息articles


![](https://user-gold-cdn.xitu.io/2018/11/18/16727698ef90c37a?w=1152&h=275&f=png&s=39918)
2. 文章详情detail    

![](https://user-gold-cdn.xitu.io/2018/11/18/1672769f3c163b94?w=1155&h=226&f=png&s=40736)
3.文章评论信息comment

![](https://user-gold-cdn.xitu.io/2018/11/18/167276abd79509de?w=1154&h=231&f=png&s=41313)

三个集合通过id字段“连接”，要是个新手这时会想那么麻烦干嘛，直接全部放一起，梭哈一下，全给拿过来，直接用。这肯定是不行的，想想要是这个数据多怎么办，你要让用户等你多久？ 作为前端工程师肯定是希望给用户带来极佳的使用体验，所以你想在页面上展示什么，就设置一个对应的数据去关联，要什么取什么。后台数据无非就是一对一，一对多，你要啥数据就用传相关字段进云函数，在云函数里进行简单的增删改查。


千万记住，要考虑你的集合数据的使用范围进行权限设置，比如我添加的是articles文章，那这是公开的。那我就应该在权限设置中修改为所有用户可读、仅管理员可写，默认的是仅创建者及管理员可读写。
![](https://user-gold-cdn.xitu.io/2018/11/18/1672776552dcffc4?w=800&h=278&f=png&s=40436)

如何建表，表和表之间的联系，在动手项目之前要考虑好，避免表里的内容重复导致内存浪费，在能实行其功能的基础上做到不浪费内存。我上面的表建的就有点问题，图片URL的地址存错了地方，而且在两表里都存储了，大家做的时候可以吸取我的教训。

## 四. 项目分析
---
头条功能那么多是不可能写的完，我们在这里就选择其首页、新闻详情、登录界面这部分来实现一下。

**首页推荐**：头条里面有不同的新闻样式，有无图的，一张图的还有三张图的，所以我们肯定要分离出不同的模板，根据后台传过来的数据去判断新闻的样式最后在页面中显示出来  数据驱动页面
- MVVM
   - M 是数据  模型
    - V  view 页面 视图
    - VM  数据绑定到界面上 视图模型 -> 模板{{}}

**新闻详情**：打开新闻详情页，分析之后发现大体分为三个部分 *头部的作者信息*  *新闻内容*
*底部的用户评论* 这些信息都是在云开发数据库中不同的集合里面，这些数据的提取操作封装在云函数里面以便调用 这三部分都是重复的结构抽离出来作为组件，组件非常的灵活，这样做的好处是页面结构将会更加的清晰，增加代码的复用性，并且耦合度降低，后续程序的维护也更为方便。

**登录界面**：直接使用wx.getUserInfo获得用户信息 后面会贴出js代码


## 五.功能实现不详解
---
**1. 目录**

![](https://user-gold-cdn.xitu.io/2018/11/19/167278f925e24a1e?w=376&h=684&f=png&s=56285)

**2. 首页**

![](https://user-gold-cdn.xitu.io/2018/11/18/167277e80f6538bc?w=406&h=712&f=png&s=140534)

该页面采用顶部的固定搜索栏、scroll-view和swiper内容区三个模块，三个模块均可采用绝对定位，搜索栏flex布局，swiper内容区内swiper-item有关注，推荐，热点，南昌和视频 

```
<scroll-view class="navBar-box" scroll-x="true" style="white-space: nowrap; display:flex ">
    <view class="cate-list {{curIndex==index?'on':''}}" wx:for="{{category}}" 
    wx:key="{{item.id}}" data-id="{{item.id}}" data-index="{{index}}" bindtap="switchCategory">
    {{item.name}}
    </view>
</scroll-view>
```
在jsdata里面 设置curIndex, toView,用以监控不同版块的状态 实现了将上面的scroll-view
和下面的文章swiper建立关系
```
 <swiper class="notes"  current="{{curIndex}}"  bindchange="swiperchange">
      <swiper-item class="focus">
            ...
        </swiper-item>
        <swiper-item class="category"  wx:key="{{item.id}}">
            <scroll-view class="cate-box"  scroll-y="true" bindscrolltolower="loadarticles">
            <view class="note" wx:for="{{notes}}" wx:for-item="note" wx:key="{{index}}">
                 <block wx:if="{{note.image.length < 3 }}">
                 <template is="templateone" data="{{...note}}"></template>
                 </block>
                 <block wx:elif="{{note.image.length >= 3}} ">
                 <template is="templatetwo" data="{{...note}}"></template>
                 </block>
      </view>
    </scroll-view>
  </swiper-item>
</swiper>
```
不同的新闻显示模板 使用组件化的概念，创建一个template文件夹

```
<template name="templateone">
  <view class="newList">
         ...
  </view>  
</template>
<template name="templatetwo">
  <view class="newList">
         ...
  </view>  
</template>
```
在需要用到模板的地方就可以直接使用

```
<import src="../../components/template/template.wxml"/>
```
既然要用到模板那接下来我们就把模板给写出来。分析一下模板里面的内容

![](https://user-gold-cdn.xitu.io/2018/11/19/16727ab461ace4f4?w=402&h=364&f=png&s=100547)

里面的数据除时间以外都是可以直接从后台调取在页面上显示出来的数据，但时间不一样，它是变化的
在数据库中time字段以时间戳的形式保存。在后面的详情页中也要用到时间的格式化，so写一个js封装起来

**数据的调取 JS**

在小程序中我们时时刻刻需要去请求数据，数据的调取封装起来是极好的，存在util里想用的时候拿一下就ok


```
wx.cloud.init();
const db = wx.cloud.database();
const notes = db.collection('articles');
// 加载notes，page=1默认形参 ，limit = 4 ，fn 
const loadNotes = (fn,page = 1,limit = 4) =>{
  //return 数据集 异步
  const skip = (page -1) * limit;
  notes
  .count()
  .then(() =>{
    return notes
    .limit(limit)
     .skip(skip)
    .get()
  })
  .then(res =>{
    //console.log(res.data)
    fn({
      data:res.data
    })
  })
  // fn(data);
};

module.exports = {
  loadNotes,
}

```

**WXS实现时间格式**

WXS 是小程序的一套脚本语言，结合WXML，可以构建出页面的结构。[了该一哈](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxs/)

新建一个timeapi.wxs文件，在template.wxml引用，定义模块名即可引用：

```
<wxs src="../../utils/timeapi.wxs" module="timeapi" ></wxs>
.....
 <text class="newList-item-time">{{timeapi.formatTime(time)}}</text>
```
timeapi.wxs文件和时间格式实现方法：

```
var formatTime = function (time) {
  // 获取当前时间
  var getUnix = function () {
    var date = getDate()
    return date.getTime()
  }
  // 获取今天零点时间
  var getTodayUnix = function () {
    var date = getDate()
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date.getTime()
  }
  // 获取今年的1月1日零点时间
  var getYearUnix = function () {
    var date = getDate()
    date.setMonth(0)
    date.setDate(1)
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date.getTime()
  }
  // 获取标准时间
  var getLastDate = function (time) {
    var date = getDate(time)
    var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    var day = date.getDay() < 10 ? '0' + (date.getDay()) : date.getDay()
    return date.getFullYear() + '-' + month + '-' + day
  }
  // 转换时间
  var getFormatTime = function (timestamp) {
    var now = getUnix()
    var today = getTodayUnix()
    var year = getYearUnix()
    var timer = (now - timestamp) / 1000
    var tip = ''
    if (timer <= 0) {
      tip = '刚刚'
    } else if (Math.floor(timer / 60) <= 0) {
      tip = '刚刚'
    } else if (timer < 3600) {
      tip = Math.floor(timer / 60) + '分钟前'
    } else if (timer >= 3600 && (timestamp - today >= 0)) {
      tip = Math.floor(timer / 3600) + '小时前'
    } else if (timer / 86400 <= 31) {
      tip = Math.ceil(timer / 86400) + '天前'
    } else {
      tip = getLastDate(timestamp)
    }
    return tip
  }
  return getFormatTime(time)
}

  module.exports = {
    formatTime: formatTime
  }
```
wxs有优点有缺点，用的时候要考虑好。注意以下三点。
1. wxs 与 javascript 是不同的语言，有自己的语法，并不和 javascript 一致。
2. wxs 的运行环境和其他 javascript 代码是隔离的，wxs 中不能调用其他 javascript 文件中定义的函数，也不能调用小程序提供的API。
3. 由于运行环境的差异，在 iOS 设备上小程序内的 wxs 会比 javascript 代码快 2 ~ 20 倍。在 android 设备上二者运行效率无差异。


## 3.详情页 ##

详情页涉及到三个表的内容。那就在云函数里完成表的查询组装输出，多方便啊。
这个代码就不贴了，要参考的话，底部会把GitHub贴出来，目录在上面的图片。
使用云函数的话有个技巧。**在开发工具里看是否成功，且把数据传输过来了**。
如图。

![](https://user-gold-cdn.xitu.io/2018/11/19/1672a534f32f2745?w=1502&h=1022&f=png&s=285769)
项目中的数据是从网站上爬下来的，数据库里的文章内容就是html的格式，so我们应该把tml =>wxml
 
  **wxParse-微信小程序富文本解析自定义组件,支持HTML及markdown解析本**
  
  githup 上有使用方法，这里我就不做重复的描述  [点着](https://github.com/icindy/wxParse)
  我这里使用这个工具完全是为项目实现的而去做，如果真正做一个小程序新闻类项目肯定是不太好的，先不说wxParse解析可能会出现乱码，再就是它所占的内存也不小。真正开发的时候就别用了，数据库里的数据也不会是html格式的。
  
  **在手机上显示时**(坑)
  
wxparse 代码的一个 bug，在一些特殊的手机里面，在 wxparse/html2json.js 中的第 112 和 119 行，都有一个 console.dir 这个函数的使用，把这个函数注释掉，内容就可以正常显示出来
 
 **评论组件**
 
![](https://user-gold-cdn.xitu.io/2018/11/19/1672c92407e99a38?w=410&h=168&f=png&s=18856)
我们这里提一下点赞功能实现，借用大佬的话
> 点赞的变化是由用户产生的一个交互，传统的观点就是用户点赞->后端更新数据->前端拉取数据->数据驱动视图的变化。
真实的体验就是，非常的慢，慢到点击后2秒才能看到点赞的效果，这种差劲的交互简直就是一场灾难。

那我们就先把样式给用户表现出来,数据交给后台慢慢异步处理


## 4.登陆页面 ##

页面布局就没啥好说的，

![](https://user-gold-cdn.xitu.io/2018/11/19/1672c9c4330449a1?w=406&h=721&f=png&s=49084)

![](https://user-gold-cdn.xitu.io/2018/11/19/1672c9d0d79e494a?w=404&h=710&f=png&s=58463)

- **登录**(知识点)
1. getUserInfo
2. button type="bindUserInfo"
    
3. auth    授权登录

4. 高阶函数 

5. 异步的处理

html部分


```
<view wx:if="{{auth === 0}}" > //判断登录情况
             <button open-type="getUserInfo" 
                bindgetuserinfo="getUserInfo">
                 登录
             </button>
</view>
            <view wx:else>
                <view class="top">
                    <image class="avatar" src="{{avatarUrl}}"/>
                    <view class="name">
                        <text class="nickname">{{nickname}}</text>
                        <button>申请认证</button>
                    </view>
            <icon type="zhixiang" color="#848484"></icon>  //封装的icon
                </view>
```
    
    
```
//获取应用实例
const app = getApp()
const globalData= app.globalData;

Page({
  data: {
    auth:-1,
    nickname:'',
    avatarUrl:''
  },
  onLoad: function () {
    this.getScope(this.getUserInfo,()=>{
      this.setData({
        auth:0
      })
    });
  },
  //高阶函数 success 参数也是一个函数
  getScope(success,fail,name='scope.userInfo'){
    wx.getSetting({
      success:(res) => {
        // console.log(res); 
        if(res.authSetting[name]){
          success();
        }else{
          fail();
        }
      }
    })
  },
  getUserInfo (){
    // console.log('userinfo')
    if(!globalData.nickname||!globalData.avatarUrl){
      // 1. wx.getUserInfo(nickname,avatar)函数 
      // 2. 放到全局 函数
      this._getUserInfo((res) =>{
        // console.log(res);
        this.setData({
          nickname:res.nickName,
          avatarUrl:res.avatarUrl,
          auth:-1
        });
        globalData.nickname=res.nickName;
        globalData.avatarUrl=res.avatarUrl;
      });
    }
  },
  _getUserInfo(cb = () =>{}){
    wx.getUserInfo({
      success:(res) =>{
        cb(res.userInfo);
      }
    })
  }
})
```

## 六.总结

---


* 页面无非是基本结构和一堆模块外加js交互组合起来的。快速完成一张简单的demo的页面只需要：绘制基本架构、增加功能模块、js交互三步就能完成。
* 绘制基本架构：第一步看页面的基本构造，分析布局,这时细节不重要，看总体架构，使用BEM命名规则增加合适的class命名格式，这样可以为内部的模块提供合理的class命名格式，避免class混乱而造成页面样式混乱，维护css样式麻烦 
* wxml上不要不舍得套盒子,盒子就和分类箱一样,给你整的明明白白,服服帖帖.
* 在云函数中，我们大多会实现一些在小程序中无法实现，这时我们不能使用传统的 Callback 方法来进行请求，因为传统的 callback 方法执行完成后，云函数早已将数据返回给客户端，我们需要使用 Promise 来处理。
* 界面只是一架躯壳，而数据是灵魂，核心思想MVVM 数据驱动页面

将平凡的事坚持下去，就会变的不平凡，路漫漫其修远兮，吾将上下而求索。

您的鼓励是我前行最大的动力，欢迎点赞，欢迎送小星星✨ ~


## 彩蛋
---
每个人看问题的角度不同，可能我没有把一些东西讲清楚，别急，我给你带来掘金上大佬的云开发项目总有适合您的：

* 手把手教你完成一个云开发项目，细节详细到爆炸，连设计稿都给你准备好了：

    [零门槛的全栈体验 小程序云开发完整项目分享
](https://juejin.im/post/5be3d9036fb9a04a09558740)
* 仿头条项目，功能实现了很多，喜欢专研的来这：
 [小程序云开发让你不加班](https://juejin.im/post/5be519eb6fb9a04a0c2df0af#comment)
* 仿快狗打车项目，界面很nice，项目完成度高，可以跟着他文章实现一下：
 
    [小程序云开发之踩到狗尾巴](https://juejin.im/post/5beccc5e6fb9a049c643689f)
* 功能、界面、体验极佳的小程序“旅行小账本” 
    [诗和远方 旅行小账本云开发实战](https://juejin.im/post/5bea81ddf265da612239e360?appinstall=0)





