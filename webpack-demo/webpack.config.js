// load packages
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// set the paths
const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
}

// export the configuration
module.exports = {

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
