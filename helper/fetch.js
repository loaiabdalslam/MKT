const axios = require("axios");

module.exports = {
  get: (link) => {
    return new Promise((resolve, reject) => {
      // Make a request for a user with a given ID
      axios
        .get(link)
        .then((response) => {
          // handle success
          resolve(response)
        }).catch((error) => {
          // handle error
          reject(error)
        })
    })
  }
}
