// index.js

const express = require('express')
const path = require('path');
const rp = require('request-promise')
const exphbs = require('express-handlebars')

const app = express()

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.get('/:city', (req, res) => {
  rp({
    uri: 'http://dataservice.accuweather.com/locations/v1/cities/search',
    qs: {
      q: req.params.city,
      apikey: 'UfkPMYB39V6oiv31ZhzATqiiUwQWqZUV'
         // Use your accuweather API key here
    },
    json: true
  })
    .then((data) => {
      console.log(data)
      const jsonObj = data[0]
      console.log(jsonObj.LocalizedName)
      res.render('index', {city: jsonObj.LocalizedName, rank:jsonObj.Rank})
      // TODO : Make this work
    })
    .catch((err) => {
      console.log(err)
      res.render('error')
    })
})

app.listen(3000)
