# generator-gulp-ionic

> Ionic generator organizes html, js and scss by feature, supports ES6, livereload, also provide service generator command.

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

Generate your new service:

```bash
yo gulp-ionic:service myService
```

Produces `src/app/scripts/services/myService.js`:

```javascript
angular.module('myMod').service('MyService', function () {
  // ...
});
```

You can also do `yo gulp-ionic:factory`, `yo gulp-ionic:provider`, `yo gulp-ionic:value`, and `yo gulp-ionic:constant` for other types of services.!

## Usage of the generated project.
<div style="text-align: center">
<img src="/assets/architecture.png" width="250">
</div>

* All source code is under `app` folder.
For a page or directive, html, js and scss is organized in same folder.
For the structure of the generated project, check [project structure](https://github.com/Swiip/generator-gulp-angular/blob/master/docs/usage.md)


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

## steps to deploy the app to device
1. build the app, which will generaor release app in folder`www`.

  `gulp -b`

2. install plugins according to package.json

  `ionic state reset`

3. generate icon and splash

  `ionic resources`

4. add android and ios project

  `ionic platform add android|ios`

5. build and deploy the app to device/simulator

  `ionic run android|ios`

## inspired by
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
