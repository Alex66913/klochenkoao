const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackDevServer = require('webpack-dev-server');

/**
 * @type {webpack.Configuration & { devServer: WebpackDevServer.Configuration} }
 */
const config = {
    // cache: true,
    mode: process.env.NODE_ENV || 'development',
    context: path.resolve(process.cwd(), './src'),
    entry: {
        app: './index.js'
    },
    resolve: {
        extensions: ['.sass', '.scss', '.js', '.jsx', '.ttf'],
        modules: ['node_modules', path.resolve(process.cwd(), './')],
    },
    output: {
        path: path.resolve(process.cwd(), './build'),
    },
    module: {
        rules: [
            {
                oneOf: [
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
                    },
                    {
                        test: /\.css$/,
                        use: [
                            'style-loader',
                            'css-loader',
                        ]
                    },
                    {
                        test: /\.(eot|ttf|woff2?)$/,
                        use: ['url-loader']
                    }
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
    performance: {
        hints: false,
    },
    devServer: {
        hot: true,
        open: true,
        port: 8080,
    }
}

module.exports = config;