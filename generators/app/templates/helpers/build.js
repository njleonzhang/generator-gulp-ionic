#!/usr/bin/env node

var params = ''
    paramsStart = false

process.argv.forEach(e => {
  if(!paramsStart) {
    if (e.indexOf('build.js') !== -1) {
      paramsStart = true
    }
  } else {
    params += ` ${e}`
  }
})

var command = `gulp -b${params}; ionic prepare`
var shelljs = require('shelljs')
var chalk = require('chalk')

console.log(chalk.yellow(`run command: ${command}`))

if (shelljs.exec(command).code !== 0) {
  shelljs.echo('Error: ionic prepare ios failed')
  shelljs.exit(1)
} else {
  shelljs.exit(0)
}
