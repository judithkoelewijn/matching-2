/* Defining constants and variables */ 

const express = require('express')
const res = require('express/lib/response')
const app = express()
const port = 3000
app.set('view engine', 'ejs')

const user = {
    firstName: 'Judith',
    lastName: 'Koelewijn',
}
app.get('/', (req, res) => {
    res.render('pages/index', {
        user: user
    })
})

app.get('/about', (req, res) => {
   res.render('pages/about', {
       user: user
   })
})


/* Middleware */ 

 app.use(express.static('public'))


/* If no routes give response, change route to 404 page (state) */ 
app.use( (req, res) => {
    res.status(404).render('pages/404')
})


/* Start webserver */ 

 app.listen(port, () => {
   console.log(`web server  running on http://localhost:${port}`)
 })
 