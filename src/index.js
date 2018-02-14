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
import debug from 'debug'
import getArgv from './argv'

const d = debug('crypto-convert')

const main = balances => {
  const argv = getArgv()
  const tsym = argv.currency.toUpperCase()
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
    tap(response => d('CryptoCompare response: %s', response)),
    request
  )(url)
}

export default main
