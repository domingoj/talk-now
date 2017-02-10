'use strict';

//CALL THE PACKAGES ------------
var Room = require('../../app/models/room');

module.exports = (app, express) => {

	// get an instance of the express router
	let apiRouter = express.Router();

	apiRouter.route('/rooms/')

		.post((req, res) => {
			let room = new Room();
			// set the users information (comes from the request)


			console.log(req);
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

	apiRouter.route('/rooms/:name')

	.get((req, res)=>{
			Room.find({'name':req.params.name}, function(err, room){

				if(err) res.send(err);

				//return that room
				res.json(room);
			});

		});

	return apiRouter;

}

