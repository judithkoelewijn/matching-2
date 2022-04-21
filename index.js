// console log test terminal with node.js //

console.log("This is a test with my personal access token");

// test with Hello World //

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})