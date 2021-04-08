const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackDevServer = require('webpack-dev-server');

/**
 * @type {webpack.Configuration & { devServer: WebpackDevServer.Configuration} }
 */
const config = {
    mode: process.env.NODE_ENV || 'production',
    context: path.resolve(process.cwd(), './src'),
    entry: {
        app: './index.js'
    },
    resolve: {
        extensions: ['.sass', '.scss', '.js', '.jsx'],
        modules: ['node_modules', path.resolve(process.cwd(), './')],
    },
    output: {
        path: path.resolve(process.cwd(), './build'),
    },
    module: {
        rules: [
            {
                test: /\.js(x)?$/,
                use: [
                    'babel-loader'
                ],
            },
            {
                test: /\.s(a|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(process.cwd(), './public/index.html'),
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        hot: true,
        open: true,
        port: 3000,
    }
}

module.exports = config;