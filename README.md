# generator-gulp-ionic

> This generator is inspired by [generator-ionic-gulp](https://github.com/tmaximini/generator-ionic-gulp#readme) and [generator-gulp-angular](https://github.com/Swiip/generator-gulp-angular). It has full function of [generator-ionic-gulp](https://github.com/tmaximini/generator-ionic-gulp#readme), at the same time, has the project structure of [generator-gulp-angular](https://github.com/Swiip/generator-gulp-angular).


## Installation

First, install [Yeoman](http://yeoman.io) and generator-gulp-ionic using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-gulp-ionic
```

Then generate your new project:

```bash
yo gulp-ionic
```

## Usage of the generated project. 

* For the structure of the generated project, check [project structure](https://github.com/Swiip/generator-gulp-angular/blob/master/docs/usage.md)
* For gulp command of the generated project, it is basically same to [generator-ionic-gulp](https://github.com/tmaximini/generator-ionic-gulp#readme), 
except we add a gulp option `-server or -s`

There is a file named `ENV.json` at the root folder, whose content should be like this:

```
    {
      "dev": {
        "ENVconfig": {
          "serverBase": "0.0.0.0:8888"
        }
      },
      "production": {
        "ENVconfig": {
          "serverBase": "http://hipsterjesus.com/"
        }
      }
    }
```

A service is generated according to this json file.  
 
```
    angular.module("ENV", [])
    .constant("ENVconfig", {"serverBase":"http://hipsterjesus.com/"});

```

If you start the server by command `gulp`, we consider you are in develop mode, `"dev"` property in the json file will be used to generate angular `ENVconfig` module.
If you start the server by command `gulp -run, gulp -build`, we consider you are in release mode, `produttion` property in the json will be used to generate angular `ENVconfig` module.

Of course, If you can revise `ENV.json` to your own config. But sometimes, we need to change `serverBase` frequently when we make some test.
In this situation, you can use `-server or -s` option,

* `gulp -s www.xxx.com`         // debug mode with special serverBase
* `gulp -r -s www.xxx.com`      // production mode with special serverBase


### ionic plugin installation according to package.json

`ionic state reset`


## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

Apache-2.0 © [njleonzhang](https://github.com/njleonzhang)


[npm-image]: https://badge.fury.io/js/generator-gulp-ionic.svg
[npm-url]: https://npmjs.org/package/generator-gulp-ionic
[travis-image]: https://travis-ci.org//generator-gulp-ionic.svg?branch=master
[travis-url]: https://travis-ci.org//generator-gulp-ionic
[daviddm-image]: https://david-dm.org//generator-gulp-ionic.svg?theme=shields.io
[daviddm-url]: https://david-dm.org//generator-gulp-ionic
