const webpack = require('webpack')

exports.devServer = function(options) {
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
        	new webpack.HotModuleReplacementPlugin({
        	})
        ]
    }
}
