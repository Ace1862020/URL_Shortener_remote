const express = require('express')
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
const bodyParser = require('body-parser')

const routes = require('./routes')
require('./config/mongoose')


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



app.use(routes)

// 首頁路由



// 啟動伺服器
app.listen(PORT, () => {
  console.log(`App server running on http://localhost:${PORT}`)
})