wx.cloud.init({
})
const db = wx.cloud.database();
Page({
    data:{
        ads:[],
        item:{
            user:{
                avatar:'',
                nickname:'王二',
                summary:'hava a good time'
            }
        }
    },
    onLoad:function(){
        db.collection("ads").get({
            success: res =>{
              console.log(res)
                this.setData({
                    ads:res.data
                })
                // 云函数 小程序的前端搞不定，openid 需要复杂计算
                // async await 三个数据库的综合查询
                // wx.cloud.database()打开的次数越多崩的可能性越大
                // 查询 select mongodb no-sql find()
                // where 条件 orderby 排序 limit 限制条数 skip 忽略
                wx.cloud.callFunction({
                    name:"getTravelInfo",
                    data:{
                        count:5,
                        startIndex:0
                    },
                    success:res =>{
                        console.log(res);
                    }
                })
            }
        })
        }
})
