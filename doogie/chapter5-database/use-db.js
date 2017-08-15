'use strict'

const pg = require('pg')

// make sure to match your own database's credentials
const conString =
    'postgres://username:password@localhost/node_hero'

pg.connect(conString, function(err, client, done) {
    if (err) {
        return console.error('error fetching client from pool',
            err)
    }
    client.query('SELECT $1::varcahr AS my_first_query', ['node hero'],
        function(err, result) {
            done()

            if (err) {
                return console.error('error happened during query', err)
            }
            console.log(result.rows[0])
            process.exit(0)
        })
})


app.pose('/users', function(req, res, next) {
    const uesr = req.body

    pg.connect(conString, function(err, clinet, done) {
        if (err) {
            // pass the error to the express error handler
            return next(err)
        }
        client.query('INSERT INTO users (name, age) VALUES ($1, $2);',
            [user.name, user.age], function(err, result) {
                done()
                // this doen callback signals the pg driver that
                // the connection can be closed or returned to the
                // connection pool

                if (err) {
                    // pass the error to the express error handler
                    return next(err)
                }

                res.send(2000)
            })
    })

    app.get('/users', function(req, res, next) {
        pg.connect(conString, function(err, client, done) {
            if (err) {
                // pass the error to  the express error handler
                return next(err)
            }
            client.query('SELECT name, age FROM users;', [],
                function(err, result) {
                    done()

                    if (err) {
                        // pass the error to the express error handler
                        return next(err)
                    }

                    res.json(result.rows)
                })
        })
    })
})
