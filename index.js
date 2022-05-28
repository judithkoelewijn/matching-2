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
const { match, notDeepEqual } = require('assert');
app.set('view engine', 'ejs')

/* by defining let db = null at start scope, it can be used outside of the function scope of async home route */ 

let db = null; 


/* Middleware (serving static files in Express, urlencoded express) */ 


app.use('/public', express.static('public'));

app.use(express.static('public'))

app.use(express.json());
app.use(express.urlencoded({extended: true}))


/* add new data to collection, then console.log the new test collection (which is updated) */ 

app.get('/', async (req, res) => {
    res.render('pages/index');
 
});


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
 
 


 app.get('/results', async (req, res) => {
    // const match = await db.collection('test').find({location:"test location3"}).toArray();
 
    const lastUser = await
    db.collection('test').findOne(
       {},
       { sort: { _id: -1 } });
 
    const match = await db.collection('test').find( { $and: [ { _id: { $ne: lastUser._id } }, { location: { $eq: lastUser.location } } ] } ).toArray();
  

    console.log("match", match);
   

    res.render('pages/results', {
        match: match 
    
      });

 })


 app.get('/profile', async (req, res) => {

    const lastUser = await
    db.collection('test').findOne(
       {},
       { sort: { _id: -1 } });

    res.render('pages/profile', {
        user: lastUser
    })
 })


 app.post('/profile', async  (req, res) => {
    // add new user from index.ejs form // 
    let updatedUser = {
        location: req.body.newLocation
       
    };

    const lastUser = await
    db.collection('test').findOne(
       {},
       { sort: { _id: -1 } });


  /* new update test code */ 

   const newUpdated =  db.collection('test').update(
    {  _id: { $eq: lastUser._id } },
    { $set: { location : updatedUser.location } }
 );
   
    res.redirect('/profile-changed');
   
});


app.get('/profile-changed', async (req, res) => {

    const lastUser = await
    db.collection('test').findOne(
       {},
       { sort: { _id: -1 } });

    res.render('pages/profile-changed', {
        user: lastUser
    })
 })
 





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
