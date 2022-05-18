const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://user-judith:MongoDBpass@backendcluster.ruusk.mongodb.net/?retryWrites=true&w=majority')
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB
