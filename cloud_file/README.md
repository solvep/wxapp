- 文件上传
    买服务器，ip(cdn 绑定域名)，硬盘空间(文件数据的存储)，cpu计算，数据存储功能(mongodb)，
    node(npm nodev8.0 koa框架) 运行环境 及操作系统(linux centos)

    有了云服务器 全部 sdk 化 数据存储wx.cloud.database
    文件存储 wx.cloud.uploadFile
        文件流 出口(path) 入口(path)   深深的硬盘里面
        wx.cloud.uploadFile({
            cloudPath:,打开文件可写流
            filePath:, 打开文件可读流
        })
    云函数  wx.cloud.callFunction
    wx.cloud.websdk


