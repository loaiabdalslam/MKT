module.exports = {

  historicalPrice: function ({
    sympolPrice = 'true',
    e = 'CCCAGG',
    fsym = 'BTC',
    tsym = 'USD',
    type = 'single',
    aggregate = '1',
    aggregatePredictableTimePeriods = true,
    limit = 100,
    allData = 'false',
    toTs = 5676767679200,
    extraParams = 'NotAvailable',
    sign = 'false',
    apiType = 'day'
  }) {
    const query = `?sympolPrice=${sympolPrice}&e=${e}&fsym=${fsym}&tsym=${tsym}&type=${type}&aggregate=${aggregate}&aggregatePredictableTimePeriods=${aggregatePredictableTimePeriods}&limit=${limit}&allData=${allData}&toTs=${toTs}&extraParams=${extraParams}&sign=${sign}`
    return query
  }
}
