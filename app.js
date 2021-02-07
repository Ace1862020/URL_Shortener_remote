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

app.post('/', (req, res) => {
  // 從 body 取得資料，存進 option 
  const option = req.body
  option.status = 'success'
  // 從資料庫找有沒有與 option.hostName 重複的 hostName
  ShortUrl.findOne({ hostName: option.hostName })
    .lean() // 轉換成乾淨的 JavaScript 資料
    .then((url) => {
      if (url) {
        // 如果 hostName 有符合，就取出同物件中的 shortName
        option.shortName = url.shortName
        return res.render('index', { option })
      } else {

        let shortName = generateShortUrl()
        // 從資料庫中取出所有資料
        ShortUrl.find()
          // 找出有沒有重複的 shortName
          .then((url) => {
            while (url.find((item) => {
              item.shortName === shortName
            })) {
              // 重新再隨機取一組 shortName
              shortName = generateShortUrl()
            }
          })

        // 沒有重複的 shortName 就寫入資料
        ShortUrl.create({
          hostName: option.hostName,
          shortName: shortName
        })
          // 寫入資料後，設定 shortName ，渲染到 index
          .then(() => {
            option.shortName = shortName
            return res.render('index', { option })
          }) // 錯誤處理
          .catch((error) => console.log(error))
      }
    })
    .catch((error) => console.log(error))
})

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`App server running on http://localhost:${PORT}`)
})