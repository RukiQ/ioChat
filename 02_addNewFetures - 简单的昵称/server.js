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

const connections = [];

io.on('connection', function(socket) {
    console.log('a user connected');
    connections.push(socket.id);

    // 当客户端建立连接的时候触发
    io.emit('connected', {
        cId: socket.id
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    // 监听客户端发送的信息
    socket.on('chat', function(data){
        io.emit('chat', data);
    });

    // 监听客户端的输入事件
    socket.on('typing', function(data) {
        socket.broadcast.emit('typing', data);
    });
});

server.listen(3000, function() {
    console.log('listening on *: 3000');
});