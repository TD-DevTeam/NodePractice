const request = require('request-promise')

const options = {
    method: 'GET',
    uri: 'https://risingstack.com',
    qs: {
        limit: 10,
        skip: 20,
        sort: 'asc'
    },
    headers: {
        'User-Agent': 'Request-Promise',
        'Authoroization': 'Basic QWxhZGRpbjpPcGVuU2VzYW1l'
    },
    body: {
        foo: 'bar'
    },
    json: true
    // JSON string files the body automatically
}

request(options).then(function (response) {
        // Request was successful, use the response object at will
    })
    .catch(function (err) {
        // Something bad happened, handle the error
    })
