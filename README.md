# Runtime Package Generator

The main use of this plugin is to keep node dependencies separate from a server bundle at runtime. This might be for file size, security or obscure dependencies that do not play well with Webpacks loading mechanisms.

This Webpack plugin will allow you to generate a package.json dynamically for your build to automatically keep a specific set of modules that you want external or excluded from your bundle. It will let you define what dependencies to keep and generate a new package.json in your build folder to be used with npm for installing modules separately to your bundle(s).

## Installation

```
  npm install runtime-package-generator-webpack-plugin --save-dev
```

## Usage

The plugin *must* be used in conjunction with the [nodeExternals](https://www.npmjs.com/package/webpack-node-externals) feature, which will ignore a require (i.e. Webpack will not resolve it), like so:

```
  const RuntimePackagePlugin = require('runtime-package-generator-webpack-plugin')

  {
    // ... config
    plugins: [
      new RuntimePackagePlugin({
        requiredAtRuntime: ['dependency-to-keep'], // required, defaults to []
        dest: 'build/server' // defaults to 'build/package.json'
      })
    ],
    externals: [nodeExternals({
      whitelist: function (name) {
        return name.indexOf('dependency-to-keep') > -1
      }
    })]
  }
```
