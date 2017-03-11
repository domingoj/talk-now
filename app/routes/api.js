'use strict';

//CALL THE PACKAGES ------------
let Room = require('../../app/models/room');
let config = require('../../config');


module.exports = (app, express) => {

	// get an instance of the express router
	let apiRouter = express.Router();

	apiRouter.route('/rooms/')

		.post((req, res) => {

			let room = new Room();
			// set the rooms information (comes from the request)

			room.name = req.body.roomName;
			room.roomPassword = req.body.roomPassword;

			room.save((err) => {

				if(err){

					//duplicate entry
					if(err.code == 11000) {
						return res.json({ 
							success: false, 
							message: 'The room you requested is already in use. Try another name.',
							messageCode: 11000
							});
					} else{
						return res.send(err);
					}
						
				return err;

				} else {
					res.json({
						success: true,
						message: 'Room Created!',
						room: room
					});
				}		
			})

		});

	//routing for specific rooms
	apiRouter.route('/rooms/:name')

	//get room details
	.get((req, res) => {

		console.log('req params', req.params.name);
		Room.findOne({'name':req.params.name}, function(err, room){

			if(err) res.json({
				success: false,
				message: err
			});

			if(!room) {
				res.json({
					success: false,
					message: 'Room not found.'
				})
			} else {

				//return that room
				res.json({
					success: true,
					room: room
				});
			}

		});
	});

	// route to authenticate a room request (POST http://localhost:8080/api/authenticate)
	apiRouter.post('/authenticate', function(req, res){

		Room.findOne({
			name: req.body.roomName
		}).select('name roomPassword').exec(function(err, room){

			if(err) {
				console.log('Error in authentication: ', err);
				res.json({
					success: false,
					message: 'Authentication failed. Something went wrong.'
				});
			}

			//if no room with that name was found
			if(!room){
				res.json({
					success: false,
					message: 'Authentication failed. Room not found.'
				})
			} else if(room){
				//check if password matches
				var validPassword = room.comparePassword(req.body.roomPassword);
				if(!validPassword){
					res.json({
						success: false,
						message: 'Authentication failed. Wrong password.'
					});
				} else {

					// return the information including token as JSON
					res.json({
						success: true,
						message: 'Authenticated'
					});
				}
			}
		});
	});


	return apiRouter;

}

