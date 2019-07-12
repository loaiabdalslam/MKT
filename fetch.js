const axios = require('axios');

module.exports = {

	get: function(link) {
 return new Promise((resolve,reject)=>{

		// Make a request for a user with a given ID
		axios.get(link)
			.then(function(response) {
				// handle success
				resolve(response);
			}).catch(function(error) {
				// handle error
				reject(error)
			});

	 })

}

}