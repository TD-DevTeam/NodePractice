var express = require('express');
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
    res.send('GET request to the homepage');
});

// POST method route
app.post('/', function(req, res) {
    res.send('POST request to the homepage');
});

app.get('/example/a', function(req, res) {
    res.send('Hello from A!');
});

app.get('/example/b', function(req, res, next) {
    console.log('the response will be sent by the next function ...');
    next();
}, function(req, res) {
    res.send('Hello from B!');
});

var cb0 = function(req, res, next) {
    console.log('CB0');
    next();
}

var cb1 = function(req, res, next) {
    console.log('CB1');
    next();
}

var cb2 = function(req, res) {
    res.send('Hello from C!');
}

app.get('/example/c', [cb0, cb1, cb2]);

app.get('/example/d', [cb0, cb1], function(req, res, next) {
    console.log('thre response will be sent by the next function ...');
    next();
}, function(req, res) {
    res.send('Hello from D!');
});

app.route('/book')
    .get(function(req, res) {
    res.send('Get a random book');
    })
    .post(function(req, res) {
        res.send('Add a book');
    })
    .put(function(req, res) {
        res.send('Update the book');
    });

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
