const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { inherits } = require('util')

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',

    devServer: {
        port: 8080,
        open: true,
        hot: true,

    },

    entry: {
        main: ['@babel/polyfill','./index.js'],
        // map: ['@babel/polyfill', "https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"]
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        })
    ],

    resolve: {
        alias: {
            "./images/layers.png$": path.resolve(
                __dirname,
                "./node_modules/leaflet/dist/images/layers.png"
            ),
            "./images/layers-2x.png$": path.resolve(
                __dirname,
                "./node_modules/leaflet/dist/images/layers-2x.png"
            ),
            "./images/marker-icon.png$": path.resolve(
                __dirname,
                "./node_modules/leaflet/dist/images/marker-icon.png"
            ),
            "./images/marker-icon-2x.png$": path.resolve(
                __dirname,
                "./node_modules/leaflet/dist/images/marker-icon-2x.png"
            ),
            "./images/marker-shadow.png$": path.resolve(
                __dirname,
                "./node_modules/leaflet/dist/images/marker-shadow.png"
            )
        }
    },

    module: {
        rules: [
            {
                test: /\.(css|s[ac]ss)$/,
                use: [MiniCssExtractPlugin.loader,'css-loader', 'sass-loader']
            },

            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader'],
                type: 'asset/img',
            },

            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },

            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },
        ]
    }
}