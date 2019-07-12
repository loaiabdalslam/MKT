const axios = require('axios');


module.exports = {




  /*
  ## Single Symbol Price @type : single
  Get the current price of any cryptocurrency in any other currency that you need.
  If the crypto does not trade directly into the toSymbol requested, BTC will be used for conversion. 
  If the opposite pair trades Wwe invert it (eg.: BTC-XMR)

  ## Multiple Symbols Price  @type : multi
  Same as single API path but with multiple from symbols.

  ## Multiple Symbols Full Data  @type : full
  Get all the current trading info (price, vol, open, high, low etc) of any list of cryptocurrencies in any other currency that you need. If the crypto does not trade directly into the toSymbol requested, BTC will be used for conversion.

  This API also returns Display values for all the fields. If the opposite pair trades we invert it (eg.: BTC-XMR)


   */
  sympolPrice :function({
    fsym = 'BTC',
    tsyms = 'USD',
    type = 'single'
  }) {
    let queryType = type == 'single' ? `price?fsym=${fsym}` :
      type == 'multi' ? `pricemulti?fsyms=${fsym}` :
      type == 'full' ? `pricemultifull?fsyms=${fsym}` :
      'error'
    let params = `${queryType}&tsyms=${tsyms}&`
    return params;



  }



}