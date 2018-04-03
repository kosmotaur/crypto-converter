#!/usr/bin/env node

import debug from 'debug'
import { resolve } from 'path'
import { compose } from 'ramda'
import main from '../'
import getArgv from '../argv'

const argv = getArgv()
const d = debug('crypto-convert')
const balancesPath = resolve(process.cwd(), argv._[0])
const tsym = argv.currency.toUpperCase()
let balances

try {
  d('Loading balances from %s', balancesPath)
  balances = require(balancesPath)
} catch (err) {
  console.error(`Can't find balances file under ${balancesPath}`)
  process.exit(1)
}

main(balances, tsym)
  .then(compose(r => process.stdout.write(r), JSON.stringify), e => {
    console.log(e)
    process.exit(1)
  })
