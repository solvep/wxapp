//canvas 画布 window 全局对象
require('./js/libs/weapp-adapter');
//小程序没有dom BOM  不维护了
//console.log(canvas);
//console.log(window);
//phaser
window.p2 = require('./js/libs/p2');
window.PIXI = require('./js/libs/pixi');
window.Phaser = require('./js/libs/phaser-split');

window.WIDTH = 750; //设计稿的大小 跟canvas 比例转化的问题
window.SCALE = WIDTH / canvas.width;
window.HEIGHT = canvas.height * SCALE; //等比例获得设计稿高度

//console.log(WIDTH, SCALE, HEIGHT);

wx.onShareAppMessage(() => {
    return {
        title: '井字棋大作战',
        imageUrl: 'images/share.png'
    }
})

wx.showShareMenu({
    withShareTicket: false
})

window.go = {
    game: null,             //游戏对象
    userInfo: null,         //玩家信息
    opponentInfo: null,      //对手信息
    common: require('js/common')
}

const config = {
    width: WIDTH,
    height: HEIGHT,
    renderer: Phaser.CANVAS, //游戏的渲染方式是canvas，除此之外3D 的 webgl
    canvas: canvas
}

const game = new Phaser.Game(config);  //游戏初始化执行
go.game = game;
game.state.add('start', require('./js/states/start'))
game.state.add('menu', require('./js/states/menu'))
game.state.start('start')
