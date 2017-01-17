# WebPack.

## Chapter 1 : Developing with Webpack.

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

Possible ways to manage configuration.

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

### Configuring Hot Module Replacement (HRM).

Inside webpack.parts.js we can store the settings for HMR.

```js
const webpack = require('webpack')

exports.devServer = function(options) {
    return {
        devServer: {
            historyApiFallback: true,
            hot: true,
            hotOnly: true,
            inline: true,
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
```

And we can inject the configuration inside webpack.config.js.

```js
const parts = require('./webpack.parts')
...
module.exports = function(env) {
    return merge(common, {
            performance: {
                hints: false
            },
            plugins: [
                new webpack.NamedModulesPlugin()
            ]
        },
        parts.devServer()
    )
}
```

At this point it wont refresh our components changes because we defined the { hotOnly: true } value. In case that we need to change this behaviour we need to overrite this to false.

### Debug details.

We can see more details about the hot reload status by opening.

```
http://localhost:8080/webpack-dev-server/
```

### ESLint.

```sh
$ npm i eslint --save-dev
```

Now we can set the .eslint file.

```js
module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-unused-vars": [
            "warn"
        ],
        "no-console": 0
    }
}
```

And the .eslintignore.

```js
node_modules/
build/
```

Update your scripts and add a new one called "test:lint".

```js
{
    ...
    "scripts": {
        "test:lint": "eslint . --cache",
        ...
    },
    ...
}
```

Run your lint test using.

```sh
$ npm run test:lint --silent
```

You can fix your errors using.

```sh
$ node_modules/.bin/esling . --fix
```

### Connecting ESLint with Webpack.

```sh
$ npm i eslint-loader --save-dev
```

Eslint will use the global installed ESLint unless you have one included with the project itself.

We can define our rules using the .eslintrc.js file.

```js
module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-unused-vars": [
            "warn"
        ],
        "no-console": 0
    }
}
```

We can define also the folders to be ignored using .eslintignore.

```js
node_modules/
build/
```

To keep our configuration in the webpack.parts.js we create a new function and we export it.

```js
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
```

Finally inside the webpack.config.js we can merge to the common object with our lint configuration.

```js
const common = merge({
        entry: {
            app: PATHS.app
        },
        output: {
            path: PATHS.build,
            filename: '[name].js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Webpack demo',
            })
        ]
    },
    parts.lintJavaScript(PATHS.app)
);
```

## Chapter 2 : Handling Styles with Webpack.

### Loading Styles.

To load CSS, well need css-loader and style-loader.
If an @import points to an external resource, css-loader will skipt it.
After css-loader has done its part, style-loader picks up the output and inject the CSS into the resulting bundle.

```sh
$ npm i css-loader style-loader --save-dev
```

Create a configuration for the css-loader as a function.

```js
modules.export = function(paths){
    return {
        module: {
            rules:[{
                test: /\.css$/,
                include: paths,
                use: ['style-loader','css-loader']
            }]
        }
    }
}
```

And we can merge that configuration with our webpack.config.js.

```js
module.exports = function() {
    const serverConfig = merge(common, {
        ...
        },
        ...
        parts.loadCSS(PATHS.app),
        parts.devServer(),
        { devServer: { hotOnly: false } }
    );
    return serverConfig;
};
```

El loader que utilizamos...

```js
['style-loader', 'css-loader']
```

Puede ser leido asi...

```js
styleLoader(cssLoader(input))
```

Now we need to create an app/main.css file.

```css
.redButton {
    background: red;
}
```

And we can import it from index.js.

```js
import './main.css';
...
document.body.appendChild(component());
```

At this point we can refresh the browser and see the results.

#### Understanding CSS Scroping and CSS Modules.

CSS Modules introduce local scope per import so you dont have to worry about namespace collisions.

You can enable it through `css-loader?modules`.

Now we have to import the styles to the component and apply the style to the element.

```js
import styles from './main.css';

export default function (){
    const element = document.createElement( 'h1' );
    element.className = styles.redButton;
    ....
    return element;
}
```

After this change your class definitions will remain local to the files. In case you want global class definitions youll need to wrap them within `:global(.redButton){...}`.

#### LESS.

We can process less using the less-loader.

```js
{
    test: /\.less$/,
    use: ['style-loader','css-loader','less-loader']
}
```

#### SASS.

It is possible to use the sass-loader for SASS processer.

```js
{
    test: /\.scss$/,
    use: ['style-loader','css-loader','sass-loader']
}
```

And if more performance is needed we can also use fast-sass-loader.

#### Stylus.

We can process stylus using stylus-loader and yeticss.

```js
{
    test: /\.styl$/,
    use: ['style-loader', 'css-loader', 'stylus-loader']
}

...

plugins: [
    new webpack.LoaderOptionsPlugin({
        options: {
            stylus: {
                use: [require('yeticss')]
            }
        }
    })
]
```

#### PostCSS.

We can use post css using postcss-loader.

```js
rules: [
    {
        test: /\.css$/,
        use: ['style-loader','css-loader','postcss-loader']
    }
]
```

And we have to add also a postcss.config.js file.

```js
module.exports = {
  plugins: {
    autoprefixer: {},
    precss: {}
  }
};
```

#### Understanding Lookups.

If you import less/sass files from another, use the exact same pattern.

```js
@import "./variables.less";
```

You can add less/sass files directly from your node_modules directory.

```js
@import "~bootstrap/less/bootstrap";
```

#### Enabling sourcemaps.

If you want to enable source maps, you ust enable `sourceMap` option for css-loader and set `output.publicPath` to an absolute url.

#### Bootstrap.

It can be installed using `bootstrap-loader` which let you customize it.

### Separating CSS.

Webpack provides a means to generate a separate CSS bundles using `ExtractTextPlugin`.

```sh
$ npm i extract-text-webpack-plugin@2.0.0-beta.4 --save-dev
```

 Now we can create the configuration for the css processor inside the webpack.parts.js.

```js
....
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
```

And we create a different configuration for the production environment inside webpack.config.js.

```js
module.exports = function(env) {
    if (env == 'production') {
        return merge(common, parts.extractCSS());
    }
    ....
    return serverConfig;
};
```

#### Managing styles outside JS.

We can package our styles using [globbinb](https://www.npmjs.com/package/glob).

```js
...
const glob = require('glob');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
  style: glob.sync('./app/**/*.css')
};

const common = merge(
  {
    entry: {
      app: PATHS.app,
      style: ['purecss'].concat(PATHS.style)
    },
    ...
  },
  ...
);
```