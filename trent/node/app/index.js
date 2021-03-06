// app/index.js

const path = require('path')

const express = require('express')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const config = require('../config')
const app = express()

require('./authentication').init(app)

app.use(session({     // what is session?
  store: new RedisStore({
    url: config.redisStore.url
  }),
  secret: config.redisStore.secret,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.engine('.hbs', exphbs({
  defaultLayout: 'layout',
  extname: '.hbs',
  layoutsDir: path.join(__dirname),
  partialsDir: path.join(__dirname)
}))

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname))

require('./user').init(app)

module.exports = app
