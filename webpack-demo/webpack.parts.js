const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

exports.devServer = function() {
    return {
        devServer: {
            historyApiFallback: true,
            hot: true,
            hotOnly: true,
            stats: 'errors-only',
            host: 'localhost',
            port: 8080
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin({})
        ]
    };
};

exports.lintJavaScript = function(paths) {
    return {
        module: {
            rules: [{
                test: /\.js$/,
                use: 'eslint-loader',
                enforce: 'pre'
            }]
        }
    }
}

exports.loadCSS = function(paths) {
    return {
        module: {
            rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }]
        }
    }
}

exports.extractCSS = function(paths) {
    return {
        module: {
            rules: [{
                test: /\.css$/,
                include: paths,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css-loader'
                })
            }]
        },
        plugins: [
            new ExtractTextPlugin('[name].css')
        ]
    }
}

exports.purifyCSS = function(paths) {
    paths = Array.isArray(paths) ? paths : [paths];
    return {
        plugins: [
            new PurifyCSSPlugin({
                basePath: '/',
                paths: paths.map((path) => {
                    return `${path}/*`;
                }),
                resolveExtensions: ['.html'],
                purifyOptions: {
                    minify: true,
                    info: true,
                }

            })
        ]
    };
}

exports.lintCSS = function(paths) {
    return {
        plugins: [
            new StyleLintPlugin({
                configFile: '.stylelintrc',
                // context: paths.app,
                files: './app/*.css',
                failOnError: false,
                quiet: false,
                // syntax: 'scss'
            }),
        ],
    };
};

exports.imageLoader = function(paths){
    return {
        module:{
            rules:[{
                test: /\.(jpg|jpeg|png)$/,
                include: paths,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 25000,
                    }
                }]
            }]
        }
    }
}