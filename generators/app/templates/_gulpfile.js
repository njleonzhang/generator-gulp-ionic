'use strict';

var appName = '<%= appName %>';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var beep = require('beepbeep');
var express = require('express');
var path = require('path');
var open = require('open');
var connectLr = require('connect-livereload');
var streamqueue = require('streamqueue');
var runSequence = require('run-sequence');
var merge = require('merge-stream');
var ripple = require('ripple-emulator');
var wiredep = require('wiredep');
var gulpNgConfig = require('gulp-ng-config');
var series = require('stream-series');
var notifier = require('node-notifier');
var runTimestamp = Math.round(Date.now()/1000);
var json = require('json-file');
var fs = require('fs');
var xml2js = require('xml2js');
/**
 * Parse arguments
 */
var args = require('yargs')
  .alias('e', 'emulate')
  .alias('b', 'build')
  .alias('r', 'run')
  .alias('s', 'server')
  // uglify or not when build, by default, it is uglified
  .alias('d', 'debug')
  // remove all debug messages (console.logs, alerts etc) from release build
  .alias('i', 'strip-debug')
  .default('build', false)
  .default('debug', false)
  .default('port', 9000)
  .default('strip-debug', false)
  .argv;

var build = !!(args.build || args.emulate || args.run);
var debug = args.debug;
var emulate = args.emulate;
var run = args.run;
var port = args.port;
var stripDebug = !!args.stripDebug;
var targetDir = path.resolve(build ? 'www' : '.tmp');
var vendor = wiredep();

var server = args.server;

if (server === true) {
  // gulp -s
  server = 'http://0.0.0.0:8888/';
} else if (server) {
  //gulp -s 10.32.11.101:8888
  var hasProtocal = /^(http)/.test(server);
  if (!hasProtocal) {
    server = 'http://' + server + '/';
  }
}

// if we just use emualate or run without specifying platform, we assume iOS
// in this case the value returned from yargs would just be true
if (emulate === true) {
  emulate = 'ios';
}
if (run === true) {
  run = 'ios';
}

// global error handler
var errorHandler = function (error) {
  if (build) {
    throw error;
  } else {
    beep(2, 170);
    plugins.util.log(error);
  }
};


function xmlFileToJs(filename, cb) {
  var filepath = path.normalize(path.join(__dirname, filename));
  fs.readFile(filepath, 'utf8', function(err, xmlStr) {
    if (err) throw (err);
    xml2js.parseString(xmlStr, {}, cb);
  });
}

function jsToXmlFile(filename, obj, cb) {
  var filepath = path.normalize(path.join(__dirname, filename));
  var builder = new xml2js.Builder();
  var xml = builder.buildObject(obj);
  fs.writeFile(filepath, xml, cb);
}
var version;

gulp.task('version', function() {
  version = json.read(path.resolve(__dirname, './package.json')).get('version')
  var configRPath = './config.xml';
  xmlFileToJs(configRPath, function(error, data) {
    var config = data;
    config.widget.$.version = version;
    config.widget.$['ios-CFBundleVersion'] = version;
    jsToXmlFile(configRPath, config);
  });
})

// clean target dir
gulp.task('clean', function (done) {
  return del([targetDir], done);
});

// precompile .scss and concat with ionic.css
gulp.task('styles', function () {
  var options = build ? {style: 'compressed'} : {style: 'expanded'};
  var vendorScss = vendor.scss || [];
  var vendorScssRelativePath = [];
  vendorScss.forEach(function(e) {
    vendorScssRelativePath.push(path.relative(__dirname, e));
  })

  var sassStream = gulp.src(vendorScss.concat(['./app/src/**/*.scss']))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.order(vendorScssRelativePath.concat([
      'app/src/commonStyles/base/variables.scss',
      'app/src/commonStyles/base/tools.scss',
      'app/src/commonStyles/**/*.scss',
      'app/src/**/*.scss'
    ]), {base: '.'}))
    .pipe(plugins.concatSourcemap('bundle-temp.scss'))
    .pipe(plugins.plumber({errorHandler: function(error) {
      sassStream.emit('end')
      console.error(error.message);
      notifier.notify({title: 'sass error', message: error.message});
    }}))
    .pipe(plugins.sass(options))
    .pipe(plugins.autoprefixer('last 1 Chrome version', 'last 3 iOS versions', 'last 3 Android versions'))
    .on('error', function (err) {
      console.log('err: ', err);
      beep();
    });

  // build ionic css dynamically to support custom themes
  var ionicStream = gulp.src('app/ionic-styles/ionic-styles.scss')
    .pipe(plugins.cached('ionic-styles'))
    .pipe(plugins.sass(options))
    // cache and remember ionic .scss in order to cut down re-compile time
    .pipe(plugins.remember('ionic-styles'))
    .on('error', function (err) {
      console.log('err: ', err);
      beep();
    });

  return series(ionicStream, sassStream)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.concat('main.css'))
    .pipe(plugins.if(build, plugins.stripCssComments()))
    .pipe(plugins.if(build && !emulate, plugins.rev()))
    .pipe(plugins.sourcemaps.write('/'))
    .pipe(gulp.dest(path.join(targetDir, 'styles')))
    .on('error', errorHandler);
});

// build templatecache, copy scripts.
// if build: concat, minsafe, uglify and versionize
gulp.task('scripts', function () {
  var dest = path.join(targetDir, 'scripts');

  var minifyConfig = {
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
    removeComments: true
  };

  // prepare angular template cache from html templates
  // (remember to change appName var to desired module name)
  var templateStream = gulp
    .src('**/*.html', {cwd: 'app/src/'})
    .pipe(plugins.angularTemplatecache('templates.js', {
      root: 'src/',
      module: appName,
      htmlmin: build && minifyConfig
    }));

  var scriptStream = gulp
    .src(['templates.js', 'app.js', '**/*.js'], {cwd: 'app/src'})
    .pipe(plugins.if(!build, plugins.changed(dest)));

  return streamqueue({objectMode: true}, scriptStream, templateStream)
    .pipe(plugins.plumber({errorHandler: function(error) {
      this.emit('end')
      console.error(error.message);
      notifier.notify({title: 'js error', message: error.message});
    }}))
    .pipe(plugins.if(build, plugins.sourcemaps.init()))
    .pipe(plugins.babel({presets: ['es2015'], compact: false}))
    .pipe(plugins.if(build, plugins.ngAnnotate()))
    .pipe(plugins.if(build, plugins.concat('app.js')))
    .pipe(plugins.if(stripDebug, plugins.stripComments()))
    .pipe(plugins.if(stripDebug, plugins.removeLogging({
      methods: ['log']
    })))
    .pipe(plugins.if(build && !emulate && !debug, plugins.uglify()))
    .pipe(plugins.if(build && !emulate, plugins.rev()))
    .pipe(plugins.if(build, plugins.sourcemaps.write('/')))
    .pipe(gulp.dest(dest))
    .on('error', errorHandler);
});

// copy fonts
gulp.task('fonts', function () {
  return gulp
    .src(['app/fonts/*.*', 'bower_components/ionic/release/fonts/*.*'])

    .pipe(gulp.dest(path.join(targetDir, 'fonts')))

    .on('error', errorHandler);
});

// generate iconfont
gulp.task('iconfont', function () {
  return gulp.src(['app/icons/*.svg'])
    .pipe(plugins.iconfontCss({
      fontName: 'ownIconFont',
      path: 'app/icons/own-icons-template.css',
      targetPath: '../styles/own-icons.css',
      fontPath: '../fonts/'
    }))
    .pipe(plugins.iconfont({
      fontName: 'ownIconFont',
      prependUnicode: true,
      timestamp: runTimestamp,
    }))
    .pipe(gulp.dest(path.join(targetDir, 'fonts')))
    .on('error', errorHandler);
});

// copy images
gulp.task('images', function () {
  return gulp.src('app/images/**/*.*')
    .pipe(gulp.dest(path.join(targetDir, 'images')))

    .on('error', errorHandler);
});

// lint js sources based on .jshintrc ruleset
gulp.task('jsHint', function (done) {
  var eslint = plugins.eslint;
  return gulp
    .src(['app/src/**/*.js', '!app/src/components/constants/ENV.js'])
    .pipe(plugins.plumber({errorHandler: function(error) {
      notifier.notify({title: 'eslint error', message: error.message});
    }}))
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .on('error', errorHandler);
  done();
});

// concatenate and minify vendor sources
gulp.task('vendor', function () {
  var vendorJs = vendor.js;
  return gulp.src(vendorJs)
    .pipe(plugins.if(build, plugins.sourcemaps.init()))
    .pipe(plugins.concat('vendor.js'))
    .pipe(plugins.if(build && !emulate && !debug, plugins.uglify()))
    .pipe(plugins.if(build && !emulate, plugins.rev()))
    .pipe(plugins.if(build, plugins.sourcemaps.write('/')))

    .pipe(gulp.dest(targetDir))

    .on('error', errorHandler);
});

// inject the files in index.html
gulp.task('index', ['jsHint', 'scripts'], function () {

  // build has a '-versionnumber' suffix
  var cssNaming = 'styles/main*';

  // injects 'src' into index.html at position 'tag'
  var _inject = function (src, tag) {
    return plugins.inject(src, {
      starttag: '<!-- inject:' + tag + ':{{ext}} -->',
      read: false,
      addRootSlash: false
    });
  };

  // get all our javascript sources
  // in development mode, it's better to add each file seperately.
  // it makes debugging easier.
  var _getAllScriptSources = function () {
    var scriptStream = gulp.src(['scripts/app.js', 'scripts/**/*.js'], {cwd: targetDir});
    return streamqueue({objectMode: true}, scriptStream);
  };

  return gulp.src('app/src/index.html')
    // inject css
    .pipe(_inject(gulp.src(cssNaming, {cwd: targetDir}), 'app-styles'))
    // inject vendor.js
    .pipe(_inject(gulp.src('vendor*.js', {cwd: targetDir}), 'vendor'))
    // inject app.js (build) or all js files indivually (dev)
    .pipe(plugins.if(build,
      _inject(gulp.src('scripts/app*.js', {cwd: targetDir}), 'app'),
      _inject(_getAllScriptSources(), 'app')
    ))
    .pipe(plugins.if(build,
      plugins.htmlReplace({cordova: 'cordova.js'})
    ))
    .pipe(gulp.dest(targetDir))
    .on('error', errorHandler);
});

// start local express server
gulp.task('serve', function () {
  var app = express();

  app.use(!build ? connectLr() : function () {
  });
  app.use(express.static(targetDir));

  app.listen(port);
  console.log('server start on port: ' + port);
});

// ionic emulate wrapper
gulp.task('ionic:emulate', plugins.shell.task([
  'ionic emulate ' + emulate + ' --livereload --consolelogs'
]));

// ionic run wrapper
gulp.task('ionic:run', plugins.shell.task([
  'ionic run ' + run
]));

// ionic resources wrapper
gulp.task('icon', plugins.shell.task([
  'ionic resources --icon'
]));
gulp.task('splash', plugins.shell.task([
  'ionic resources --splash'
]));
gulp.task('resources', plugins.shell.task([
  'ionic resources'
]));

// select emulator device
gulp.task('select', plugins.shell.task([
  './helpers/emulateios'
]));

// ripple emulator
gulp.task('ripple', ['scripts', 'styles', 'watchers'], function () {

  var options = {
    keepAlive: false,
    open: true,
    port: 4400
  };

  // Start the ripple server
  ripple.emulate.start(options);

  open('http://localhost:' + options.port + '?enableripple=true');
});

// start watchers
gulp.task('watchers', function () {
  plugins.livereload.listen();
  gulp.watch(['app/ionic-styles/**/*.scss', 'app/src/**/*.scss'], ['styles']);
  gulp.watch('app/fonts/**', ['fonts']);
  gulp.watch('app/icons/**', ['iconfont']);
  gulp.watch('app/images/**', ['images']);
  gulp.watch(['app/src/**/*.js'], ['index']);
  gulp.watch('./bower.json', ['vendor']);
  gulp.watch('app/src/**/*.html', ['index']);
  gulp.watch('app/src/index.html', ['index']);
  gulp.watch('package.json', ['version']);
  if(!server && !build) {
    gulp.watch(['ENV.json', 'package.json'], ['devENV']);
  } else if (!build && server) {
    gulp.watch(['package.json'], ['customizeEnv']);
  }

  gulp.watch(targetDir + '/**')
    .on('change', plugins.livereload.changed)
    .on('error', errorHandler);
});

// no-op = empty function
gulp.task('noop', function () {
});

var configPath = 'app/src/components/constants/';

// dev environment
gulp.task('devENV', function () {
  return gulp.src('ENV.json')
    .pipe(plugins.jsonEditor({
      dev: {
        ENVconfig: {
          version: version
        }
      }
    }))
    .pipe(gulpNgConfig('ENV', {environment: 'dev'}))
    .pipe(gulp.dest(configPath))
    .on('error', errorHandler);
});

// production environment
gulp.task('productionENV', function () {
  console.log(plugins);
  return gulp.src('ENV.json')
    .pipe(plugins.jsonEditor({
      production: {
        ENVconfig: {
          version: version
        }
      }
    }))
    .pipe(gulpNgConfig('ENV', {environment: 'production'}))
    .pipe(gulp.dest(configPath))
    .on('error', errorHandler);
});

// customizeEnv environment
gulp.task('customizeEnv', function () {
  var fs = require('fs');
  fs.writeFileSync('./.ENVTemplate.json', '{}');

  return gulp.src('.ENVTemplate.json')
    .pipe(plugins.jsonEditor({
      ENVconfig: {
        serverBase: server,
        debug: true,
        version: version
      }
    }))
    .pipe(gulpNgConfig('ENV'))
    .pipe(plugins.rename('ENV.js'))
    .pipe(gulp.dest(configPath))
    .on('error', errorHandler);
});

// our main sequence, with some conditional jobs depending on params
gulp.task('default', function (done) {
  runSequence(
    'clean',
    'iconfont',
    'version',
    [
      'fonts',
      'styles',
      'images',
      'vendor'
    ],
    server ? 'customizeEnv' : (build && !emulate) ? 'productionENV' : 'devENV',
    'index',
    build ? 'noop' : 'watchers',
    build ? 'noop' : 'serve',
    emulate ? ['ionic:emulate', 'watchers'] : 'noop',
    run ? 'ionic:run' : 'noop',
    done);
});
