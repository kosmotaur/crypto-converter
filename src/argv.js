import yargs from 'yargs'

export default () =>
  yargs
    .option('currency', {
      alias: 'c',
      default: 'gbp',
      description: 'Target currency to convert holdings to'
    })
    .argv
