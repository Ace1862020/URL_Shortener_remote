const express = require('express')
const router = express.Router()

const ShortUrl = require('../../models/shortUrl')
const generateShortUrl = require('../../public/generateShortUrl')


router.post('/', (req, res) => {
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

module.exports = router