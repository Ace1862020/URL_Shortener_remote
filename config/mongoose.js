const mongoose = require('mongoose')
const db = mongoose.connection // 暫存連線狀態
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/url-shortener'

// mongoose 連線 MongoDB 設定
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// 連線失敗
db.on('error', () => {
  console.log('MongoDB error!!!')
})
// 連線成功
db.once('open', () => {
  console.log('MongoDB connected!!!')
})

module.exports = db