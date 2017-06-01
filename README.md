# Runtime Package Generator

The main use of this plugin is to keep node dependencies separate from a server bundle at runtime. This might be for file size, security or obscure dependencies that do not play well with Webpacks loading mechanisms.

This Webpack plugin will allow you to generate a package.json dynamically for your build to automatically keep a specific set of modules that you want external or excluded from your bundle. It will let you define what dependencies to keep and generate a new package.json in your build folder to be used in conjunction with npm for installing independent modules.

## Installation

  npm install runtime-package-generator-webpack-plugin --save-dev

## Usage

  const fs = require('fs')
  const packageJson = fs.readFileSync('./package.json')

  {
    // ... config
    plugins: [
      new RuntimePackagePlugin({
        package: package,
        requiredAtRuntime: ['dependency-to-keep'],
        newPath: path.resolve(__dirname, '../../../build/server/package.json')
      })
    ]
  }
