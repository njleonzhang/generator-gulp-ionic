'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var glob = require('glob');
var _ = require('underscore.string');

module.exports = yeoman.Base.extend({

  ///////////////////////////////////////////////////////////////////////////////
  // Process directories applying template to files with leading underscore
  // Adapted from: http://bit.ly/1WmHME0
  //
  _processDirectory: function(source, destination, data) {
    var root = path.join(this.sourceRoot(), source);
    var files = glob.sync('**/*.*', { dot: true, cwd: root });
    files.push('helpers/emulateios');
    files.push('.gitignore');

    for (var i = 0; i < files.length; i++) {
      var f = files[i];
      var src = path.join(root, f);
      var dest;
      if (path.basename(f).indexOf('_') === 0) {
        dest = path.join(destination,
          path.dirname(f),
          path.basename(f).replace(/^_/, ''));
        this.template(src, dest, data);
      } else {
        dest = path.join(destination, f);
        this.bulkCopy(src, dest);
      }
    }
  },


  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the cat\'s pajamas ' + chalk.red('generator-gulp-ionic') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'appName',
        message: 'What\'s the app name?',
        default: _.camelize(this.appname) // Default to current folder name
      },
      {
        type: 'input',
        name: 'userName',
        message: 'The author\'s name? (for config files)',
        default: this.user.git.name || 'Your Name'
      },
      {
        type: 'input',
        name: 'userEmail',
        message: 'Author email? (for config files)',
        default: this.user.git.email || 'email@example.com'
      },
      {
        type: 'input',
        name: 'appId',
        message: 'The app id?',
        default: 'com.test.test'
      }
    ];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      props.name = _.camelize(props.name);
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this._processDirectory('', '', this.props);
  },

  install: function () {
    this.installDependencies();
  }
});
