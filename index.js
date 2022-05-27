/* Defining constants and variables */ 

const express = require('express')
const res = require('express/lib/response')
const app = express()
const port = 1234;
const path = require("path")
const arrayify = require('arrayify');
const dotenv = require('dotenv').config();
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const { last } = require('lodash');
const { match } = require('assert');
app.set('view engine', 'ejs')

/* by defining let db = null at start scope, it can be used outside of the function scope of async home route */ 

let db = null; 


/* Middleware (serving static files in Express, urlencoded express) */ 


app.use('/public', express.static('public'));

app.use(express.static('public'))

app.use(express.json());
app.use(express.urlencoded({extended: true}))


/* Basic routing: determining how an application responds to a client request */ 


/* add new data to collection, then console.log the new test collection (which is updated) */ 

app.get('/', async (req, res) => {
    db.collection('test').insertOne({ name: "test user3", location: "test location3", interest:"backend3" });
    const test = await db.collection('test').find({}).toArray();
    res.render('pages/index', {test});
    // console.log(test);

});

/* 
app.post('/', (req,res) => {
 console.log(req.body);

 
}) */ 

app.post('/', async (req, res) => {
    // add new user from index.ejs form // 
    let newUser = {
        name: req.body.name,
        location: req.body.location, 
        interest: req.body.interest,
        time: req.body.time
    };

    await db.collection('test').insertOne(newUser);
    res.redirect('/results');
});



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

 app.get('/results', async (req, res) => {
    // const match = await db.collection('test').find({location:"test location3"}).toArray();
 
    const lastUser = await
    db.collection('test').findOne(
       {},
       { sort: { _id: -1 } });

    // const beter = await db.collection('test').find({$where: match.location == lastUser.location});
    

    // console.log("hier console log ik de output van de match:", match);
    console.log("lsatUser", lastUser);
    console.log("lastuser Location:",lastUser.location);
    
    const match = await db.collection('test').find({location:lastUser.location}).toArray();
    
    const notEq = await db.collection('test').find( { _id: { $ne: lastUser._id } } ).toArray();
    
    

  
    console.log("match", match);
    console.log("niet gelijk aan", notEq);


    /* test code */ 

 
    
    // console.log("dit zou de match moeten zijn", match);
  
    res.render('pages/results', {
        match: match 
    
      });

 })





/*  const lastUser = await db.collection('test').find({_id:-1}).limit(1); */ 


/* If no routes give response, change route to 404 page (instead of 404 state) */ 

app.use( (req, res) => {
    res.status(404).render('pages/404')
})


/* connect with async function to mongodb database */ 

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

/* listen to correct port, connect and console log when connection is succesfull */ 


app.listen(port, () => {
    console.log(`web server  running on http://localhost:${port}`)
    console.log(process.env.TESTVAR)

    connectDB().then(console.log("We have a connection to mongo!!"))

  });
