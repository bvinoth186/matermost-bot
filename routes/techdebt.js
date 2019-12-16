var express = require('express');
var router = express.Router();


var techdebt_controller = require('../controllers/techdebt');


// a simple test url to check that all of our files are communicating correctly.
router.get('/ping', techdebt_controller.ping);


router.post('/show', techdebt_controller.show);

router.post('/create', techdebt_controller.create);

module.exports = router;