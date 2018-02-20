import yargs from 'yargs'

export default () =>
  yargs
    .usage('$0 [options] [path-to-balances.json]')
    .option('currency', {
      alias: 'c',
      default: 'gbp',
      description: 'Target currency to convert holdings to'
    })
    .example('$0 balances.json')
    .argv
