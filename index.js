const fs = require('fs')

function RuntimePackagePlugin (options) {
  this.dest = options.dest || options.newPath || './build/'
  this.requiredAtRuntime = options.requiredAtRuntime

  if (this.dest.indexOf('package.json') > -1) {
    this.dest.replace('package.json', '')
  }

  if (options.package) {
    this.package = JSON.parse(options.package)
  } else {
    const packageJson = fs.readFileSync('./package.json')
    this.package = JSON.parse(packageJson)
  }

  this.newPackage = {
    name: this.package.name || 'runtime-package',
    description: this.package.description || 'The rutime package containing dependencies that need to be external.',
    version: this.package.version || '1.0',
    author: this.package.author || '',
    dependencies: {}
  }

  const keys = Object.keys(this.package.dependencies)

  this.requiredAtRuntime.forEach(function (dependency) {
    if (keys.indexOf(dependency) > -1) {
      this.newPackage.dependencies[dependency] = this.package.dependencies[dependency]
    } else {
      console.warn('RuntimePackagePlugin: The dependency "' + dependency + '" could not be found in your package.json dependencies.')
      console.warn('Is it defined in devDependencies by accident? \n')
    }
  }.bind(this))
}

RuntimePackagePlugin.prototype.apply = function (compiler) {
  compiler.plugin('done', function () {
    if (!fs.existsSync(this.dest)) {
      fs.mkdirSync(this.dest)
    }

    fs.writeFileSync(this.dest + '/package.json', JSON.stringify(this.newPackage), 'utf8')
  }.bind(this))
}

module.exports = RuntimePackagePlugin
