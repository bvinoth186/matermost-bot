const express = require('express');
const request = require('request');
const bodyParser = require('body-parser'); 
const app = express();
const port = 8080; 

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
	res.send('done')
});

app.post('/show', (req, res) => {
	console.log(req.body);  
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
						'display_name':'User Name',
						'name':'username',
						'type':'text',
						'subtype':'',
						'default': user_name,
						'optional':true,
						'min_length':0,
						'max_length':0,
						'data_source':'',
						'options':null
					 },
					 {
						'display_name':'Email',
						'name':'email;',
						'type':'text',
						'subtype':'email',
						'default':'',
						'placeholder':'admin@transunion.com',
						'help_text':'Input your TransUnion email address.',
						'optional':true,
						'min_length':0,
						'max_length':0,
						'data_source':'',
						'options':null
					 },
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
		var jsonContent = JSON.parse(body);
		
		console.log(jsonContent);
		res.send('Done')
	});
    
});
