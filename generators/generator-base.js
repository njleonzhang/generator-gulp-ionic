'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var glob = require('glob');
var _ = require('underscore.string');
var ejs = require('ejs');

module.exports = {
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    // This makes `componentName` a required argument.
    this.argument('componentName', { type: String, required: true });

    this.componentName = _.camelize(this.componentName);
  },

  _getScriptAppName: function() {
    var bowerJson = {};
    try {
      bowerJson = require(path.join(process.cwd(), 'bower.json'));
    } catch (e) {}

    var appname;
    if (bowerJson.name) {
      appname = bowerJson.name;
    } else {
      appname = path.basename(process.cwd());
    }

    appname = _.slugify(_.humanize(appname));
    return  _.camelize(appname);
  },

  _processDirectory: function(source, destination, data) {
    var root = path.join(this.sourceRoot(), source);
    var files = glob.sync('**/*.*', { dot: true, cwd: root });

    for (var i = 0; i < files.length; i++) {
      var f = files[i];
      var src = path.join(root, f);
      var dest;
      if (path.basename(f).indexOf('_') === 0) {
        dest = path.join(destination,
          path.dirname(f),
          path.basename(f).replace(/^_/, ''));

        dest = ejs.render(dest, data);
        this.template(src, dest, data);
      } else {
        dest = path.join(destination, f);
        dest = ejs.render(dest, data);

        try{
          this.bulkCopy(src, dest);
        } catch (e) {
          // if it's folder, skip the error 
          if (e.code !== 'EISDIR') {
            console.log(e);
          }
        }
      }
    }
  },

  writing: function () {
    this._processDirectory('', 'app/src/components/',
      {
        cameledName: this.componentName,
        scriptAppName: this._getScriptAppName()
      });
  }
};
