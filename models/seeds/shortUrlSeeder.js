const mongoose = require('mongoose')
const shortUrl = require('../shortUrl')
const urlData = require('../../public/shortenerUrl.json')
const db = require('../../config/mongoose')

db.once('open', () => {

  urlData.links.forEach(item => {
    shortUrl.create({
      "hostUrl": item.hostUrl,
      "shortUrl": item.shortUrl
    })
  })
  console.log('urlData update done!')

})