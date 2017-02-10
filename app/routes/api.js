'use strict';

//CALL THE PACKAGES ------------
let Room = require('../../app/models/room');
let jwt = require('jsonwebtoken');
let config = require('../../config');


module.exports = (app, express) => {

	// get an instance of the express router
	let apiRouter = express.Router();

	// route middleware to verify a token
	let jwtMiddleware = function(req, res, next){

		// check header or url parameters or post parameters for token
		var token = req.body.token || req.query.token || req.headers['x-access-token'];

		// decode token
		if(token){

			// verifies secret and checks exp
			jwt.verify(token, config.superSecret, function(err, decoded){

				if(err){
					return res.status(403).send({
						success: false,
						message:  'Failed to authenticate token.'
					});
				} else {
					// if everything is good, save to request for use in other routes
					req.decoded = decoded;

					next();
				}
			})
		} else {
			
			// if there is no token
			// return an HTTP response of 403 (access forbidden) and an error message
			return res.status(403).send({
				success: false,
				message: 'No token provided.'
			});
		}

	};

	apiRouter.route('/rooms/')

		.post((req, res) => {

			let room = new Room();
			// set the rooms information (comes from the request)

			room.name = req.body.name;
			room.owner = req.body.owner;
			room.password = req.body.password;

			room.save((err) => {

				if(err){

					//duplicate entry
					if(err.code == 11000) {
						return res.json({ success: false, message: 'The room you requested is already in use. Try another name.'});
						} else{
							return res.send(err);
						}
						
				return err;

				} else {
					res.json({
						success: true,
						message: 'Room Created!'
					});
				}		
			})

		});

	//routing for specific rooms
	apiRouter.route('/rooms/:name')

	//get room details
	.get(jwtMiddleware, (req, res)=> {
		Room.findOne({'name':req.params.name}, function(err, room){

			if(err) res.send(err);

			//return that room
			res.json(room);
		});
	})

	//for updating specific room details like room name, owner, password & members
	.put(jwtMiddleware, (req, res) => {
			Room.findOne({'name':req.params.name}, function(err, room){

				if(err) {
					res.send(err);

				}

				if(!room){
					res.json({
						success: false,
						message: 'Room not found.'
					})

				} else if(room){

						//update each room's info only if its new
						if(req.body.name) room.name = req.body.name;
						if(req.body.password) room.password = req.body.password;
						if(req.body.username) room.members.push(req.body.username);
						if(req.body.owner) room.owner = req.body.owner;

						console.log(room);

						//save the room
						room.save((err) => {
							if(err) res.send(err);

							//return a message
							res.json({ 
								success: true,
								message: 'Room updated!' 
							});
						});
					}
			});
	});

	// route to authenticate a room request (POST http://localhost:8080/api/authenticate)
	apiRouter.post('/authenticate', function(req, res){

		Room.findOne({
			name: req.body.name
		}).select('name members password').exec(function(err, room){

			if(err) throw err;

			//if no room with that name was found
			if(!room){
				res.json({
					success: false,
					message: 'Authentication failed. Room not found.'
				})
			} else if(room){

				//check if password matches
				var validPassword = room.comparePassword(req.body.password);
				if(!validPassword){
					res.json({
						success: false,
						message: 'Authentication failed. Wrong password.'
					});
				} else {


					// if room 
					// create a token
					var token = jwt.sign({
						name: room.name
						}, 
						config.superSecret, 
						{
						expiresIn: '24h' // expires in 24 hours
					});

					// return the information including token as JSON
					res.json({
						success: true,
						message: 'Enjoy your token',
						token: token
					});

					
				}
			}


		});

	});


	return apiRouter;

}

