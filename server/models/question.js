const mongoose = require('mongoose');

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const QuestionSchema = Schema({
	user: { 
		type: ObjectId,
		ref: 'user' 
	},
	title: {
		type: String,
		required: true
	},
	text: {
		type: String,
		required: true
	},
	comments: {
		type: [Number]
	},
	createAt: {
		type: Date,
		default: Date.now
	},
	updateAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('question', QuestionSchema);
