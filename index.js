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
    res.send('Welcome')
});

app.post('/process', (req, res) => {
	console.log(req.body);  
	res.send('done')
});

app.post('/show', (req, res) => {
	console.log(req.body);  
    let trigger_id = req.body.trigger_id;
	
	request.post({
		'headers': { 'content-type': 'application/json' },
		'url' : 'http://adea2b8a.ngrok.io/api/v4/actions/dialogs/open', 
		'body': JSON.stringify({
			'trigger_id':trigger_id,
			   'url':'https://matermost-bot.herokuapp.com/process',
			   'dialog':{
				  'callback_id':'somecallbackid',
				  'title':'To Vinoth',
				  'icon_url':'http://www.mattermost.org/wp-content/uploads/2016/04/icon.png',
				  'elements':[
					 {
						'display_name':'Display Name',
						'name':'realname',
						'type':'text',
						'subtype':'',
						'default':'default text',
						'placeholder':'placeholder',
						'help_text':'This a regular input in an interactive dialog triggered by a test integration.',
						'optional':false,
						'min_length':0,
						'max_length':0,
						'data_source':'',
						'options':null
					 },
					 {
						'display_name':'Email',
						'name':'someemail',
						'type':'text',
						'subtype':'email',
						'default':'',
						'placeholder':'placeholder@bladekick.com',
						'help_text':'This a regular email input in an interactive dialog triggered by a test integration.',
						'optional':false,
						'min_length':0,
						'max_length':0,
						'data_source':'',
						'options':null
					 },
					 {
						'display_name':'Number',
						'name':'somenumber',
						'type':'text',
						'subtype':'number',
						'default':'',
						'placeholder':'',
						'help_text':'',
						'optional':false,
						'min_length':0,
						'max_length':0,
						'data_source':'',
						'options':null
					 },
					 {
						'display_name':'Display Name Long Text Area',
						'name':'realnametextarea',
						'type':'textarea',
						'subtype':'',
						'default':'',
						'placeholder':'placeholder',
						'help_text':'',
						'optional':true,
						'min_length':5,
						'max_length':100,
						'data_source':'',
						'options':null
					 },
					 {
						'display_name':'User Selector',
						'name':'someuserselector',
						'type':'select',
						'subtype':'',
						'default':'',
						'placeholder':'Select a user...',
						'help_text':'',
						'optional':false,
						'min_length':0,
						'max_length':0,
						'data_source':'users',
						'options':null
					 },
					 {
						'display_name':'Channel Selector',
						'name':'somechannelselector',
						'type':'select',
						'subtype':'',
						'default':'',
						'placeholder':'Select a channel...',
						'help_text':'Choose a channel from the list.',
						'optional':true,
						'min_length':0,
						'max_length':0,
						'data_source':'channels',
						'options':null
					 },
					 {
						'display_name':'Option Selector',
						'name':'someoptionselector',
						'type':'select',
						'subtype':'',
						'default':'',
						'placeholder':'Select an option...',
						'help_text':'',
						'optional':false,
						'min_length':0,
						'max_length':0,
						'data_source':'',
						'options':[
						   {
							  'text':'Option1',
							  'value':'opt1'
						   },
						   {
							  'text':'Option2',
							  'value':'opt2'
						   },
						   {
							  'text':'Option3',
							  'value':'opt3'
						   }
						]
					 }
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
