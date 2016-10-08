# generator-gulp-ionic

> May be the best Ionic1 generator. organizes html, js and scss by feature, supports ES6, livereload, also provide kinds of generators.

## Installation
First, install [Yeoman](http://yeoman.io) and generator-gulp-ionic using  [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-gulp-ionic
```

Then generate your new project:

```
yo gulp-ionic
```

## Generator for angular components
`yo gulp-ionic:page [name]`

`yo gulp-ionic:constant [name]`

`yo gulp-ionic:directive [name]`

`yo gulp-ionic:tinyDirective [name]`

`yo gulp-ionic:service [name]`

`yo gulp-ionic:factory [name]`

`yo gulp-ionic:filter [name]`

`yo gulp-ionic:provider [name]`

`yo gulp-ionic:value [name]`

`yo gulp-ionic:constant [name]`

Notice: `tinyDirective` is directive only has javascript file

## Usage of the generated project.

### Architecture

<div style="text-align: center">
<img src="/assets/architecture.png" width="250">
</div>

* All source code is under `app` folder.
For a page or directive, html, js and scss is organized in same folder.

### Commands

#### Prepare enviroment
1. install dependencies
in `zrsm-worker` folder, run: `cnpm istall && bower install`

2. generate icon and splash
`ionic resources`

3. install plugins according to package.json
`npm run reset`

#### Develop enviroment
start a dev enviroment, run `gulp`
* To indicate a special server, use `gulp -s [server:port]`

#### Deploy the app to device
1. generate front-end code in folder `www`.

  * `npm run build-debug` (build with log and not uglify javascript)
  
  * `npm run build-release` (build without log and uglify javascript)
  
  * To indicate a special server:  `-s server`
  
    `npm run [build|release] -- -s 10.32.11.10:8080`

2. Deploy the app to device/simulator
    * for android, `ionic run android`
    * for ios, open the project by xcode, run the project to device or simulator (you can try to use `ionic run ios`, currently if we use this command, we encounter issues)

#### Release package
1. `npm run build-release`
2. generate package
    * for android, `npm run release-android`
    * for ios, open the project by xcode, build app, and upload to app store

## Inspired by
 [generator-ionic-gulp](https://github.com/tmaximini/generator-ionic-gulp#readme)  

 [generator-gulp-angular](https://github.com/Swiip/generator-gulp-angular)

 [generator-angular](https://github.com/yeoman/generator-angular).

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

Apache-2.0 © [njleonzhang](https://github.com/njleonzhang)
