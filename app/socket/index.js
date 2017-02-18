'use strict';

module.exports = (io, app) => {

	io.of('/room').on('connection', socket => {


		socket.on('join', data => {

			socket.join(data.roomId);

			//ADD USER TO THE ROOM'S MEMBERS
			//broadcast to update the list of users
			//emit to update the list of users on the new joiner

		});

		socket.on('disconnect', data => {

			//Remove the user from the room
			//broadcast to update the list of users

		});

		socket.on('chat message', data => {

			console.log(data.roomId);
			socket.broadcast.to(data.roomId).emit('chat message', data.message);

		});

	});
}