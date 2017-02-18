'use strict';

angular.module('RoomController', [])

.controller('roomController',['$scope','$routeParams', function($scope, $routeParams){

	let self = this;

	let roomId = $routeParams.room_id;

	let socket = io('http://localhost:3000' + '/room');

	self.newMessage = '';

	self.sendMessage = () => {

		socket.emit('chat message', self.newMessage);
		$('#messages').append($('<li>').addClass('self').text(self.newMessage));
		self.newMessage = '';
	}

	socket.on('chat message', function(msg){

		 $('#messages').append($('<li>').text(msg));

	});

	let webrtc = new SimpleWebRTC({
	  	// the id/element dom element that will hold "our" video
	  	localVideoEl: 'localVideo',
  		
  		// the id/element dom element that will hold remote videos
  		remoteVideosEl: 'remotesVideos',
  		
  		// immediately ask for camera access
  		autoRequestMedia: true
	});

	// we have to wait until it's ready
	webrtc.on('readyToCall', function () {
  
  	// you can name it anything
  	webrtc.joinRoom(roomId);
	});

}]);

