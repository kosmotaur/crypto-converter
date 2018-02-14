import yargs from 'yargs'

export default () =>
  yargs
    .option('currency', {
      alias: 'c',
      default: 'gbp'
    })
    .argv
