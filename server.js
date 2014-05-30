var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cfg = require("./hiddencfg/cfg.json");

var mongoose   = require('mongoose');
mongoose.connect(cfg.connectionString); 
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
	})
	.post(function(req, res) {
		var bear = new Bear(); 
		bear.name = req.body.name;  // set the bears name (comes from the request)

		// save the bear and check for errors
		bear.save(function(err) {
			if (err)
                res.send(err);
            else
                res.json({ message: 'Bear "' + req.body.name + '" created!' });
		});
		
	});
router.route('/bears/:name')
	.get(function(req, res) {
		Bear.findOne({"name": req.params.name}, function(err, bear) {
			if (err)
				res.send(err);
			else
                res.json(bear);
		});
	});


app.use('/api', router);

app.listen(port);
console.log('Some magic happens on port ' + port);
