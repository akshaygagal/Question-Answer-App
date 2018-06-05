// Installation third party core modules and npm modules
const express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	MongoStore = require('connect-mongo')(session),
	path = require('path'),
	morgan = require('morgan'),
	bcrypt = require('bcryptjs');

// express instance
const app = express();

console.log(app.get('env'))

//connect to MongoDB
mongoose.connect('mongodb://localhost/gilool');
var db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log('connection successfully!');
});

//use sessions for tracking logins
app.use(session({
	secret: 'gilool/node',
	resave: true,
	saveUninitialized: false,
	store: new MongoStore({
		mongooseConnection: db
	})
}));


// all routes
const questionRouter = require('./routes/question'),
	userRouter = require('./routes/user');

// express configure
app.set('views', path.join(__dirname, 'client', 'build'));

// express middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'client', 'build')));

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/', questionRouter);
app.use('/', userRouter);

// boost up our server on port 8080
app.listen(8080, () => {
	console.log('Server running successfully!');
});
