var webpack = require('webpack');
var config = require('./webpack.config');
var compiler = webpack(config);

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/'));

// use in develop mode
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

app.get('/', function(req, res){
    res.sendFile(__dirname + 'index.html');
});

// 连接的用户数需要由服务端来维护
var numUsers = 0;
var connUsers = {};

// 增加命名空间
var nsp = io.of('/mySpace');

// 限定房间
var SERVICE = 'Apple';

// io.on('connection', function(socket) {
nsp.on('connection', function(socket) {
    var logged = false;
    
    // 用户登录
    socket.on('login', function(username) {
        if (logged) return;  // 已经添加过了

        // 为当前的客户端存储 username
        socket.username = username;
        ++numUsers;
        logged = true;

        socket.join(SERVICE);

        if (username !== SERVICE) {
            if (socket.adapter.rooms[SERVICE].length <= 2) {
                socket.emit('chat', {
                    username: SERVICE,
                    message: '您好，请问有什么可以帮助您！'
                });
            } else {
                socket.emit('chat', {
                    username: SERVICE,
                    message: '当前客服正忙，请稍等！'
                });
                socket.leave(SERVICE);
            }
        }

        // console.log(socket.adapter.rooms)

        socket.emit('login', {
            numUsers: numUsers
        });
        
        // 广播给其它客户端有用户登录了
        socket.broadcast.emit('user joind', {
            username: socket.username,
            numUsers: numUsers
        });
    });

    // 监听客户端发送的信息
    socket.on('chat', function(data){
        var serviceRoom = socket.adapter.rooms[SERVICE];

        if (socket.id in serviceRoom.sockets) {
            nsp.to(SERVICE).emit('chat', {
                username: socket.username,
                message: data
            });
        } else {
            socket.emit('chat', {
                username: socket.username,
                message: data
            });
            socket.emit('chat', {
                username: SERVICE,
                message: '当前客服正忙，请稍等！'
            });
        }
    });

    // 监听客户端的输入事件
    socket.on('typing', function() {

        var serviceRoom = socket.adapter.rooms[SERVICE];

        if (socket.id in serviceRoom.sockets) {
            socket.broadcast.to(SERVICE).emit('typing', {
                username: socket.username
            });
        }

        /* socket.broadcast.emit('typing', {
            username: socket.username
        }); */
    });

    socket.on('stop typing', function() {
        socket.broadcast.to(SERVICE).emit('stop typing', {
            username: socket.username
        });
        /* socket.broadcast.emit('stop typing', {
            username: socket.username
        }); */
    });

    socket.on('disconnect', function() {
        if (logged) {
            --numUsers;

            socket.broadcast.emit('user left', {
                username: socket.username,
                numUsers: numUsers
            });
        }
    });
});

server.listen(3000, function() {
    console.log('listening on *: 3000');
});