const express = require('express')
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
const bodyParser = require('body-parser')

// 引用：路由模組
const routes = require('./routes')
// 引用並執行 mongoose 檔案
require('./config/mongoose')

// 在 Heroku 環境就使用 process.env.PORT 否則在本地環境使用3000
const PORT = process.env.PORT || 3000
const app = express()

// 使用 handlebars，main 為預設布局
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 使用 body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// 自訂 Handlebars helper
Handlebars.registerHelper('ifEqual', function (status, outputStatus, options) {
  if (status === outputStatus) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
})

// 使用路由模組
app.use(routes)

// 設定應用程式監聽連接埠號
app.listen(PORT, () => {
  console.log(`App server running on http://localhost:${PORT}`)
})