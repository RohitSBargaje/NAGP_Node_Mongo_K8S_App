var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;

router.get('/', (req, res, next) => {
	var user_id = req.query.user_id;
	var username = req.query.username;
	var password = req.query.password;
	let where = {};
	if (user_id) where.user_id = parseInt(user_id);
	if (username) where.username = username;
	if (password) where.password = password;

	db.collection('users1')
		.find(where)
		.toArray((err, result) => {
			res.send(200, result);
		});
});

router.post('/', (req, res, next) => {
	db.collection('users1').save(req.body, (err, result) => {
		if (err) return console.log(err);
		let user = result.ops[0];
		console.log('collection("users1").save => users', user);
		res.status(200).send(user);
	});
});

module.exports = router;