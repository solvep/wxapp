const pratice = () =>{}
const battle = ()=>{}
const rank = ()=>{}
function addMenu (){
    [
        [248,750,"单机练习",pratice],
        [248,900,"好友约战",battle],
        [248,1050,"好友排名",rank]
    ].map(btnConfig =>{    //增加代码的可读性
        go.common.addBtn({
            x:btnConfig[0],
            y:btnConfig[1],
            text:btnConfig[2],
            callback:btnConfig[3]
        })
    })
}
class Menu extends Phaser.State{
    create(){
        this.add.image(0,0,'bg_menu')
        addMenu()
    }
}
module.exports = Menu