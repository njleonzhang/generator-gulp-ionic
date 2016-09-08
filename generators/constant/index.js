'use strict';
var yeoman = require('yeoman-generator');

var generatorConfig = require('../generator-base');

generatorConfig.writing = function () {
  this._processDirectory('', 'app/src/components/constants/',
    {
      cameledName: this.componentName,
      scriptAppName: this._getScriptAppName()
    });
}

module.exports = yeoman.Base.extend(generatorConfig);
