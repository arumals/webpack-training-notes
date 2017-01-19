// load packages
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');


// set the paths
const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build'),
};

const baseConfig = {

    // define the entry
    entry: {
        app: PATHS.app,
    },

    // define the output
    output: {
        path: PATHS.build,
        filename: '[name].js',
    },

    // define the plugins
    plugins: [

        // define the html title
        new HtmlWebpackPlugin({
            title: 'Webpack demo',
        }),

    ],
};

const common = merge(baseConfig,
    // lint the code
    parts.lintCSS(PATHS.app),
    parts.lintJavaScript(PATHS.app)
);

// export the configuration
module.exports = function(env) {

    let serverConfig;

    switch (env) {

        case 'production':
            serverConfig = merge(
                common,
                parts.extractCSS(),
                parts.purifyCSS(PATHS.app)
            );
            break;

        default:
            serverConfig = merge(common, {

                    // disable performance hints during development
                    performance: {
                        hints: false,
                    },

                    // ?
                    plugins: [
                        new webpack.NamedModulesPlugin(),
                    ],

                },

                // css
                parts.loadCSS(PATHS.app),

                // HRM
                parts.devServer(),

                // disable hotOnly on HRM
                { devServer: { hotOnly: false } }

            );
            break;

    }

    return serverConfig;

};


