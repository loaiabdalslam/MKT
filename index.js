const { sympolPrice } = require('./module/price/price')
const { historicalPrice } = require('./module/historical/historical')
const { get } = require('./helper/fetch')

const link = 'https://min-api.cryptocompare.com/data/'
const data = {
  day: link + 'histoday',
  hour: link + 'histohour',
  minute: link + 'histominute'
}

module.exports = {
  MKT: function (api) {
    // This Function for initialize the api
    this.apikey = () => {
      return `&apikey=${api}`
    }
    // this Function fireup exchange query for make request using your api and your query and return promise reponse
    // you can access reponse data with then((response)=>Json.stringify(response.data))

    this.exchange = dict => {
      const requestLink = link + sympolPrice(dict) + this.apikey()
      return get(requestLink)
    }

    this.historical = dict => {
      const historicalType = data[dict.apiType]
      const requestLink = historicalType + historicalPrice(dict) + this.apikey()
      return get(requestLink)
    }
  }
}


