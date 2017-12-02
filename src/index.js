import {resolve} from 'path'
import PrettyError from 'pretty-error'
import {
  assoc,
  compose,
  composeP,
  converge,
  head,
  identity,
  invoker,
  map,
  mapObjIndexed,
  mergeAll,
  objOf,
  sum,
  tap,
  values
} from 'ramda'
import request from 'request-promise-native'
import yargs from 'yargs'

const d = require('debug')('crypto-convert')
const pe = new PrettyError()
const argv = yargs
  .option('currency', {
    alias: 'c',
    default: 'gbp'
  })
  .argv
const balancesPath = resolve(process.cwd(), argv._[0])
const tsym = argv.currency.toUpperCase()
let balances
try {
  d('Loading balances from %s', balancesPath)
  balances = require(balancesPath)
} catch (e) {
  console.error(`Can't find balances file under ${balancesPath}`)
  process.exit(1)
}
const main = () => {
  const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${Object.keys(balances).join(',')}&tsyms=${tsym}`

  d('Querying CryptoCompare: %s', url)

  return composeP(
    tap(() => d('Conversion complete')),
    mergeAll,
    values,
    mapObjIndexed((value, label) => objOf(
      label,
      `${Number(value).toFixed(2)} ${tsym}`
    )),
    converge(assoc('total'), [compose(invoker(1, 'toFixed')(2), sum, values), identity]),
    mergeAll,
    values,
    mapObjIndexed((rate, symbol) => objOf(
      `${Number(balances[symbol]).toFixed(4)} ${symbol}`,
      Number(balances[symbol] * rate).toFixed(4)
    )),
    map(compose(head, values)),
    JSON.parse,
    tap((response) => d('CryptoCompare response: %s', response)),
    request
  )(url)
}

main().then(compose(r => process.stdout.write(r), JSON.stringify), e => {
  console.log(pe.render(e))
  process.exit(1)
})
