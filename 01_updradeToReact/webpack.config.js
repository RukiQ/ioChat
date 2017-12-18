var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

var config = {
    entry: {
        app: ['./src/index', hotMiddlewareScript],
        vendor: [   // 第三方库，不容易变，一次性下载存于浏览器缓存中
            'react',
            'react-dom'
        ]
    },
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/static/',
        chunkFilename: '[name].js'
    },
    resolve: {
        // 用于引用时省略扩展名
        extensions: ['.js', '.jsx', '.json', '.scss']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/i,
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ],
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        /**
         * 下面的文件抽离后，都需要在 index.html 文件中重新引入
         */
        // 生成vendor chunk，抽取第三方模块单独打包成独立的chunk
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js',
            chunks: ['app', 'vendor']
        }),
        // 单独抽离css文件
        new ExtractTextPlugin('[name].css', {
            allChunks: false
        })
    ]
}

module.exports = config;