// Randomly generate elements 
function randomElements(collection) {
  let randomIndex = Math.floor(Math.random() * collection.length)
  return collection[randomIndex]
}

function generateShortUrl() {
  // define the elements of the short-url
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'

  // Create a collection to store random elements
  let collection = []
  collection = collection.concat([...lowerCaseLetters]).concat([...upperCaseLetters]).concat([...numbers])

  // start generating short-url
  let shortener = ''
  for (let i = 0; i < 5; i++) {
    shortener += randomElements(collection)
  }

  // return short-url
  return shortener
}

// Export generateShortUrl function for other files to use
module.exports = generateShortUrl


