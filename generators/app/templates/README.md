#ZRSM

本工程基于generator-ionic-gulp生成, 并按照gulp-angular的代码树风格进行了修改.

[generator-ionic-gulp](https://github.com/tmaximini/generator-ionic-gulp#readme)

[generator-gulp-angular](https://github.com/Swiip/generator-gulp-angular)

配置开发环境的步骤:

# 1. 安装gulp
sudo npm install -g gulp

# 2. 进入根目录,安装npm依赖:
npm install

# 3. 启动项目
gulp

此时开发的web站点将通过默认浏览器打开, livereload也生效了.
修改代码的过程中,可以实时的在浏览器里看到变化.

项目源码结构:

app/src/:

commonStyles 里是一些公共的scss, 每个页面都会用到的.
component 里的每一个目录是一个组件(service, directive或者filter)
其他目录(例如login),则是一个一个的页面.


请尽量不要引入其他的第三方样式库, 因为有可能和ionic的样式冲突, 关于ionic:
http://ionicframework.com/


使用说明:
基于https://github.com/tmaximini/generator-ionic-gulp#readme


#### Development mode

By running just `gulp`, we start our development build process, consisting of:

- compiling, concatenating, auto-prefixing of all `.scss` files required by `app/styles/main.scss`
- creating `vendor.js` file from ~~external sources defined in `./vendor.json`~~ from `bower.json` using `wiredep`
- linting all `*.js` files `app/scripts` (or src/ if using browserify), see `.jshintrc` for ruleset
- automatically inject sources into `index.html` so we don't have to add / remove sources manually
- build everything into `.tmp` folder (also gitignored)
- start local development server and serve from `.tmp`
- start watchers to automatically lint javascript source files, compile scss and reload browser on changes

dev模式下server默认地址是0.0.0.0:8888  [ENV.json里定义]
如果想使用其他地址, 则可以修改ENV.json,或者用-s参数

example: 

`gulp -s 0.0.0.0:8888`
`gulp -s https://www.baisiyi365.com`


#### Build mode

By running just `gulp --build` or short `gulp -b`, we start gulp in build mode

- concat all `.js` sources into single `app.js` file
- version `main.css` and `app.js`
- build everything into `www`
- remove debugs messages such as `console.log` or `alert` with passing `--release`

build mode下server地址默认是www.baisiyi365.com. 
如果想更改server地址, 一样可以使用[-s] 

例如:
`gulp -b -s 10.32.11.101:8888`


#### Run

By running `gulp -r <platform>`, we can run our app on a connected device

- <platform> can be either `ios` or `android`, defaults to `ios`
- It will run the `gulp --build` before, so we have a fresh version to test

### splash screens and icons

Replace `splash.png` and `icon.png` inside `/resources`. Then run `ionic resources`. If you only want to regenerate icons or splashs, you can run `gulp icon` or `gulp splash` shorthand.

### customizing themes

Just override any Ionic variables in `app/styles/ionic-styles.scss`.

   
### ionic plugin install according to package.json

`ionic state reset`