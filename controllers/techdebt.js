var TechDebt = require('../models/techdebt');
const request = require('request');


//Simple version, without validation or sanitation
exports.ping = function (req, res) {
    res.send('Ping Success! ' + new Date());
};


exports.show = function (req, res) {
	console.log(req.body);  
    showDialogInMM(req, res);
};


exports.create = function (req, res) {
	console.log(req.body); 
	
	var techdeptdata = new TechDebt (
		{
			username: req.body.submission.username,
			project: req.body.submission.project,
			details: req.body.submission.details,
			time: new Date()
		}
	);
	
	console.log('techdept ' + techdeptdata);
	techdeptdata.save(function (err, techdept) {
		console.log('inserting');
        if (err) {
			console.log(err);
            return next(err);
        }
        console.log('TechDept Created successfully')
    });
	console.log('saveData done')
	
	res.send('TechDept Created successfully')
};

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
						'display_name':'User Name',
						'name':'username',
						'type':'text',
						'subtype':'',
						'default': user_name,
						'optional':false,
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
						'name':'details',
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
