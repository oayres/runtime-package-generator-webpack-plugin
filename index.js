const fs = require('fs')

function RuntimePackagePlugin (options) {
  this.newPath = options.newPath
  this.requiredAtRuntime = options.requiredAtRuntime
  this.package = JSON.parse(options.package)
  this.newPackage = {
    name: this.package.name,
    description: this.package.description,
    version: this.package.version,
    author: this.package.author,
    dependencies: {}
  }

  const keys = Object.keys(this.package.dependencies)

  this.requiredAtRuntime.forEach(function (dependency) {
    if (keys.indexOf(dependency) > -1) {
      this.newPackage.dependencies[dependency] = this.package.dependencies[dependency]
    }
  }.bind(this))
}

RuntimePackagePlugin.prototype.apply = function (compiler) {
  compiler.plugin('done', function (compilations) {
    fs.writeFileSync(this.newPath, JSON.stringify(this.newPackage), 'utf8')
  }.bind(this))
}

module.exports = RuntimePackagePlugin
