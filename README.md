# crypto-converter [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
CLI to convert your cryptocurrency portfolio holdings to one single target currency.

## Why?

Most tools out there that try to help you with tracking cryptocurrencies' values are doing a bit too much.
Therefore I've built this CLI, to convert JSON with your holdings to a target currency, be it fiat or another crypto.
Built on top of [CryptoCompare](http://cryptocompare.com)'s API.

## Installation
```
npm i -g crypto-converter
```

## Usage

```
crypto-converter [options] [path-to-balances-file]
```

Balances is expected to be a JSON file of a structure like:
```
{
  "BTC": 0.01,
  "ETH": 0.9,
  "XRP": 12
}
```

### Options
```
#include "help.md"
```

### Usage examples

#### defaults

```
$ crypto-converter balances.json

{"0.0100 BTC":"71.08 GBP","0.9000 ETH":"603.50 GBP","12.0000 XRP":"9.45 GBP","total":"684.03 GBP"}
```

#### with target currency
```
$ crypto-converter -c EUR balances.json

{"0.0100 BTC":"79.98 EUR","0.9000 ETH":"673.41 EUR","12.0000 XRP":"10.64 EUR","total":"764.03 EUR"}
```

#### piping output for formatting
```
$ crypto-converter balances.json | python -mjson.tool

{
    "0.0100 BTC": "71.36 GBP",
    "0.9000 ETH": "603.48 GBP",
    "12.0000 XRP": "9.51 GBP",
    "total": "684.35 GBP"
}
```

#### using with [jq](https://stedolan.github.io/jq/) (incl. colours!)
```
$ crypto-converter balances.json | jq

{
  "0.0100 BTC": "71.06 GBP",
  "0.9000 ETH": "603.39 GBP",
  "12.0000 XRP": "9.53 GBP",
  "total": "683.98 GBP"
}
```
