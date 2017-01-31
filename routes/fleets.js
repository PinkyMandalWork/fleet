var express = require('express');
var router = express.Router();

/* GET aircraft details. */
router.get('/', function(req, res, next) {
	var db = req.db;
	var collection = db.collection('aircraft');
	collection.find().toArray(function(err, docs) {
		res.json(docs);
	});
});

/* POST to update entry. */
router.post('/save', function(req, res, next) {
	var db = req.db;
	var collection = db.collection('aircraft');
	collection.update({ Name: req.body.Name }, {$set: req.body}, { upsert: true }, function(err, result) {
		res.send((err === null) ? { msg: '' } : { msg: err });
	});
});

/* POST to remove entry. */
router.post('/remove', function(req, res, next) {
	var db = req.db;
	var collection = db.collection('aircraft');
	collection.remove(req.body, function(err, result) {
		res.send((err === null) ? { msg: '' } : { msg: err });
	});
});

/* POST to delete field. */
router.post('/delete', function(req, res, next) {
	var db = req.db;
	var collection = db.collection('aircraft');
	collection.update(req.body, { $unset: { flight: "" } }, function(err, result) {
		res.send((err === null) ? { msg: '' } : { msg: err });
	});
});
module.exports = router;