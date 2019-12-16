const express = require('express');
const request = require('request');
const bodyParser = require('body-parser'); 
const app = express();
const port = 8080; 

// Set up mongoose connection
/**var mongoose = require('mongoose');
var dev_db_url = process.env.mongo_url;
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
*/

var TechDept = require('./techdebt');


require('dotenv').config();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.listen(process.env.PORT || port, () =>  {
	console.log(`App listening on port ${port}!`)
});

app.get('/', (req, res) => {
	console.log(req.query);   
	console.log(process.env.PATH);
    res.send('Welcome')
});

app.post('/process', (req, res) => {
	console.log(req.body); 
	saveData(req.body);
	res.send('done')
});

function showDialogInMM(req, res) {
	let trigger_id = req.body.trigger_id;
	let user_name = req.body.user_name;
	let mm_server_url = process.env.mm_server_url
	let mm_app_url = process.env.mm_app_url
	
	request.post({
		'headers': { 'content-type': 'application/json' },
		'url' : mm_server_url, 
		'body': JSON.stringify({
			'trigger_id':trigger_id,
			   'url': mm_app_url,
			   'dialog':{
				  'callback_id':'somecallbackid',
				  'title':'Technical Depts',
				  'icon_url':'http://www.mattermost.org/wp-content/uploads/2016/04/icon.png',
				  'elements':[
					 {
						'display_name':'Project',
						'name':'project',
						'type':'text',
						'subtype':'',
						'default': 'TUCI',
						'optional':false,
						'min_length':0,
						'max_length':0,
						'data_source':'',
						'options':null
					 },
					 {
						'display_name':'Technical Depts',
						'name':'techDebts',
						'type':'textarea',
						'subtype':'',
						'default':'',
						'placeholder':'placeholder',
						'help_text':'',
						'optional':false,
						'min_length':5,
						'max_length':1000,
						'data_source':'',
						'options':null
					 },
					
				  ],
				  'submit_label':'Submit',
				  'notify_on_cancel':true,
				  'state':'somestate'
			   }
		})
	},(error, response, body) => {
		if(error) {
			res.send(error)
		}
		console.log(body);
		res.send('Done')
	});
}

function saveData(body) {
	var techdept = new TechDept (
		{
			username: body.user_id,
			project: body.submission.project,
			details: 'details'
		}
	);
	
	console.log('techdept ' + techdept);
	try {
	techdept.save(function (err) {
		console.log(err);
        if (err) {
			console.log(err);
            return next(err);
        }
        console.log('TechDept Created successfully')
    });
	} catch(e) {
		  console.log(e);
	}
	console.log('Try')
}

app.post('/show', (req, res) => {
	console.log(req.body);  
    showDialogInMM(req, res);
    
});
