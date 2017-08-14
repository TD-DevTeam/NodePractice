// index.js

const request = require('request-promise')

const options = {
  method: 'GET',
  uri: 'https://risingstack.com',
  json: true,
  qs: {
    limit: 10,
    skip: 20,
    sort: 'asc'
  },
  headers: {
    'User-Agent': 'Request-Promise',
    'Authorization': 'Basic QWxhZGRpbjpPcGVuU2VzYW1l'
  }
}
// https://risingstack.com?limit=10&skip=20&sort=asc

request(options)
  .then(function (response) {
    // Successful request
    console.log(response)
  })
  .catch(function (err) {
    // Error handling
    console.log(err)
  })
