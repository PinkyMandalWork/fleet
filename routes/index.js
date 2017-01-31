var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var db = req.db;
	var collection = db.collection('aircraft');
	collection.find().toArray(function(err, docs) {
		res.render('index', { title: 'Aircraft Fleet Management System' });
	});
});

module.exports = router;