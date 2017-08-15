// app/authenticate/init.js

const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy

const authenticationMiddleware = require('./middleware')

const user = {
  username: 'test-user',
  passwordHash: 'bcrypt-hashed-password',
  id: 1
}

function initPassport () {
  passport.use(new LocalStrategy(
    (username, password, done) => {
      findUser(username, (err, user) => {
        if (err) {
          return done(err)
        }

        // User is not found
        if (!user) {
          return done(null, false)
        }

        bcrypt.compare(password, user.passwordHash,
          (err, isValid) => {
            if (err) {
              return done(err)
            }
            if (!isValid) {
              return done(null, false)
            }
            return done(null, user)
          })
      })
    }
  )
  )
  passport.authenticationMiddleware = authenticationMiddleware
}

module.exports = initPassport
