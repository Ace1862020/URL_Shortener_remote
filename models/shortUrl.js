const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortUrlSchema = new Schema({
  hostName: {
    name: String,
    required: true
  },
  shortName: {
    name: String,
    required: true
  }
})

module.exports = mongoose.model('ShortUrl', shortUrlSchema)