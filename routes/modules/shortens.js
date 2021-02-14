// 引用：Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引用：ShortUrl model
const ShortUrl = require('../../models/shortUrl')

// 引用：產生隨機5碼英數的function
const generateShortUrl = require('../../public/generateShortUrl')

// 判斷當前環境，如果在 Heroku 環境就使用 : 左邊，否則就使用 : 右邊
const HostLink = process.env.PORT ? 'https://stormy-journey-71059.herokuapp.com/shorten/' : 'http://localhost:3000/shorten/'

// 當 shorten(button) submit
router.post('/', (req, res) => {
  // 先從 body 取得表單的資料(以下稱為 bodyData)
  const bodyData = req.body
  // 把當前環境解析結果新增到"body表單資料"
  bodyData.HostLink = HostLink
  let shortUrl = ''

  // 如果 bodyData 的 hostUrl 不是空的，且有包含 http，就執行
  if (bodyData.hostUrl !== '' && bodyData.hostUrl.includes('http')) {
    // 從 Database 尋找與 bodyData 裡相同的 hostUrl 
    ShortUrl.find({ hostUrl: bodyData.hostUrl })
      .lean() // 把 Mongoose 的 Model 物件，轉成乾淨的 JavaScript 資料
      .then((url) => {
        // 然後如果有取得一樣的 hostUrl，就取出當筆資料的 shortUrl 給 bodyData
        // 包含新增一個成功的狀態給 bodyData，一起 render 到 shorten Page
        if (url.length !== 0) {
          bodyData.shortUrl = url[0].shortUrl
          bodyData.status = 'success'
          return res.render('shorten', { bodyData: bodyData })
        } else {
          // 如果沒有一樣的 hostUrl，就"隨機產生5碼英數組合"給 shortUrl
          shortUrl = generateShortUrl()
          // 尋找 Database 裡面的 shortUrl
          ShortUrl.find({ shortUrl: shortUrl })
            .lean()
            .then((urls) => {
              // 然後這裡有取得 shortUrl 表示有重複的 shortUrl
              // 括號內為 true 就執行
              while (urls.length !== 0) {
                // 重新"隨機產生5碼英數組合"
                shortUrl = generateShortUrl()
              }
              // Database 沒有一樣的 shortUrl 就新增一筆資料
              ShortUrl.create({
                hostUrl: bodyData.hostUrl, // hostUrl：bodyData 取得的 hostUrl
                shortUrl: shortUrl // shortUrl:隨機產生的5組英數組合
              }).then(() => {
                // 然後將成功的狀態，產生的shortUrl，新增到 bodyData 裡
                // 一起 render 給 shorten Page
                bodyData.status = 'success'
                bodyData.shortUrl = shortUrl
                return res.render('shorten', { bodyData })
              })
            }) // 錯誤處理
            .catch((error) => { console.log(error) })
        }
      }) // 錯誤處理
      .catch((error) => console.log(error))

    // 只要 bodyData 的 hostUrl 是空的，或沒有有包含 http
    // 都直接執行 'failure' 的結果
  } else {
    bodyData.status = 'failure'
    res.render('shorten', { bodyData })
  }
})

// 短網址對應路由
router.get('/:shortUrl', (req, res) => {
  // 取得 shortName
  const shortUrl = req.params.shortUrl
  // 從資料庫找到特定的 shortName
  return ShortUrl.findOne({ shortUrl: shortUrl })
    .lean()
    // 使用取得的資料重新導向，hostName 的 Value
    .then((url) => { res.redirect(url.hostUrl) })
    .catch((error) => console.log(error))
})

// 匯出路由器模組
module.exports = router