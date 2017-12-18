## ☛ 介绍

#### 该版本为聊天室的升级版本，实现了 [socket.io官网](https://socket.io/get-started/chat/) 的课后练习中要求的部分功能：
  

- **实现私人聊天**

	【实现原理】：运用 Room，通过 `socket.adapter.rooms` 获取当前 room 的信息，包括每个 room 中的 id。

		  // 加入房间
		  socket.join('some room'); 
		  // 离开房间
		  socket.leave('some room'); 
		
		  // 向房间里的所有客户端发送消息
		  io.to('some room').emit('some event'); 
		
		  // 向房间中的除了自己的客户端发送消息
		  socket.broadcast.to ('some room')
		      .emit('my message', msg);
		  

![Rooms 实现私人聊天](http://upload-images.jianshu.io/upload_images/1632709-8c924288c50b7f68.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## ✍ 使用

	npm install
	npm start

## § 参考

- [socket.io官网](https://socket.io/get-started/chat/)
- [socketio/chat-example](https://github.com/socketio/chat-example)
- [React socket.io express 开发一个聊天室](https://juejin.im/entry/58a3f4dbb123db00545f8c68)
- [Express结合Webpack的全栈自动刷新](http://acgtofe.com/posts/2016/02/full-live-reload-for-express-with-webpack)