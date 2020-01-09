const express = require('express');
const request = require('request');
const bodyParser = require('body-parser'); 
const app = express();
const port = 8081; 

// Set up mongoose connection
var mongoose = require('mongoose');
var dev_db_url = process.env.mongo_url;
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var techdebt = require('./routes/techdebt'); 

require('dotenv').config();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use('/techdebt', techdebt);

app.listen(process.env.PORT || port, () =>  {
	console.log(`App listening on port ${port}!`)
});


