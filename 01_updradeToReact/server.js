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

io.on('connection', function(socket) {
    console.log('a user connected');

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    // 监听客户端发送的信息
    socket.on('message', function(msg){
        console.log('message: ', msg);
        io.emit('message', msg);
    });
});

server.listen(3000, function() {
    console.log('listening on *: 3000');
});