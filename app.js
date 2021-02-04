const express = require('express')
const exphbs = require('express-handlebars')
const PORT = 3000

const app = express()

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.listen(PORT, () => {
  console.log(`App server running on ${PORT}`)
})