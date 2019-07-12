const {
	sympolPrice
} = require('./price');
const {
	get
} = require('./fetch');
const link = 'https://min-api.cryptocompare.com/data/';

module.exports = {

	MKT: function(api) {
		// This Function for initialize the api 
		this.apikey = () => {
			return `apikey=${api}`
		}

		// this Function for initialize the query
		this.price = (dict) => {
			return sympolPrice(dict)

		}

		// this Function fireup exchange query for make request using your api and your query and return promise reponse
		// you can access reponse data with then((response)=>Json.stringify(response.data))
		/
		this.exchange = (dict) => {
			let request = link + this.price(dict) + this.apikey()
			return get(request);
		}


	}

}

/*

For Test Purpose :-

let MKT = new module.exports.MKT('bbbc22c3a13c74456a6d4bb7ba5745476ebfdc81c867fc240258122b78eb6a6f')
// console.log(link+priceFunction+api)
let data = MKT.exchange({
	fsym: 'BTC,ETH',
	tsyms: 'USD,EGP,SAR',
	type: 'full'
}).then((response) => {
	console.log(JSON.stringify(response.data))
}).catch((error) => {
	console.log(error)
})



 */