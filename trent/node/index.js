// index.js

'use strict'

const express = require('express')
const bodyParser = require('body-parser');
const app = express()

const pg = require('pg')
const conString = 'postgres://minsik:testpass@localhost/node_hero'

// pg.connect(conString, function (err, client, done) {
//   if (err) {
//     return console.error('error fetching client from pool', err)
//   }
//   client.query('SELECT $1::varchar AS my_first_query',
//     ['node hero'], function(err, result) {
//       done()
//
//       if (err) {
//         return console.error('error happend during query', err)
//       }
//       console.log(result.rows[0])
//       process.exit(0)
//     })
// })

app.use(bodyParser.json());

// curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "Trent", "age": "17"}'

app.post('/users', function (req, res, next) {
  const user = req.body

  pg.connect(conString, function (err, client, done) {
    if (err) {
      // error passed to express error handler
      return next(err)
    }
    client.query(
      'INSERT INTO users (name, age) VALUES ($1, $2);',
      [user.name, user.age], function (err, result) {
        done() // signalling that connection can be closed

        if (err) {
          return next(err)
        }

        res.send(200)
      }
    )
  }
  )
})
app.get('/users', function (req, res, next) {
  pg.connect(conString, function (err, client, done) {
    if (err) {
      return next(err)
    }
    client.query('SELECT name, age FROM users;', [],
      function (err, result) {
        done()

        if (err) {
          // error passed to express error handler
          return next(err)
        }

        res.json(result.rows)
      })
  })
})
app.listen(3000)
