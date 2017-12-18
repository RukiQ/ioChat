## ☛ 介绍

#### 该版本为聊天室的升级版本，实现了 [socket.io官网](https://socket.io/get-started/chat/) 的课后练习中要求的部分功能：

- **监听用户进入(connected)或离开(disconnected)**

	【实现原理】：登陆的时候，将 `username` 发给服务器 → 服务器将 `username` 赋值给 `socket.username`，然后广播的时候将当前的 `username` 广播给其它客户端。

- **显示谁在线**

	【实现原理】：操作 numUsers 变量—> 监听 `connection` 事件：++numUsers；监听 `disconnection` 事件：--numUsers 。

![监听用户进入或离开/显示在线人数](http://upload-images.jianshu.io/upload_images/1632709-820f5ac78dae01e9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## ✍ 使用

	npm install
	npm starts

## § 参考

- [socket.io官网](https://socket.io/get-started/chat/)
- [socketio/chat-example](https://github.com/socketio/chat-example)
- [React socket.io express 开发一个聊天室](https://juejin.im/entry/58a3f4dbb123db00545f8c68)
- [Express结合Webpack的全栈自动刷新](http://acgtofe.com/posts/2016/02/full-live-reload-for-express-with-webpack)