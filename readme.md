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

### Eliminating Unused CSS.

#### Enabling PurifyCSS.

Webpack can use [purifycss-webpack-plugin](https://www.npmjs.com/package/purifycss-webpack-plugin).

```sh
$ npm i purifycss-webpack-plugin --save-dev
```

Prepare the configuration inside webpack.parts.js.

```js
...
const PurifyCSSPlugin = require('purifycss-webpack-plugin');

exports.purifyCSS = function(paths){
    paths = Array.isArray(paths) ? paths : [paths];
    return {
        new PurifyCSSPlugin({
            basePath: '/',
            paths: paths.map((path) => {
                console.log('path : ',path);
                return `${path}/*`;
            }),
            resolveExtensions: ['.html'],
            purifyOptions: {
                minify: true,
                info: true,
            }

        })
    };
}
...
```

Prepare a block inside the webpack.config.js so we just compile css for production environment.

```js
module.exports = function(env) {

    if (env == 'production') {
        return merge(
            common,
            parts.extractCSS(),
            parts.purifyCSS(PATHS.app)
        );
    }

    ...
}
```

### Linting CSS.

To get started, install the required dependencies:

```sh
$ npm install --save-dev stylelint-webpack-plugin
```

Update the `webpack.parts.js` to create the configuration block.

```js
exports.lintCSS = function(paths) {
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
```

Merge it in webpack.config.js.

```js
const common = merge({
    ...
    },

    parts.lintCSS(PATHS.app),
    parts.lintJavaScript(PATHS.app)

);
```

Create the .stylelintrc config file with the rules.

```js
{
  "rules": {
    "block-no-empty": null,
    "color-no-invalid-hex": true,
    "comment-empty-line-before": [ "always", {
      "ignore": ["stylelint-commands", "between-comments"]
    } ],
    "declaration-colon-space-after": "always",
    "indentation": ["tab", {
      "except": ["value"]
    }],
    "max-empty-lines": 2,
    "rule-nested-empty-line-before": [ "always", {
      "except": ["first-nested"],
      "ignore": ["after-comment"]
    } ],
    "unit-whitelist": ["em", "rem", "%", "s"]
  }
}
```

Now we are going to get lint warnings.

## Understanding Loaders.

### Anatomy of a loader.

Webpack supports a large variety of loaders and a couple of JS formats. The idea is the same, you set up a loader and connect those with your directory structure.

```js
module.exports = {
    module:{
        rules:[{
            test: /\.js$/,
            include: path.join(__dirname,'app'),
            exclude(path){
                return path.match(/node_modules/)
            },
            use: 'babel-loader'
        }]
    }
}
```

### Loader evaluation order.

Loaders are always evaluated from right to left and from bottom to top.

This example.

```js
{
    test: /\.css$/,
    use: ['style-loader','css-loader']
}
```

Is equivalent to.

```js
{
    test: /\.css$/
    use: ['style-loader']
},
{
    test: /\.css$/,
    use: ['css-loader']
}
```

### Passing parameters to a loader.

The query format.

```js
{
    test: /\.css$/,
    use: 'babel-loader?cacheDirectory,presets[]=react,presets[]=es2015',
}
```

It is preferable to use a combination of `loader` and `options` fields.

```js
{
    // conditions
    test: /\.js$/,
    include: PATHS.app,

    // actions
    use: {
        loader: 'babel-loader',
        options: {
            cacheDirectory: true,
            presets: ['react','es2015']
        }
    }
}
```

If we want to use more than one loader.

```js
{
    // conditions
    test: /\.js$/,
    include: PATHS.app,

    // actions
    use: [
        {
            loader: 'babel-loader',
            options: {
                cacheDirectory: true,
                presets: ['react','es2015'],
            },
        },
        // aditional loaders
    ],
},
```

### Inline definitions.

Process `foo` through `url-loader` and other possible matches.

```js
import 'url-loader!./foo.png';
```

Override possible higher level match completely.

```js
import '!!url-loader!./bar.png'
```

So we can simplify this way.

```js
{
    entry: {
        app: 'babel-loader!./app',
    },
},
```

### url-loader and file-loader

Install the packages

```sh
$ npm i --save-dev file-loader url-loader
```

The `url-loader` package comes with the `limit` option that can be used to defer image generation to file-loader after certain limit is reached.

Wepack will resolve any `url()` statements your styling might have.

```js
{
    test: /\.(jpg|png)$/,
    loader: 'url-loader',
    options: {
        limit: 25000,
    },
},
```

If you don't want to inline all together you can use 'file-loader'. The following setup customizes the resulting filename.

```js
{
    test: /\.(jpg|png)$/,
    loader: 'file-loader',
    options: {
        name: '[path][name].[hash].[ext]'
    }
}
```

If you want to output your images below an specific directory, set it up like this `name:./directory_name/[hash].ext`.

### svgs

Webpack has few ways to load svgs, the simplest way is through file-loader as follows:

```js
{
    test: /\.svg$/,
    use: 'file-laoder',
}
```

You can refer to your SVG's this way.

```css
.icon {
    background: url('../assets/icon.svg');
}
```

### Compressing images

In case you want to compress your images, use `image-webpack-loader` or `svo-loader` (for svg).

### Utilizing srcset

The `responsive-image-loader` packages allow to generate `srcset` compatible collections of images.

### Referencing to images.

Webpack can pick up images from stylesheets through `@import` and `url()` assuming `css-loader` has been configured. You can also refer images within the code.

```js
const src = require('./avatar.png');

const Profile = () => {
    <img src={src} />
}
```

If you use react, then you use `babel-plugin-transform-react-jsx-img-import` to generate the `require` automatically.

```js
let profile = <div>
    <img src="!avatar.png" className="profile" />
</div>
```

It is also possible to set up dynamic imports.

```js
const src = require(`./images/${id}`);
```

### Image properties

If you need to retrieve the image properties such as its dimensions, you can do that by using `image-size-loader`.

### Sprites

In order to use sprites you can use `webpack-spritesmith`.

### Loading Fonts.

There are typically four font formats to worry about, each for certain browser.

#### Choosing one format.

If you exclude Opera Mini, all browsers support `.woff` format. If we go with this format, we can have a file-loader and url setup.

```js
{
    test: /\.woff$/,
    loader: 'url-loader',
    options: {
        limit: 5000,
    },
},
```

A more elaborated way to achieve a similar result.

```js
{
    // Match woff2 in addition to patterns like .woff?v=1.1.1.
    test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url-loader',
    options: {
        limit: 50000,
        mimetype: 'application/font-woff',
        name: './fonts/[hash].[ext]',
    },
},
```

#### Supporting multiple formats.

If we want to make sure our site looks good on a maximum amount of browsers, we might as well use just `file-loader` and forget about inlining.

```js
{
    test: /\.woff2?$/,
    loader: 'url-loader',
    options: {
        name: 'fonts/[hash].[ext]',
        limit: 50000,
        mimetype: 'application/font-woff',
    },
},
{
    test: /\.(ttf,svg,eot)$/,
    loader: 'file-loader',
    options: {
        name: 'fonts/[hash].[ext]',
    },
},
```

Assuming we are goint to inline the WOFF format, we should have it like this.

```css
@font-face {
    font-family: 'myfontfamily';
    src: url('myfontfile.woff') format('woff2'),
        url('myfontfile.ttf') format('truetype');
}
```

This way the browsers will try to consume first the inlined font before loading remote alternatives.

#### Manipulating `file-loader` output path and `publicPath`.

```js
{
     test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
     loader: 'url-loader',
     options: {
        limit: 5000,
        mimetype: 'application/font-woff',
        name: './fonts/[hash].[ext]',
        publicPath: '../',
     },
},
```

#### Using font awesome

The ideas above can be wrapped into a configuration part that allows you to work with `Font Awesome`.

Install font awesome.

```sh
$ npm i --save-dev font-awesome
```

Define the `loadFonts` function in `webpacks.parts.js`.

```js
exports.loadFonts = function(options){
    const name = (options && options.name) || 'fonts/[hash].[ext]';
    return {
        module: {
            rules: [
                {
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
```

Implement it in `webpack.config.js`.

```js
const common = merge(baseConfig,
    parts.imageLoader(PATHS.app),
    parts.loadFonts(PATHS.app),
    ...
);
```

Then we can import in `app/index.js`.

```js
...
import component from './component';
import '../node_modules/font-awesome/css/font-awesome.css';
```

And then update the component to reflect the styles.

```js
export default function (){
    const element = document.createElement( 'h1' );
    element.className = 'fa fa-spock-o fa-lg';
    element.innerHTML= 'Hello World';
    return element;
}
```

## Building with Webpack.

### Enabling Sourcemaps.

To improve the debuggability of the application, we can set up sourcemaps for both code and styling. These allow to see exactly where the error was raised.

Webpack can generate inline and separate sourcemaps files.

Wepack provides two ways to generate sourcemaps, the shorcut field know as `devtool` and a plugin that gives more options to tweak.

```js
exports.generateSourcemaps = function(type){
    return {
        devtool: type,
    };
};
```

In order to map the styles we need to set that configuration for the css-loader.

```js
exports.loadCSS = function(paths) {
    return {
        module: {
            rules: [{
                test: /\.css$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                }]
            }]
        }
    }
}
```

Webpack supports a wide variety of sourcemaps. For now we can enable `eval-source-map` for development and `source-map` for production.

Then we can merge the values in our webpack.config.js for development and production.

```js
case 'production':

    serverConfig = merge(
        common,
        parts.generateSourcemaps('source-map'),
        ...
    );

    ...

default:

serverConfig = merge(

    ...

    parts.loadCSS(PATHS.app),
    parts.generateSourcemaps('eval-source-map'),
    ...
);
```

#### Sourcemap types supported by webpack.

The lower quality, the higher build and rebuild speeds are possible.

- eval (generated code)
- cheap-eval-source-map (transformed code)
- cheap-module-eval-source-map (original code)
- eval-source-map (original source)

Production usage friendly sourcemaps.

- cheap-source-map (transformed code, lines only)
- cheap-module-source-map (original source, lines only)
- source-map (original source)
- hidden-source-map (original withouth reference)

#### SourceMapDevToolPlugin

For more control over the sourcemap generation, it is possible to use the `SourceMapDevToolPlugin`.

#### Dependency sourcemaps.

You can use `source-map-loader` to make webpack aware of the sourcemap dependencies.

### Splitting Bundles.

#### The idea of bundle splitting.

Using bundle splitting, we can push vendor dependencies to a bundle of their own and benefit from client level caching. There are more requests to perform, but the benefit of caching makes up for this cost.

Lets for example add react to our project.

```sh
$ npm i --save-dev react
```

Now we can import it inside `app/index.js`.

```js
import 'purecss/build/pure.css';
import 'purecss/build/pure.css';
import './main.css';
...
```

If we build the project we are going to see that the generated `app.js` file is much bigger compared to the past.

#### Setting up a vendor bundle.

We can call react as an external vendor, this will be compiled insde the vendor.js file.

```js
 module.exports = function(env) {
    ....
    switch (env) {
        case 'production':
            serverConfig = merge(
                common,
                { entry: { vendor: ['react'] } },
                ...
            );
            break;
    }
    return serverConfig;
};
```

#### CommonsChunkPlugin

`CommonChunkPlugin` is a powerful and complex plugin.

Create a new function insde the

```js
module.exports = function(env) {
    ...
    serverConfig = merge(
        common,
        parts.extractBundles([
            {
                name: 'vendor',
                entries: ['react'],
            }
        ]),
        ...
    )
}
```

If you run `npm run build` you should see that dependencies are loaded inside the vendor build.

#### Loading dependencies to a vendor bundle automatically.

If you application grows and you have more entry points, the `minChunks` can be combined with more granular control by specifying chunks.

```js
{
    ...
    plugins: [
       new webpack.optimize.CommonsChunkPlugin({
            name: 'login',
            chunks: ['login'],
            minChunks: isVendor,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            chunks: ['app'],
            minChunks: isVendor,
        }),
        // Extract chunks common to both app and login
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            chunks: ['login', 'app'],
            minChunks: (module, count) => {
                return count >= 2 && isVendor(module);
            }
        }),
    ],
    ...
};
```

#### Chunk types in webpack.

Internally webpack treats entry chunks in three types.

- Entry chunks (Contain webpack runtime and modules it then loads).
- Normal chunks (It can be loaded dynamically while the app is running).
- Initial chunks (Generated by CommonsChunkPlugin).

### Code Splitting.

It is possible to load small portions of data using lazy load.

#### Code splitting formats.

Code splitting can be done in two primary ways in webpack: through a `dyamic import` or `require.ensure`.

##### Dynamic import.

Dynamic import looks this way.

```js
import('./module')
    .then((module) => {
        ...
    })
    .catch((error) => {
        ...
    })
```

We can do this process in parallel using `Promises`.

```js
Promise.all([
        import('lunr'),
        import('../search_index.json'),
    ])
    .then(([lunr, search]) => {
        return {
            index: lunr.Index.load(search.index),
            lines: search.lines,
        }
    })
```

This will create separate chunks to request, if you wanted only once you would have to define an intermediate module.

##### require.ensure

This is an alternative way.

```js
require.ensure(
    // modules to load but not execute yet
    ['./load-earlier'],
    () => {
        const loadEarlier = require('./load-earlier');

        // load on demand
        const module1 = require('./module1');
        const module2 = require('./module2');
    }
)
```

#### require.include

The example can be rewritten using a webpack specific funcion.

```js
require.ensure(
    [],
    () => {
        require.include('./load-earlier');
        const module1 = require('./module1');
        const module2 = require('./module2');
    }
)
```

You can customize the chunk outputs using... `chunkFilename: path/[name].js`.

#### Setting up code splitting.

Lets implement the code splitting using dynamic import.

##### Tweaking ESLint

Install babel-eslint.

```js
npm i babel-eslint -D
```

##### .eslintrc.js

First we need to customize the `.eslintrc.js` so we can process using the eslint parser.

```js
module.exports = {
    ...
    "parser": "babel-eslint",
    "parserOptions": {
        ...
        "allowImportExportEverywhere": true,
    },
    ...
}
```

Create the component you are going to import to replace element text.

```js
export default 'Hello from lazy';
```

Now use dynamic inside `app/components.js`.

```js
export default function (){
    ....
    element.onclick = () => {
        import('./lazy').then((lazy) => {
            element.textContent = lazy.default;
        }).catch((err) => {
            console.error(err);
        });
    };
    return element;
}
```

Now when you run `build` it will generate a new chunk called `0.js`.

#### Split point using `require.ensure`

```js
export default function () {
    ...
    element.onclick = () => {
        require.ensure([], (require) => {
            element.textContent = require('./lazy').default;
        });
    };
    return element;
}
```

#### Dynamic loading with require.context

```js
const req = require.context('./path', true, /\.extension$/);
req.keys() => ['./path/file1.jade','./path/file2.jade'....,'./path/fileN.jade'];
```

### Processing with Babel.

Webpack processes ES6 module defnition by default, and transforms them into vanilla JS.

It is important to note that does not transform ES6 specific syntax, such as `(lazy) => {`. This can be a problem specially on older browsers.

One way to work around this problem is to proecess the code through Babel.

#### Using Babel with Webpack.

You can use babel with the webpack through `babel-loader`. It can pick up project level Babel configuration or you can configure at the loader itself.

#### Setting up `babel-loader`

Install the package.

```js
$ npm i babel-loader babel-core --save-dev
```

Create the `.babelrc` configuration file.

```js
{
    "plugins": ["syntax-dynamic-import"],
    "presets": [
        [
            "es2015",
            {
                "modules": false
            }
        ]
    ]
}
```

Now define the parser inside the `webpack.parts.js`.

```js
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
```

And implement it inside the `webpack.config.js`.

```js
module.exports = function(env) {
    ...
    case 'production':
        serverConfig = merge(
                common,
                parts.loadJavaScript(PATHS.app),
                ...
            );
        break;
    ...
    return serverConfig;
};
```

Now the `js` files will be parsed using `babel-laoder`.

#### Setting up typescript

You can use TypeScript with webpack using the following loaders.

- ts-loader
- awesome-typescript-loader
- light-ts-loader

#### Cleaning the build.

Install the `clean-webpack-plugin`.

```sh
$ npm i clean-webpack-plugin --save-dev
```

Then create the loader configuration `webpack.parts.js`.

```js
exports.clean = function(path){
    return {
        plugins: [
            new CleanWebpackPlugin([path]),
        ],
    };
};
```

Now merge with the production configuration.

```js
module.exports = function(env) {
    ...
    case 'production':
        serverConfig = merge(
                common,
                parts.clean(PATHS.build),
                ...
            );
        break;
    default:
    ...
    return serverConfig;
};
```

Now every time we merge, we are going to see how our project folder is cleaned.

### Deploying to environments.

- `webpack-deploy` (is a collection of deployment utilities).
- `webpack-s3-sync-plugin` and `webpack-s3-plugin` sync the assets to Amazon S3.
- `ssh-webpack-plugin` deploys iver SSH.

## Optimizing the build.

Minimification is a process where code is simplified withouth loosing any meaning that matters to the interpreter. Even if we minimify our code we can still generate sourcemaps through the `devtool`.

If we run the `npm run build` we are going to see that we have a big vendor file.

#### Setting up.

Configure the loader inside `webpacks.parts.js`.

```js
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
```

Now hook to the configuration inside `webpack.config.js`.

```js
module.exports = function(env) {
    ...
    case 'production':
        serverConfig = merge(
                common,
                parts.clean(PATHS.build),
                parts.loadJavaScript(PATHS.app),
                parts.minifyJavaScript({ useSourceMap: true }),
                ...
            );
        break;
        ...
    }
    return serverConfig;
};
```

#### Minifying CSS

You can compress your css file using the `minify: true` inside the PurifyCSS plugin.

```js
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
```

### Setting environment variables.

A JS minifier can remove dead code `if(false)`. `DefinePlugin` can convert into `if(false)` all free variables such as `if (process.env.NODE_ENV === 'development')`.

Based on this we can define process.env.NODE_ENV so we can replace all those unnecesary blocks of code.

Define a block to set a variable through DefinePlugin inside `webpack.parts.js`.

```js
exports.setFreeVariable = function(key, value){
    const env = {};
    env[key] = JSON.stringify(value);
    return {
        plugins: [
            new webpack.DefinePlugin(env),
        ]
    };
};
```

Now merge the configuration inside the `webpack.config.js` file.

```js
module.exports = function(env) {
    ...
    case 'production':
        serverConfig = merge(
                common,
                parts.setFreeVariable(
                    'process.env.NODE_ENV',
                    'production'
                ),
                ...
            );
        break;
    }
    return serverConfig;
};
```

Now when you run `npm run build` its going to reduce the `vendor.js` file.

### Adding hashes to filenames.

Webpack provides placeholders for this purposes. These strings are used to attach specific information to webpack output.

- [path] (file path).
- [name] (file name).
- [ext] (file extension).
- [hash] (build hash).
- [chunkhash] (returns a chunk specific hash).
- [contenthash] (a hash to specific content, available for `ExtractTextPlugin` only).

Its preferable to use particularly `hash` and `chunkhash` only for production.

We can implement this hash modifying the `output` inside the `webpack.config.js` file.

```js
{
  output: {
    path: PATHS.build,
    filename: '[name].[chunkhash].js',
  },
},
```

There are few places in the build we need to tweak to generate proper hashes.

We must create a new object to merge the output configuration for our production environment inside `webpack.config.js`.

```js
module.exports = function(env) {
    case 'production':
        serverConfig = merge(
                common,
                {
                    output: {
                        chunkFilename:'scripts/[chunkhash].js',
                        filename: '[name].[chunkhash].js',
                    }
                }
                ...
            );
        break;
    return serverConfig;
};
```

We also need add the `contenthash` value to our css inside the `webpack.parts.js`.

```js
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
```

### Understanding npm Lookup

Show the current root folder.

```sh
$ npm root
```

Show the global root folder.

```js
$ npm root -g
```

#### Version Ranges

Npm supports multiple version ranges.

- `~` only patch versions `~1.2` would be equal to `1.2.x`.
- `^` matches to minor versions `0.2.2` would be equal to `0.2.x`
- `*` matches the major releases (this is the most dangerous of the ranges)
- `>= 1.3.0 < 2.0.0` range between versions

You can set your default range using `npm config set save-prefix='^'`

#### Dealing with globals.

Some times modules might depend on globals like the `$` provided by `jQuery`.

```js
{
    module: {
        rules: {
            test: require.resolve('jquery-plugin'),
            loader: 'imports-loader?$=jquery',
        }
    }
}
```

Webpack's `ProvidePlugin` can be used for similar purposes.

```js
{
    plugins: [
        new webpack.ProvidePlugin([
            $: 'jquery'
        ])
    ]
}
```

### Authoring packages.

Webpack it supports a format known as UMD format.

#### Anatomy of a npm package.

- `index.js`
- `package.json` - npm metadata in JSON format
- `README.md` - written in Markdown format and provides an overview
- `LICENSE` - include licensing information within your project
- `CONTRIBUTING.md` - a guide for potential contributors
- `CHANGELOG.md` - describes the major changes per version
- `.travis.yml` - is a popular continous integration platform
- `.gitignore` - ignore patterns for git
- `.npmignore` - ignore patterns for npm
- `.eslintignore` - ignore patterns for ESLint
- `.eslintrc` - linting rules
- `webpack.config.js`

If you want to decrease the size of your dependencies, consider using a tool like `package.config.checker`.

### Configuring React

`create-react-app` encapsulates a lot of best pracices related to developing React applications.

Create a new react app.

```sh
$ create-react-app myapp
$ cd myapp
```

#### Setting up Babel with React

Most of the projects rely on a format known as JSX. Some React developers prefer to attach type annotations to their code using a language syntax know as Flow. TypeScript is another viable alternative.

#### Configuring with Webpack

In order to process react we need to install the `babel-preset-react` package.

```sh
$ npm i babel-preset-react --save-dev
```

We also need to add this to the presets inside `.babelrc`.

```js
{
  "presets": [
    [
      "es2015",
      {
        "modules": false
      }
    ],
    "react"
  ]
}
```

Now inside `webpack.config.js` we have to define js and jsx to be parsed.

```js
const baseConfig = {
    ...
    resolve: {
        extensions: ['.js','.jsx'],
    },
    ...
};
```

##### Rendering a React Application

If we want to mount an application without any html file we can use `html-webpack-template` combined with `html-webpack-template` or `html-webpack-template-pug`.

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');

const common = {
...
plugins: [
    new HtmlWebpackPlugin({
        template: HtmlWebpackTemplate,
            title: 'Demo app',
            appMountId: 'app', // Generate #app where to mount
            mobile: true, // Scale page on mobile
            inject: false, // html-webpack-template requires this to work
        }),
    ],
};

module.exports = function(env) {
    ...
};
```

And we can define the access point inside the `app/index.js`.

```js
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <div>Hello world</div>,
    document.getElementById('app')
);
```

#### Babel-Based optimization.

- `babel-react-optimize` implements a variety of React specific optimizations.
- `babel-plugin-transform-react-remove-prop-types` is handy to remove `propType` related code from your production build.

#### Using react-lite instead of React for production.

The `react-lite` package implements React's API apart from features like `propTypes` and server side rendering.

The `preact-compat` package implements a smaller subset of features and is even smaller than `react-lite`.

To get started install react lite:

```sh
$ npm i react-lite --save-dev
```

Then inside the configuration set the resolve value.

```js
resolve: {
    alias: {
        'react': 'react-lite',
        'react-dom': 'react-lite',
    },
},
```
