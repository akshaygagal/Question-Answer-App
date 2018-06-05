const express = require('express');
const router = express.Router();

const Question = require('../models/question');
const User = require('../models/user')

let filterQuestion = () => {

}

// get method with '/get-help' route
router.get('/get-help', (req, res) => {
	Question
		.find({})
		.populate('user', 'username number')
		.sort({createAt:-1})
		.exec((err, docs) => {
			if (err) console.error(err);
			console.log(docs)
			res.json(docs);
		})
})

// post method with '/get-help' route
router.post('/get-help', (req, res) => {
	let question = req.body;
	question.user = req.session.userId;
	Question.create(question, (err, result) => {
		User.findByIdAndUpdate(req.session.userId, { $push: { getHelp: result._id, $position: 0 } }, (err, result) => {
			if (err) return console.log(err);
			console.log('Successfully add question to getHelp!');
		})
		res.json({
			type: 'success',
			msg: 'Successfully send your question',
			body: null
		});
	});
});

// delete method with '/get-help' route
router.delete('/get-help', (req, res) => {
	Question.remove({}, (err, result) => {
		if (err) console.error(err.stack)
		console.log('Successfully delete all Questions!')
		res.send('DELETE...')
	})
})

router.post('/apply', (req, res) => {
	let question = req.body;
	console.log(question);
	User.findUserNumber(req.session.userId, (userName, userNumber) => {
		console.log(question.user.number)
		console.log(userNumber)	
		if (question.user.username === userName) {
			return res.json({
				type: 'error',
				msg: 'You are not apply your question.',
				body: null
			});
		}
		Question.findByIdAndUpdate(question._id, {$push: { comments: userNumber }}, (err, question) => {
			if (err) return console.log(err);
		})
		console.log(question);
		User.findByIdAndUpdate(req.session.userId, {$push: { postHelp: question }}, (err, question) => {
			if (err) return console.log(err);
			console.log(question);
			return res.json({
				type: 'success',
				msg: 'You are apply this question. Plz contact this user!',
				body: null
			});
		})
	});
})

module.exports = router;
