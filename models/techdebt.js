var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TechDeptSchema = new Schema({
    username: {type: String, required: true, max: 100},
    project: {type: String, required: true, max: 100},
	details: {type: String, required: true, max: 100},
	time: {type: Date, required: true}
});


// Export the model
module.exports = mongoose.model('TechDept', TechDeptSchema);