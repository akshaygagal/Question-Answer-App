const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const Mixed = Schema.Types.Mixed;

const UserSchema = Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	number: {
		type: Number,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	createAt: {
		type: Date,
		default: Date.now
	},
	updateAt: {
		type: Date,
		default: Date.now
	},
	getHelp: {
		type: [{ type: ObjectId, ref: 'question' }]
	},
	postHelp: {
		type: [{ type: Mixed }]
	}
})

UserSchema.pre('save', function (next) {
	let hash = bcrypt.hashSync(this.password, 8);
	this.password = hash
	next()
});

UserSchema.statics.authenticate = (username, number, password, callback) => {
	User.findOne({ username: username, number: number })
		.exec((err, user) => {
			if (err) return callback(err);
			if (!user) {
				let err = 'User not found.';
				return callback(err);
			}
			bcrypt.compare(password, user.password, (err, result) => {
				if (result === true) {
					return callback(null, user);
				} else {
					return callback();
				}
			})
		})
};

UserSchema.statics.findUserNumber = (id, callback) => {
	User.findById(id, (err, user) => {
		if (err) return console.log(err);
		callback(user.username, user.number)
	})
};

const User = mongoose.model('user', UserSchema);
module.exports = User;
