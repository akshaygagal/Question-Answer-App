const express = require('express');
const router = express.Router();

const User = require('../models/user');

// hide private information before send response to client
function hideInfo(user) {
	return {
		username: user.username || '',
		number: user.number || 0,
		getHelp: user.getHelp || [],
		postHelp: user.postHelp || []
	}
}

function requiresLogin(req, res, next) {
	if (req.session && req.session.userId) {
		return next();
	} else {
		res.json({
			type: 'error',
			msg: 'You must be logged in to view this page.',
			body: null
		});
	}
}

// get method with '/user' route
router.get('/profile', requiresLogin, (req, res) => {
	console.log(req.session.userId)
	User
		.findById(req.session.userId)
		.populate('question getHelp')
		.exec((err, docs) => {
			if (err) return console.log(error);
			console.log(docs)
			res.json({
				type: 'success',
				msg: 'Successfully Log In your account!',
				body: hideInfo(docs)
			});
		})
})

// post method with '/User' route
router.post('/signup', (req, res) => {
	User.findOne({'username': req.body.username}, (err, user) => {
		if (user) {
			console.log("THIS USER ALREADY SIGN UP!")
			res.json({
				type: 'waring',
				msg: 'This username already tack.',
				body: null
			});
		} else {
			User.create(req.body, (err, result) => {
				if (err) console.error(err);
				console.log("SUCCESSFULLY SIGN UP!")
				res.json({
					type: 'success',
					msg: 'Successfully sign up and continue log in',
					body: null
				});
			})
		}
	})
})

// post method with '/login' route
router.post('/login', (req, res) => {
	User.authenticate(req.body.username, req.body.number, req.body.password, function (error, user) {
		if (error || !user) {
			var err = 'Wrong username or password or number.';
			return res.json({
					type: 'error',
					msg: err,
					body: null
				});
		} else {
			req.session.userId = user._id;
			return res.json({
				type: 'success',
				msg: 'Successfully log in',
				body: null
			});
		}
	});
})

// get method with '/logout' route
// logout from our website
router.get('/logout', function(req, res, next) {
	if (req.session) {
	// delete session object
		req.session.destroy(function(err) {
			if(err) {
				return next(err);
			} else {
				return res.json({
					type: 'success',
					msg: 'SUCCESSFULLY LOGOUT!',
					body: null
				});
			}
		});
	}
});

router.get('/session', (req, res) => {
	res.json(req.session)
})

module.exports = router;
function newFunction() {
	return 'question getHelp';
}

