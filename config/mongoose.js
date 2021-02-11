const mongoose = require('mongoose')
const db = mongoose.connection // 暫存連線狀態

// mongoose 連線 MongoDB 設定
mongoose.connect('mongodb://localhost/url-shortener', { useNewUrlParser: true, useUnifiedTopology: true })
// 連線失敗
db.on('error', () => {
  console.log('MongoDB error!!!')
})
// 連線成功
db.once('open', () => {
  console.log('MongoDB connected!!!')
})

module.exports = db