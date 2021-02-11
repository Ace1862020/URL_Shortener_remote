const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const shortens = require('./modules/shortens')

router.use('/', home)
router.use('/shorten', shortens)

module.exports = router