const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
//const webpack = require('webpack');

module.exports = {

    entry: './src/app.js',

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.js',
        // 所以资源的基础路径, 而且一定是 / 结尾
        //publicPath: '/'
    },

    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //   compress: {
        //     warnings: false
        //   }
        // }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
        }),
        new CleanWebpackPlugin(['build'])
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ],
                exclude: [ path.resolve(__dirname, 'node_modules')]
            },
            //处理 css文件中出现的 url, 会自动帮你引入里面要引入的模块
            //'[path]-[name]-[local]-[hash:base64:6]'
            {
                test: /\.css$/,
                use: [
                    'style-loader' ,
                    {
                        loader: 'css-loader',
                        options: {
                            module: true,
                            localIdentName: '[name]-[local]_[hash:base64:6]'
                        }
                    }
                ],
                exclude: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'src')
                ]
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ],
                include: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'src')
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader' ,
                    {
                        loader: 'css-loader',
                        options: {
                            module: true,
                            localIdentName: '[name]-[local]_[hash:base64:6]'
                        }
                    },
                    'sass-loader'
                ],
                exclude: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'src/common')
                ]
            },
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ],
                include: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'src/common')
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader' ,
                    {
                        loader: 'css-loader',
                        options: {
                            module: true,
                            localIdentName: '[name]-[local]_[hash:base64:6]'
                        }
                    },
                    'less-loader'
                ],
                exclude: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'src/common')
                ]
            },
            {
                test: /\.less$/,
                use: [ 'style-loader', 'css-loader', 'less-loader' ],
                include: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'src/common')
                ]
            },

            // file-loader:
            //     1. 把你的资源移动到输出目录
            //     2. 返回最终引入资源的 url
            {
                test: /\.(jpg|png|gif|jpeg)$/,
                use: [ {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'assets/img/[name]_[hash:8].[ext]'
                    }
                } ]
            },
            {
                test: /\.(ttf|eot|woff|woff2|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/fonts/[name]_[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },

    devServer: {
        open: true,
        port: 9000,
        contentBase: './src',
        // 服务器打包资源后的输出路径
        publicPath: '/'
    }
};
