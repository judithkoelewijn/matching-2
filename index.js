/* Defining constants and variables */ 

const express = require('express')
const res = require('express/lib/response')
const app = express()
const port = 3000
const path = require("path")
app.set('view engine', 'ejs')

/* middleware */ 

app.use('/public', express.static('public'));

const user = {
    firstName: 'Judith',
    lastName: 'Koelewijn',
}

/* Basic routing: determining how an application responds to a client request */ 

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


app.get('/login', (req, res) => {
    res.render('pages/login', )
 })
 

 app.get('/profile', (req, res) => {
    res.render('pages/profile', {
        user: user
    })
 })

 app.get('/results', (req, res) => {
    res.render('pages/results', )
 })

/* Middleware (serving static files in Express) */ 

app.use(express.static('public'))


/* If no routes give response, change route to 404 page (instead of 404 state) */ 

app.use( (req, res) => {
    res.status(404).render('pages/404')
})


/* Start webserver */ 

 app.listen(port, () => {
   console.log(`web server is running on http://localhost:${port}`)
 })
 

