const brain = require('brain.js')
const array = require('lodash/array');

module.exports = {
  // rawData = [{ open: number, high: number, low: number, close: number }]

  predict: function (options) {
  const  {rawData,chunkSize,forcastList,steps,NNOptions,trainOptions } = options
    this.scaleDown = step => {
      // normalize
      return {
        open: step.open / 138,
        high: step.high / 138,
        low: step.low / 138,
        close: step.close / 138
      }
    }

    this.scaleUp = step => {
      // denormalize
      return {
        open: step.open * 138,
        high: step.high * 138,
        low: step.low * 138,
        close: step.close * 138

      }
    }

    const scaledData = rawData.map(this.scaleDown)

    const trainingData = array.chunk(scaledData,chunkSize)
    const net = new brain.recurrent.LSTMTimeStep(NNOptions)

    net.train(trainingData,trainOptions)

    return net.forecast(forcastList,steps).map(this.scaleUp)

  }
}

let rawData =  [{"time":1561420800,"close":11740.34,"high":11778.22,"low":10992.37,"open":11035.74,"volumefrom":84123.73,"volumeto":953962631.15},{"time":1561507200,"close":12913.28,"high":13826.76,"low":11679.1,"open":11740.34,"volumefrom":211449.88,"volumeto":2685872365.1},{"time":1561593600,"close":11154.09,"high":13314.05,"low":10335.34,"open":12913.28,"volumefrom":202428.68,"volumeto":2345027203.81},{"time":1561680000,"close":12355.06,"high":12433,"low":10772.75,"open":11154.09,"volumefrom":120700.97,"volumeto":1408438810.31},{"time":1561766400,"close":11884.1,"high":12362.9,"low":11352.27,"open":12355.06,"volumefrom":81875.16,"volumeto":968516834.6},{"time":1561852800,"close":10769.05,"high":12200.02,"low":10677.83,"open":11884.1,"volumefrom":80893.36,"volumeto":917158052.37},{"time":1561939200,"close":10591.87,"high":11207,"low":10006.43,"open":10769.05,"volumefrom":115739.97,"volumeto":1225129699.57},{"time":1562025600,"close":10844.13,"high":10927.6,"low":9678.1,"open":10591.87,"volumefrom":120994.95,"volumeto":1239524970.43},{"time":1562112000,"close":11981.61,"high":12009.59,"low":10841.91,"open":10844.13,"volumefrom":115565.16,"volumeto":1313585829.89},{"time":1562198400,"close":11156.52,"high":12055.11,"low":11067.68,"open":11981.61,"volumefrom":71141.03,"volumeto":831236841.56},{"time":1562284800,"close":10993.25,"high":11435.38,"low":10787.94,"open":11156.52,"volumefrom":66066.75,"volumeto":734424868.07},{"time":1562371200,"close":11248.94,"high":11709.27,"low":10985.4,"open":10993.25,"volumefrom":48172.2,"volumeto":549769169.13},{"time":1562457600,"close":11474.28,"high":11605.43,"low":11109.42,"open":11248.94,"volumefrom":36847.21,"volumeto":418161890.29},{"time":1562544000,"close":12296.16,"high":12386.28,"low":11339.02,"open":11474.28,"volumefrom":63847.27,"volumeto":762033323.29},{"time":1562630400,"close":12567.02,"high":12808.06,"low":12117.31,"open":12296.16,"volumefrom":79607.47,"volumeto":993891866.34},{"time":1562716800,"close":12099.12,"high":13183.73,"low":11569.94,"open":12567.02,"volumefrom":124523.09,"volumeto":1554955347.89},{"time":1562803200,"close":11343.12,"high":12099.91,"low":11002.39,"open":12099.12,"volumefrom":102929.11,"volumeto":1185222449.66},{"time":1562889600,"close":11797.37,"high":11931.91,"low":11096.61,"open":11343.12,"volumefrom":55994.89,"volumeto":647690095.15},{"time":1562976000,"close":11363.97,"high":11835.87,"low":10827.53,"open":11797.37,"volumefrom":59187.84,"volumeto":668325183.28},{"time":1563062400,"close":10204.41,"high":11447.92,"low":10118.85,"open":11363.97,"volumefrom":76310.21,"volumeto":814667763.32},{"time":1563148800,"close":10850.26,"high":11070.18,"low":9877.02,"open":10204.41,"volumefrom":92742.77,"volumeto":965178341.63},{"time":1563235200,"close":9423.44,"high":11025.76,"low":9366.82,"open":10850.26,"volumefrom":113537.84,"volumeto":1140137759.72},{"time":1563321600,"close":9696.15,"high":9982.24,"low":9086.51,"open":9423.44,"volumefrom":101032.08,"volumeto":965256823.84},{"time":1563408000,"close":10638.35,"high":10776.54,"low":9292.61,"open":9696.15,"volumefrom":102443.07,"volumeto":1033842556.65},{"time":1563494400,"close":10532.94,"high":10757.41,"low":10135.16,"open":10638.35,"volumefrom":62995.33,"volumeto":658190962.53},{"time":1563580800,"close":10759.42,"high":11094.32,"low":10379.19,"open":10532.94,"volumefrom":56766.57,"volumeto":608954333.23},{"time":1563667200,"close":10586.71,"high":10833.99,"low":10329.89,"open":10759.42,"volumefrom":38379.41,"volumeto":405339891.1},{"time":1563753600,"close":10325.87,"high":10676.6,"low":10072.07,"open":10586.71,"volumefrom":50574.02,"volumeto":524442852.25},{"time":1563840000,"close":9854.15,"high":10328.44,"low":9820.61,"open":10325.87,"volumefrom":52754.02,"volumeto":529438124.08},{"time":1563926400,"close":9772.14,"high":9920.54,"low":9535.78,"open":9854.15,"volumefrom":54750.78,"volumeto":531611909.42},{"time":1564012800,"close":10105.32,"high":10157.07,"low":9744.7,"open":9772.14,"volumefrom":6928.33,"volumeto":69422103.87}]

// console.log(rawData.map((e)=>{console.log('okay',e)}))
console.log(module.exports.predict({
  rawData:rawData,
  chunkSize:5,
  forcastList:array.chunk(rawData,5)[3],
  steps:30,NNOptions:{},trainOptions:{}}))
