## ☛ 介绍

#### 该版本为聊天室的升级版本，实现了 [socket.io官网](https://socket.io/get-started/chat/) 的课后练习中要求的部分功能：
  
- **添加昵称**

	【实现原理】：将每一条发送的 `data` 对象 `{ nickName: '', message: '' }` 发送给服务器，然后服务器再广播给客户端，客户端将该对象插入 `messages` 数组中，实现更新。

- **添加“某某正在输入”**

	【实现原理】：监听输入框的 `onKeyPress` 事件，触发 `typing` 事件。



## ✍ 使用

	npm install
	npm start

## § 参考

- [socket.io官网](https://socket.io/get-started/chat/)
- [socketio/chat-example](https://github.com/socketio/chat-example)
- [React socket.io express 开发一个聊天室](https://juejin.im/entry/58a3f4dbb123db00545f8c68)
- [Express结合Webpack的全栈自动刷新](http://acgtofe.com/posts/2016/02/full-live-reload-for-express-with-webpack)