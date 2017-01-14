# WebPack

## Setting up the Project

Create a minimal package.json version file.

```sh
$ npm init -y
```

Install webpack as a dev dependency.

```sh
$ npm i webpack --save-dev
```

Now we can file webpack inside.

```sh
$ node_modules/.bin/webpack
```

We need to create a configuration file.

```sh
$ touch webpack.config.js
```

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATH = {
    app: path.join(__dirname,'app'),
    build: path.join(__dirname, 'build')
}

module.exports = {
    entry: {
        app: PATH.app
    },
    output: {
        path: PATH.build,
        filename: '[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack Demo'
        })
    ]
}
```

Useful path methods.

- path.basename('path')
- path.delimiter => ':'
- path.sep => '/'
- path.dirname('path')
- path.extname('path')
- path.join('a','b','c')
- path.normalize('/a/b/c/d/..') => '/a/b/c'
- path.relative('/a/b/c/d','/a/b/f/g') => ../../f/g

Add the webpack process to the scripts section inside webpack.config.js.

```js
# webpack.config.js
{
    scripts: {
        ...
        "build" : "webpack"
    }
}
```

    This can be run in any folder inside the project, because node adds the node_modules/.bin folder to the PATH temporary.

Plugins

- case-sensitive-paths-webpack-plugin
- npm-install-webpack-plugin
- system-bell-webpack-plugin
- friendly-errors-webpack-plugin
- nyan-progress-webpack-plugin
- webpack-dashboard

## Spliting the configuration

Possible ways tp manage configuration.

- Maintain configuration in multiple files and ponint to each through the --config parameter.
- Push configuration to a library which you then consume.
- Maintain configuration with a single file and branch there by relying on the --env parameter.

webpack-merge





