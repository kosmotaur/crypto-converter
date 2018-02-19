import {exec, cat} from 'shelljs'

const helpContent = exec('npm start --silent -- --help', {silent: true}).stdout.replace(/\n*$/, '')
const readmeContent = cat('./docs/README.md').stdout

console.log(readmeContent.replace('{{helpContent}}', helpContent))
