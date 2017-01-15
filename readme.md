# WebPack.

## Setting up the Project

Create a minimal package.json version file.

```sh
$ npm init -y
```

Install webpack as a dev dependency.

```sh
$ npm i webpack@beta --save-dev
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

Plugins.

- case-sensitive-paths-webpack-plugin
- npm-install-webpack-plugin
- system-bell-webpack-plugin
- friendly-errors-webpack-plugin
- nyan-progress-webpack-plugin
- webpack-dashboard

## Spliting the configuration.

Possible ways tp manage configuration.

- Maintain configuration in multiple files and ponint to each through the --config parameter.
- Push configuration to a library which you then consume.
- Maintain configuration with a single file and branch there by relying on the --env parameter.

webpack-merge

```sh
$ npm i webpack-merge --save-dev
```

Update the configuration to use the merge package.

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
}

const common = {

    entry: {
        app: PATHS.app
    },

    output: {
        path: PATHS.build,
        filename: '[name].js'
    },

    plugins: [

        // define the html title
        new HtmlWebpackPlugin({
            title: 'Webpack demo',
        })

    ]

}

module.exports = function(env) {
    return merge(common)
}
```

Now we can pass the env value inside our build task

```js
{
    ...
    "scripts": {
        ...
        "build": "webpack --env production"
    },
    ...
}
```

## Automatic WDS Refresh.

Install webpack server.

```sh
$ npm i webpack-dev-server@2.2.0-rc.0 --save-dev
```

Now we can add webpack-dev-server to our start process.

```js
{
    ...
    "scripts": {
        ...
        "start": "webpack-dev-server --env development",
        ...
    },
    ...
}

```

If for some reason the port 8080 is already used, podemos verificarlo usando.

```sh
$ netstat -na | grep 8080
```

Retrieve the machine ip to access it from the network.

```sh
$ ifconfig | grep inet
```

If we want to change the port used to initialize the server, we can use.

For Max or Linux.

```sh
$ export PORT=3000
```

For Windows.

```sh
$ set PORT=3000
```

### Alternative ways to use webpack-dev-server.

- Set up an Express server for our own and use WDS as a middleware.
- We can use [dotent](https://www.npmjs.com/package/dotenv) to define variables through a .env file.

### Making WDS faster to develop configuration.

We can use nodemon to track configuration changes and restart WDS automatically.

```sh
$ npm i nodemon --save-dev
```

Now we can update the start process.

```js
{
    ...
    "scripts": {
        ...
        "build": "webpack --env production"
    },
    ...
}
```




