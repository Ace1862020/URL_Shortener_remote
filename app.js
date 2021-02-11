const express = require('express')
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const ShortUrl = require('./models/shortUrl')
const generateShortUrl = require('./public/generateShortUrl')

const routes = require('./routes')


const PORT = 3000
const app = express()

// 使用 handlebars，main 為預設布局
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

// 自訂 helper
Handlebars.registerHelper('ifEqual', function (status, outputStatus, options) {
  if (status === outputStatus) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
})

// mongoose 連線 MongoDB 設定
mongoose.connect('mongodb://localhost/url-shortener', { useNewUrlParser: true, useUnifiedTopology: true })
// 暫存連線狀態
const db = mongoose.connection
// 連線失敗
db.on('error', () => {
  console.log('MongoDB error!!!')
})
// 連線成功
db.once('open', () => {
  console.log('MongoDB connected!!!')
})

app.use(routes)

// 首頁路由



// 啟動伺服器
app.listen(PORT, () => {
  console.log(`App server running on http://localhost:${PORT}`)
})