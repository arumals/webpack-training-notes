// load packages
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');

// set the paths
const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};

const common = merge({

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

    },

    // lint the code
    parts.lintJavaScript(PATHS.app)

);

// export the configuration
module.exports = function() {

    const serverConfig = merge(common, {

            // disable performance hints during development
            performance: {
                hints: false
            },

            // ?
            plugins: [
                new webpack.NamedModulesPlugin()
            ]
        },

        // HRM
        parts.devServer(),

        // disable hotOnly on HRM
        { devServer: { hotOnly: false } }

    );

    return serverConfig;

};
