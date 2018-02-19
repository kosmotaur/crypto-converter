import {exec, cat} from 'shelljs'

const helpContent = exec('./dist/bin/cli.js --help', {silent: true}).stdout.replace(/\n*$/)
const readmeContent = cat('./docs/README.md').stdout

console.log(readmeContent.replace('{{helpContent}}', helpContent))
