var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var mongoose   = require('mongoose');
mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o'); 
var Bear     = require('./app/models/bear');

app.use(bodyParser());

var port = process.env.PORT || 8080;

var router = express.Router();
router.get('/', function(req, res) {
//        req.setHeader("Content-Type", "application/json");
        res.json({message: 'Test api'});
});

router.route('/bears')
	// get all the bears (accessed at GET http://localhost:8080/api/bears)
	.get(function(req, res) {
		Bear.find(function(err, bears) {
			if (err)
				res.send(err);
            else
                res.json(bears);
		});
	});


app.use('/api', router);

app.listen(port);
console.log('Some magic happens on port ' + port);
