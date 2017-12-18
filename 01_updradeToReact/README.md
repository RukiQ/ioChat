## ☛ 介绍

#### 该版本为聊天室初级版本，功能和界面与 [socket.io官网](https://socket.io/get-started/chat/) 的基础聊天室一模一样，只是在其基础上实现了 React + webpack 技术栈的升级。

> 注意：将官网基础版本中使用的 `<form>` 改成了 `<div>`，因为使用 `<form>` 时按回车会刷新浏览器，就相当于重新建立了一个 socket 连接，会把原来的内容清空。

- **最基础聊天功能**

	【实现原理】：客户端监听 `chat` 事件，点击提交时触发 `chat` 事件，将 message 发送给服务器，然后服务器再广播给每个客户端，客户端接收到 message 之后，将其放入 messages 数组中，根据 messages 数组渲染对话列表。


## ✍ 使用

	npm install
	nodemon start

## § 参考

- [socket.io官网](https://socket.io/get-started/chat/)
- [socketio/chat-example](https://github.com/socketio/chat-example)
- [React socket.io express 开发一个聊天室](https://juejin.im/entry/58a3f4dbb123db00545f8c68)
- [Express结合Webpack的全栈自动刷新](http://acgtofe.com/posts/2016/02/full-live-reload-for-express-with-webpack)
- [在 Express 开发中使用 nodemon](http://bubkoo.com/2014/12/02/use-nodemon-with-node-applications/)（使用 nodemon 自动重启服务器）