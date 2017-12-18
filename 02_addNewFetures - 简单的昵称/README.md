## ☛ 介绍

#### 该版本为聊天室的升级版本，实现了 [socket.io官网](https://socket.io/get-started/chat/) 的课后练习中要求的部分功能：
  

- **添加昵称**

	【实现原理】：将每一条发送的 `data` 对象 `{ nickName: '', message: '' }` 发送给服务器 → 服务器监听到数据后，广播给每个建立连接客户端 → 客户端将该对象插入 `messages` 数组中，实现更新。

- **添加“某某正在输入”**

	【实现原理】：服务端运用 `socket.broadcast.emit` 对除了自己的其他客户端进行广播。

  	客户端监听输入框的 `keypress` 事件，触发 `typing` 事件 → 服务端监听 `typing` 事件，获取到数据后，广播给除了当前发送消息的其它客户端 → 客户端监听 `typing` 事件，获取到当前正在输入的 `typer`，设置提示。

   > 【注意】：当发送完信息之后，需要清空“***正在输入”，客户端在监听到 `chat` 将提示置空。

![添加昵称+xxx正在输入](http://upload-images.jianshu.io/upload_images/1632709-7b22fc89edecb9c0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## ✍ 使用

	npm install
	npm start

## § 参考

- [socket.io官网](https://socket.io/get-started/chat/)
- [socketio/chat-example](https://github.com/socketio/chat-example)
- [React socket.io express 开发一个聊天室](https://juejin.im/entry/58a3f4dbb123db00545f8c68)
- [Express结合Webpack的全栈自动刷新](http://acgtofe.com/posts/2016/02/full-live-reload-for-express-with-webpack)