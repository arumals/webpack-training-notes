// load packages
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')

// set the paths
const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
}

const common = {

    // define the entry
    entry: {
        app: PATHS.app
    },

    // define the output
    output: {
        path: PATHS.build,
        filename: '[name].js'
    },

    // define the plugins
    plugins: [

        // define the html title
        new HtmlWebpackPlugin({
            title: 'Webpack demo',
        })

    ]

}

// export the configuration
module.exports = function(env) {

    return merge(common, {

        // disable performance hints during development
        performance: {
            hints: false
        },

        plugins: [
            new webpack.NamedModulesPlugin()
        ]

    })

}
