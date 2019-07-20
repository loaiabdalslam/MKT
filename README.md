# [MKT](https://loaiabdalslam.github.io/mkt-website/)

![MKT.JS](./media/mkt.jpg)

![mkt](https://img.shields.io/npm/dw/@mkt-eg/mkt.svg)
![mkt](https://img.shields.io/github/stars/loaiabdalslam/MKT.svg?style=social)
![mkt](https://img.shields.io/github/forks/loaiabdalslam/MTK.svg?style=social)
![mkt](https://img.shields.io/github/last-commit/loaiabdalslam/mkt.svg)

MKT.js is an Exchange Price Service , Stocks , Cryptocurrency,Stock prediction and more \
This package contains hundreds of currencies, cryptocurrencies and stocks prices.\
6,096 coin , 283,037 TRADING PAIRS , 31 News Provider It also works with the TensorFlow  Read more here [Read more about crypto-compare service](https://min-api.cryptocompare.com/faq)
for market forecasting / stock prediction using RNN and also works on the visualizing of stocks data using canvas.js

## Dependencies
- Neural Networks (brain.js)
- Tensorflow Framework (tensorflow.js)
- Data visualization (canvas.js)
- Main Api ( min-api.cryptocompare.com )


###  Get started :

```
npm i @mkt-eg/mkt

```

#### 1 -  Get Full details response (multiaple fsym & tsym)

```
const { MKT } = require('@mkt-eg/mkt')

const mkt = new MKT(
  'bbbc22c3a13c74456a6d4bb7ba5745476ebfdc81c867fc240258122b78eb6a6f'
)
const data = mkt
  .exchange({
    fsym: 'BTC',
    tsyms: 'USD',
    type: 'full'
  })
  .then(response => {
    console.log(JSON.stringify(response.data))
  })
  .catch(error => {
    console.log(error)
  })
  
// JSON OUTPUT 
/* 
{
   "RAW":{
      "BTC":{
         "USD":{
            "TYPE":"5",
            "MARKET":"CCCAGG",
            "FROMSYMBOL":"BTC",
            "TOSYMBOL":"USD",
            "FLAGS":"2",
            "PRICE":9885.11,
            "LASTUPDATE":1563398729,
            "LASTVOLUME":0.1,
            "LASTVOLUMETO":986.6100000000001,
            "LASTTRADEID":"379345663",
            "VOLUMEDAY":93692.97987050914,
            "VOLUMEDAYTO":893517565.3549776,
            "VOLUME24HOUR":104598.9946433591,
            "VOLUME24HOURTO":997000834.8997525,
            "OPENDAY":9423.44,
            "HIGHDAY":9982.24,
            "LOWDAY":9086.51,
            "OPEN24HOUR":9649.99,
            "HIGH24HOUR":9988.35,
            "LOW24HOUR":9076.48,
            "LASTMARKET":"Bitfinex",
            "VOLUMEHOUR":2210.51459713301,
            "VOLUMEHOURTO":21755061.31969251,
            "OPENHOUR":9692.2,
            "HIGHHOUR":9943.53,
            "LOWHOUR":9663.39,
            "TOPTIERVOLUME24HOUR":101424.52271706509,
            "TOPTIERVOLUME24HOURTO":966363837.9391046,
            "CHANGE24HOUR":235.1200000000008,
            "CHANGEPCT24HOUR":2.436479208786753,
            "CHANGEDAY":461.6700000000001,
            "CHANGEPCTDAY":4.899166334162472,
            "SUPPLY":17823212,
            "MKTCAP":176184411173.32,
            "TOTALVOLUME24H":720083.9899007804,
            "TOTALVOLUME24HTO":7081137716.36884,
            "TOTALTOPTIERVOLUME24H":425384.18596477184,
            "TOTALTOPTIERVOLUME24HTO":4168740744.7056427,
            "IMAGEURL":"/media/19633/btc.png"
         }
      }
   },
   "DISPLAY":{
      "BTC":{
         "USD":{
            "FROMSYMBOL":"Ƀ",
            "TOSYMBOL":"$",
            "MARKET":"CryptoCompare Index",
            "PRICE":"$ 9,885.11",
            "LASTUPDATE":"Just now",
            "LASTVOLUME":"Ƀ 0.1000",
            "LASTVOLUMETO":"$ 986.61",
            "LASTTRADEID":"379345663",
            "VOLUMEDAY":"Ƀ 93,693.0",
            "VOLUMEDAYTO":"$ 893,517,565.4",
            "VOLUME24HOUR":"Ƀ 104,599.0",
            "VOLUME24HOURTO":"$ 997,000,834.9",
            "OPENDAY":"$ 9,423.44",
            "HIGHDAY":"$ 9,982.24",
            "LOWDAY":"$ 9,086.51",
            "OPEN24HOUR":"$ 9,649.99",
            "HIGH24HOUR":"$ 9,988.35",
            "LOW24HOUR":"$ 9,076.48",
            "LASTMARKET":"Bitfinex",
            "VOLUMEHOUR":"Ƀ 2,210.51",
            "VOLUMEHOURTO":"$ 21,755,061.3",
            "OPENHOUR":"$ 9,692.20",
            "HIGHHOUR":"$ 9,943.53",
            "LOWHOUR":"$ 9,663.39",
            "TOPTIERVOLUME24HOUR":"Ƀ 101,424.5",
            "TOPTIERVOLUME24HOURTO":"$ 966,363,837.9",
            "CHANGE24HOUR":"$ 235.12",
            "CHANGEPCT24HOUR":"2.44",
            "CHANGEDAY":"$ 461.67",
            "CHANGEPCTDAY":"4.90",
            "SUPPLY":"Ƀ 17,823,212.0",
            "MKTCAP":"$ 176.18 B",
            "TOTALVOLUME24H":"Ƀ 720.08 K",
            "TOTALVOLUME24HTO":"$ 7.08 B",
            "TOTALTOPTIERVOLUME24H":"Ƀ 425.38 K",
            "TOTALTOPTIERVOLUME24HTO":"$ 4.17 B",
            "IMAGEURL":"/media/19633/btc.png"
         }
      }
   }
}


*/

```

#### 2 -  Get Single price response (Single Ftsym only)

```
const { MKT } = require('@mkt-eg/mkt')

const mkt = new MKT(
  'bbbc22c3a13c74456a6d4bb7ba5745476ebfdc81c867fc240258122b78eb6a6f'
)
const data = mkt
  .exchange({
    fsym: 'BTC', // Single Fysm only 
    tsyms: 'USD,EGP', // Multiaple Tsyms is allowed
    type: 'single'
  })
  .then(response => {
    console.log(JSON.stringify(response.data))
  })
  .catch(error => {
    console.log(error)
  })

// JSON OUTPUT 

{
   "USD":9888.01,
   "EGP":182256.26
}

```

#### 3 -  Get Multiaple price response 

```
const { MKT } = require('@mkt-eg/mkt')

const mkt = new MKT(
  'bbbc22c3a13c74456a6d4bb7ba5745476ebfdc81c867fc240258122b78eb6a6f'
)
const data = mkt
  .exchange({
    fsym: 'BTC,ETH', // Single Fysm only 
    tsyms: 'USD,EGP', // Multiaple Tsyms is allowed
    type: 'multi'
  })
  .then(response => {
    console.log(JSON.stringify(response.data))
  })
  .catch(error => {
    console.log(error)
  })

// JSON OUTPUT 

{
   "BTC":{
      "USD":9906.65,
      "EGP":182256.26
   },
   "ETH":{
      "USD":215.27,
      "EGP":3964.07
   }
}

```


#### 3 - Historical Day/hour/minute OHLCV
Get open, high, low, close, volumefrom and volumeto from the daily historical data.The values are based on 00:00 GMT time. It uses BTC conversion if data is not available because the coin is not trading in the specified currency. If you want to get all the available historical data, you can use limit=2000 and keep going back in time using the toTs param. You can then keep requesting batches using: &limit=2000&toTs={the earliest timestamp received}.

 * apiType parms : 'day' or 'hour' or 'minute'
 * you can left some parameter empty its okay 
 * to know more about Request Params please read [Here](https://min-api.cryptocompare.com/documentation?key=Historical&cat=dataHistoday) 

```
const MKT = new module.exports.MKT('bbbc22c3a13c74456a6d4bb7ba5745476ebfdc81c867fc240258122b78eb6a6f')
MKT.historical({
  sympolPrice: 'true',
  e: 'CCCAGG',
  fsym: 'BTC',
  tsyms: 'USD',
  type: 'single',
  aggregate: '1',
  aggregatePredictableTimePeriods: true,
  limit: 100,
  allData: 'false',
  extraParams: 'NotAvailable',
  sign: 'false',
  apiType: 'hour'
}).then((results)=>{
 console.log(results.data)
})

// JSON OUTPUT 
/*
{
   "Response":"Success",
   "Type":100,
   "Aggregated":false,
   "Data":[
      {
         "time":1563526800,
         "close":10358.27,
         "high":10406.85,
         "low":10277.92,
         "open":10376.84,
         "volumefrom":2507.84,
         "volumeto":25941945.52
      },
      {
         "time":1563530400,
         "close":10342.75,
         "high":10402.72,
         "low":10271.27,
         "open":10358.27,
         "volumefrom":2464.21,
         "volumeto":25476339.6
      },
      {
         "time":1563534000,
         "close":10297.03,
         "high":10412.81,
         "low":10287.51,
         "open":10342.75,
         "volumefrom":2049.12,
         "volumeto":21172424.41
      },
      {
         "time":1563537600,
         "close":10506.18,
         "high":10654.99,
         "low":10234.52,
         "open":10297.03,
         "volumefrom":5671.63,
         "volumeto":59565785.39
      },
      {
         "time":1563541200,
         "close":10319.53,
         "high":10510.44,
         "low":10135.16,
         "open":10506.18,
         "volumefrom":7043.95,
         "volumeto":72409649.25
      },
      {
         "time":1563544800,
         "close":10341.37,
         "high":10425.08,
         "low":10284.69,
         "open":10319.53,
         "volumefrom":1326,
         "volumeto":13724171.79
      }
   ],
   "TimeTo":1563544800,
   "TimeFrom":1563526800,
   "FirstValueInArray":true,
   "ConversionType":{
      "type":"direct",
      "conversionSymbol":""
   },
   "RateLimit":{

   },
   "HasWarning":false
}

*/

```




## Some of the ideas I put forward and you can get started:
- Add processing of natural languages to increase confidence in prices that have been predicted 
- Add simulation of the investment process and the development of some strategies of trades.
- Monitor the markets and manufacture a global dashboard.
- add simples and examples using MKT.JS


## contributions
- For the first contributor you can delete the file and be the first shareholder (I left it to you)
- For the rest, if you think of an idea, you should make pull request and apply it immediately.


Author : Loaii abdalslam 

