'use strict';

angular.module('RoomController', [])

.controller('roomController', function($scope){

	let self = this;

	let socket = io('http://localhost:3000' + '/room');

	self.newMessage = '';

	self.sendMessage = () => {

		socket.emit('chat message', self.newMessage);
		$('#messages').append($('<li>').text(self.newMessage));
		self.newMessage = '';
	}

	socket.on('chat message', function(msg){

		 $('#messages').append($('<li>').text(self.newMessage));

	});

});

