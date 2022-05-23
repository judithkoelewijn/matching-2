/* Defining constants and variables */ 



const express = require('express')
const res = require('express/lib/response')
const app = express()
const port = 1234;
const path = require("path")
const dotenv = require('dotenv').config();
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
app.set('view engine', 'ejs')

let db = null; 



/* connect to db */ 



/* middleware */ 

app.use('/public', express.static('public'));

const user = {
    firstName: 'Judith',
    lastName: 'Koelewijn',
}

const mascots = [
    { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
    { name: 'Tux', organization: "Linux", birth_year: 1996},
    { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
  ];


const tagline = "No programming concept is complete without a cute animal mascot.";

  

/* Middleware (serving static files in Express) */ 

app.use(express.static('public'))

app.use(express.json());
app.use(express.urlencoded({extended: true}))





/* Basic routing: determining how an application responds to a client request */ 




app.get('/', async (req, res) => {
    
    const notes = await db.collection('notes').find({},{}).toArray();
    res.render('pages/index', {
        
    });

   
});




app.post('/', (req,res) => {
 console.log(req.body);

 
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




/* If no routes give response, change route to 404 page (instead of 404 state) */ 

app.use( (req, res) => {
    res.status(404).render('pages/404')
})


/*****************************************************
 * Connect to database
 ****************************************************/
 async function connectDB() {
    const uri = process.env.DB_URI;
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    try {
        await client.connect();
        db = client.db(process.env.DB_NAME);
    } catch (error) {
        throw error;
    }
}


/* Start webserver */ 


app.listen(port, () => {
    console.log(`web server  running on http://localhost:${port}`)
    console.log(process.env.TESTVAR)

    connectDB().then(console.log("We have a connection to mongo!!"))

  });

 

