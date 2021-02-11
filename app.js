const express = require('express')
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const ShortUrl = require('./models/shortUrl')
const generateShortUrl = require('./public/generateShortUrl')
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

// 路由
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/shorten', (req, res) => {
  // 從 body 取得資料，存進 option 
  //const bodyData = req.body
  //const hostUrl = bodyData.hostUrl
  const bodyData = req.body
  let shortUrl = ''

  if (bodyData.hostUrl !== '' && bodyData.hostUrl.includes('http')) {
    ShortUrl.find({ hostUrl: bodyData.hostUrl })
      .lean()
      .then((url) => {
        if (url.length !== 0) {
          bodyData.shortUrl = url[0].shortUrl
          bodyData.status = 'success'
          return res.render('shorten', { bodyData: bodyData })
        } else {
          //res.redirect('/')
          shortUrl = generateShortUrl()
          ShortUrl.find({ shortUrl: bodyData.shortUrl })
            .lean()
            .then((urls) => {
              while (urls.length !== 0) {
                shortUrl = generateShortUrl()
              }
              ShortUrl.create({
                hostUrl: bodyData.hostUrl,
                shortUrl: shortUrl
              }).then(() => {
                bodyData.status = 'success'
                bodyData.shortUrl = shortUrl
                return res.render('shorten', { bodyData })
              })
            })
            .catch((error) => { console.log(error) })
        }
      })
      .catch((error) => console.log(error))
  } else {
    bodyData.status = 'failure'
    res.render('shorten', { bodyData })
  }
})

// 短網址對應路由
app.get('/shorten/:shortUrl', (req, res) => {
  // 取得 shortName
  const shortUrl = req.params.shortUrl
  // 從資料庫找到特定的 shortName
  return ShortUrl.findOne({ shortUrl: shortUrl })
    .lean()
    // 使用取得的資料重新導向，hostName 的 Value
    .then((url) => { res.redirect(url.hostUrl) })
    .catch((error) => console.log(error))
})

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`App server running on http://localhost:${PORT}`)
})