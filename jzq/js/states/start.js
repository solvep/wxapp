function addStartBtn(cb){
    // 画按钮
    // cb();
    const config = {
        type:'Image',
        image:'images/btn_start.png',
        style:{
            left:248/SCALE,
            top:870/SCALE,
            width:254/SCALE,
            height:91/SCALE
        }
    }
    const startBtn = wx.createUserInfoButton(config)
    startBtn.onTap((res) =>{
        if(res.userInfo){
            cb(res.userInfo)
        }
    })
    return startBtn
}
class Start extends Phaser.State{
    preload(){   //预加载
        this.scale.pageAlignHorizontally = true
    this.scale.pageALignVertically = true
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL

        this.load.image('bg_menu','images/bg_menu.png');   //id和地址
        this.load.image('bg_playing','images/bg_playing.png');
        this.load.image('ba_rank','images/bg_rank.png');
        this.load.image('bg_waiting','images/bg_waiting.png');
        this.load.image('btn','images/btn_menu.png')
    }
    create(){   //创建时
        this.game.add.image(0,0,'bg_menu')  
        // 开始游戏， 即要开始游戏 start-> 下一个state，
        // 获取一下用户信息 即玩家的信息
        const startBtn = addStartBtn((userInfo) =>{
            go.userInfo=userInfo
            startBtn.destroy();
            if(go.userInfo.avatarUrl !== ''){
                this.load.image(go.userInfo.avatarUrl,go.userInfo.avatarUrl);
                this.load.start();
            }
            this.game.state.start('menu')
        })
    }

}

module.exports = Start