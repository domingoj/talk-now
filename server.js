'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose'); 
const config = require('./config');
const path = require('path');

const server = require('http').Server(app);
const io = require('socket.io').listen(server);

//for socket io event listeners
require('./app/socket')(io, app);

//APP CONFIGURATION ---------------
//use body-parser so we can grab information from POST REQUESTS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next){

	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
	next();

});

//log all requests to the console
app.use(morgan('dev'));

//connect to our database
mongoose.connect(config.database);


// set static files location
// used for requests that our frontend will make
app.use(express.static(__dirname + '/public'));

let apiRoutes = require('./app/routes/api')(app,express);

app.use('/api', apiRoutes);

// MAIN CATCH ALL ROUTE ---------------
// SEND USERS TO FRONTEND ------------
// will be handled by our angular app
app.get('*', function(req, res) {
res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

// START THE SERVER
// ===============================
server.listen(config.port);
console.log('Magic happens on port ', config.port);