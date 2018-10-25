- 小程序
    内嵌在微信超级app，是webViwe + 微信一些App插件的混合
    WebView App 内嵌页面技术 让app 开发使用上Web技术，比Android/IOS 更快
    缺点是性能慢

    在拍照，tabbar，navigationbar 等一些关键的地方又能调用原生微信里的原生组件，提升性能

    WXML  没有div   取代的是view
    WXSS  使用弹性布局
    js MVMM


- 架构
    小程序的架构是极其简单的
    app.js 是入口文件
    app.json 是项目文件 pages  找到所有的页面  所有的页面都要在这里注册
    1. 注册所有文件
    2. window 设置 App 名字，nacigationBar背景色 文字色
    3. tabbar 如果app需要底栏的话就设置一个tabbar
    pages 小程序有页面构成 简单
    主要代码都在这里
    1. wxml 写结构
    2. wxss 样式
    3. js 写逻辑
    4. json 文件 页面级别
- 组件
    小程序提供了很多内置功能组件
    swiper 声明式组件 html 标签 功能贫瘠，
    组件 集合了很多标签及功能
    swiper>swiper-item
    indicator-dots="{{true}}"
    {{js 区块}}  模板符号


- 数据驱动的界面
    界面， 数据传统做法是分别由前端，后端独立做的。
    现在是大前端的时代 让界面活起来，界面将直接绑定数据。
    {{}}   这两个花括号就将html变成界面模板。
    小程序为数据绑定提供了一个约定
    Page({
        data:{
            数据区域 -> {{}}     数据将直接配置到这两个花括号里面
        }
    })
- 指令
    wx:for 循环输出指令 将自动循环你给的数据  配合block使用 本身并不输出。