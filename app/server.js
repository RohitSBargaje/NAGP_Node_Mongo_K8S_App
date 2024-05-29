const express = require('express');
var bodyParser = require('body-parser');
const app = express();
var argv = require('minimist')(process.argv.slice(2));
var cors = require('cors');

// CONTROLLERS
var usersCtrl = require('./controllers/users');

//CORS
app.use(
	cors({
		credentials: true,
		origin: true
	})
);
app.options('*', cors());

// SWAGGER
var subpath = express();
app.use(
	bodyParser.json({
		limit: '50mb'
	})
);
app.use(
	bodyParser.urlencoded({
		limit: '50mb',
		extended: true
	})
);
app.use('', subpath);
var swagger = require('swagger-node-express').createNew(subpath);
app.use(express.static('swagger'));
swagger.setApiInfo({
	title: 'User API',
	description: 'User API Description',
	termsOfServiceUrl: '',
	contact: 'test@gmail.com',
	license: '',
	licenseUrl: ''
});
// Set api-doc path
swagger.setAppHandler(app);
swagger.configureSwaggerPaths('', 'api-docs', '');

// Configure the API domain
var domain = 'localhost';
if (argv.domain !== undefined) domain = argv.domain;
else
	console.log(
		'No --domain=xxx specified, taking default hostname "localhost".'
	);

// Configure the API port
var port = 8080;
if (argv.port !== undefined) port = argv.port;
else console.log('No --port=xxx specified, taking default port ' + port + '.');

// Set and display the application URL
var applicationUrl = 'http://' + domain + ':' + port;
swagger.configure(applicationUrl, '1.0.0');

// MONGODB
const MongoClient = require('mongodb').MongoClient;
const {
	MONGO_DB_USER,
	MONGO_DB_PASSWORD,
	MONGO_DB_HOST,
	MONGO_DB_PORT,
	MONGO_DB_NAME,
	TEST_UPDATE
  } = process.env;

  console.log(`UPDATE - ${TEST_UPDATE}`);
const connection = `mongodb://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}:${MONGO_DB_PORT}/${MONGO_DB_NAME}?authSource=admin`;
console.log(connection);
MongoClient.connect(connection,{ useNewUrlParser: true,
	useUnifiedTopology: true}, (err, client) => {
	if (err) return console.log(err);
	db = client.db('users');

	app.use('/api/v1/users', usersCtrl);

	app.listen(3000, function() {
		console.log('server running on port 3000', '');
	});
});

app.set('view engine', 'ejs');
