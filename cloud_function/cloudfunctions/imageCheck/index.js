// 云函数入口文件
const AppId = '1257917903'
const secretId = "AKID0fEmTzqbg7g7PqEFCOWUKCtP6jHfreAl"
const SecretKey="Jiy78y3HNixVxHe6YJ9wY4PZ99VqGdpu"
const cloud = require('wx-server-sdk')
const fs = require('fs')   //module.exports
const path = require('path')
const {ImageClient} = require('image-node-sdk')

cloud.init()
let ImageClient = new ImageClient({AppId,SecretId,SecretKey});
// 云函数入口函数
exports.main = async (event, context) => {
    return await ImageClient.imgPornDetect({
        forData:{
            // node 文件系统 fs 读写 path 提供路径对象
            image:fs.createReadStream(path.join(__dirname,'./test.png'))
        },
        headers:{
            'content-type':'mutipart/form-data'
        }
    })
}