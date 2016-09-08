'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var generatorConfig = require('../generator-base');
var _ = require('underscore.string');

generatorConfig.constructor = function () {
  yeoman.Base.apply(this, arguments);
};

generatorConfig.prompting = function () {
  // Have Yeoman greet the user.
  this.log(yosay(
    'Welcome to the leon\'s ' + chalk.red('generator-gulp-ionic') + ' generator!'
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

generatorConfig.writing = function () {
  this._processDirectory('', '', this.props);
},

generatorConfig.install = function () {
  this.installDependencies();
}

module.exports = yeoman.Base.extend(generatorConfig);
