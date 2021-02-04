const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const PORT = 3000

const app = express()

mongoose.connect('mongodb://localhost/url-shortener', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('MongoDB error!!!')
})

db.once('open', () => {
  console.log('MongoDB connected!!!')
})

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.listen(PORT, () => {
  console.log(`App server running on ${PORT}`)
})