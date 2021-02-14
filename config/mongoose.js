const mongoose = require('mongoose')
const db = mongoose.connection // 暫存連線狀態

// 在 Heroku 環境就使用 process.env.MONGODB_URI
// 否則為本地環境，使用 mongodb://localhost/url-shortener
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

// 匯出資料庫連接狀態 db
module.exports = db