import test from 'ava'
import Chance from 'chance'
import {fromPairs} from 'ramda'
import sinon from 'sinon'
import td from 'testdouble'

const chance = Chance()
const createFakeBalances = () =>
  fromPairs(chance.n(() => [chance.word(), chance.floating({min: 0})], chance.natural({min: 1, max: 20})))

test.before(t => {
  const request = sinon.stub().resolves('{}')

  td.replace('request-promise-native', request)
  t.context = {
    request,
    subject: require('../src/index').default,
    balances: createFakeBalances()
  }
})
test.after(() => {
  td.reset()
})
test.todo('throws when no balances provided')
test.todo('throws when no target currency provided')
test.todo('throws when balances are not an object')
test.todo('throws when incorrect holding symbol')
test.only('throws when incorrect holding value', t => t.throws(() => t.context.subject({[chance.word()]: chance.word()})))
test('returns a promise of conversion', t => t.true(t.context.subject(t.context.balances, chance.word()) instanceof Promise))
test('calls CryptoCompare.com API', async t => {
  const tsym = chance.word()
  const expectedURL = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${Object.keys(t.context.balances).join(',')}&tsyms=${tsym}`

  await t.context.subject(t.context.balances, tsym)
  t.is(t.context.request.args[0][0], expectedURL, 'Calling CryptoCompare with incorrect URL')
})
