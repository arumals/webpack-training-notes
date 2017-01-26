const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

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

exports.lintJavaScript = function() {
    return {
        module: {
            rules: [{
                test: /\.js$/,
                use: 'eslint-loader',
                enforce: 'pre'
            }]
        }
    };
};

exports.loadCSS = function() {
    return {
        module: {
            rules: [{
                test: /\.css$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                        minimize: true,
                    }
                }]
            }]
        }
    };
};

exports.extractCSS = function(paths) {
    return {
        module: {
            rules: [{
                test: /\.css$/,
                include: paths,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css-loader',
                })
            }]
        },
        plugins: [
            new ExtractTextPlugin('[name].[contenthash].css')
        ]
    };
};

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
                    info: true,
                    minify: true,
                }
            })
        ]
    };
};

exports.lintCSS = function() {
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
    };
};

exports.loadFonts = function(options){
    const name = (options && options.name) || 'fonts/[hash].[ext]';

    return {
        module: {
            rules: [
                {
                    // capture eot, ttf, svg, woff and woff2
                    test: /\.(woff2?|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'file-loader',
                    options: {
                        name: name,
                    },
                },
            ],
        },
    };
};

exports.generateSourcemaps = function(type){
    return {
        devtool: type,
    };
};

exports.extractBundles = function(bundles, options){
    const entry = {};
    const names = [];

    bundles.forEach(({ name, entries }) => {
        if(entries) entry[name] = entries;
        names.push(name);
    });

    return {
        entry,
        plugins: [
            new webpack.optimize.CommonsChunkPlugin(
                Object.assign({}, options, { names })
            )
        ]
    };
};

exports.loadJavaScript = function(paths){
    return {
        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: paths,
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    },
                },
            ],
        },
    };
};

exports.clean = function(path){
    return {
        plugins: [
            new CleanWebpackPlugin([path]),
        ],
    };
};

exports.minifyJavaScript = function({ useSourceMap }){
    return {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: useSourceMap,
                compress: {
                    warnings: false,
                }
            })
        ]
    };
};

exports.setFreeVariable = function(key, value){
    const env = {};
    env[key] = JSON.stringify(value);
    return {
        plugins: [
            new webpack.DefinePlugin(env),
        ]
    };
};