const SECS_IN_DAY = 86400

function convertPriceArrayToMap (priceArray) {
  const map = new Map()
  for (var price of priceArray) {
    const time = secsToDate(price.time)
    map.set(startOfDay(time).valueOf(), Object.assign({}, price, { time }))
  }
  return map
}

// simple linear interpolation
function getPriceFromOHLC (priceData, time) {
  const { open, /* high, low, */ close } = priceData

  const startTime = startOfDay(time)
  const diffSecs = (time - startTime) / 1000

  const diffPrice = close - open
  const price = (diffPrice * diffSecs / SECS_IN_DAY) + open

  return price
}

function cloneDate (date) {
  return new Date(date.getTime())
}

function secsToDate (secs) {
  return new Date(secs * 1000)
}

// return UTC start of day
function startOfDay (date) {
  let cd = cloneDate(date)
  cd.setUTCHours(0, 0, 0, 0)
  return cd
}

module.exports = {
  convertPriceArrayToMap,
  getPriceFromOHLC,
  startOfDay
}