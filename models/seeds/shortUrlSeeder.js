const mongoose = require('mongoose')
const shortUrl = require('../shortUrl')
const urlData = require('../../public/shortenerUrl.json')

mongoose.connect('mongodb://localhost/url-shortener', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('MongoDB error!!!')
})

db.once('open', () => {
  console.log('MongoDB connected!!!')

  urlData.links.forEach(item => {
    shortUrl.create({
      "hostUrl": item.hostUrl,
      "shortUrl": item.shortUrl
    })
  })
  console.log('urlData update done!')
})