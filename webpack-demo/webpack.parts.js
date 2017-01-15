const webpack = require('webpack');

exports.lintJavaScript = function(paths) {
    return {
        module: {
            rules: [{
                test: /\.js$/,
                include: paths,
                use: 'eslint-loader',
                enforce: 'pre'
            }]
        }
    }
}

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
