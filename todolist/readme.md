- 模板里要有if else for 指令 
模板里存在业务逻辑 wx:if  wx:else wx:for

界面状态 登录前， 登录后状态 

数据驱动界面状态
hasUserInfo 决定了界面有两种 wx:if wx:else 

- 微信的生态及机制
  小程序，获取用户信任和信息, 在微信里，
  小程序分享到讨论组

  用户信息， 隐私， 要获取用户的许可

  button 询问 特殊的 open-type="getUserInfo"
  bindgetuserinfo='getUserInfo'
  block 显示的过程
  太直接了

- setData()
  改变data里数据的值
  并且拥有让界面里相关的部分热更新的能力


- wx:key
  循环一定要加唯一性的key
  列表值发生改变，如果要接替换， 整个列表的wxml， 太浪费了
  key， 找到相应的那个， 进行更新。


- 设计数据
  lists = 是否能够满足我们界面表达的需求[已完成2项，未完成8项]
  lists 全部列表
  donelists = []
  undonelists = []
  v-for="{{lists}}"

  currentState = 'all'  界面上所有的状态改变都要用数据来表达
  v-if 为真就输出lists的列表输出  使用v-for

  界面状态
    多种状态
    1. tabbar .active UI状态 =》数据驱动，currentState='all'
    2. 任务列表 列表数据，UI状态  currentList