'use strict';

angular.module('RoomController', [])

.controller('roomController',['$scope','$routeParams', 'User', function($scope, $routeParams, User){

	let self = this;

	self.roomId = $routeParams.room_id;

	self.user = User.getUser();

	self.newMessage = '';

	let socket = io('http://localhost:3000' + '/room');

	socket.on('connect', () => {
			socket.emit('join', {
				roomId: self.roomId
			});
		});

	self.sendMessage = () => {

		socket.emit('chat message', {
			message: self.newMessage,
			roomId: self.roomId,
			user: self.user
		});

		$('#messages').append($('<li>').addClass('self').text(self.newMessage));
		self.newMessage = '';
	}

	socket.on('chat message', function(data){

		 $('#messages').append($('<li>').text(data.user + ": " + data.message));

	});

	let webrtc = new SimpleWebRTC({
	  	// the id/element dom element that will hold "our" video
	  	localVideoEl: 'localVideo',
  		
  		// the id/element dom element that will hold remote videos
  		remoteVideosEl: '',
  		
  		// immediately ask for camera access
  		autoRequestMedia: true
	});




	// a peer video has been added
webrtc.on('videoAdded', function (video, peer) {
    console.log('video added', peer);
    var remotes = document.getElementById('remotes');
    if (remotes) {
        var container = document.createElement('div');
        container.className = 'videoContainer';
        container.id = 'container_' + webrtc.getDomId(peer);
        container.appendChild(video);

        // suppress contextmenu
        video.oncontextmenu = function () { return false; };

        remotes.appendChild(container);
    }
});

// a peer video was removed
webrtc.on('videoRemoved', function (video, peer) {
    console.log('video removed ', peer);
    var remotes = document.getElementById('remotes');
    var el = document.getElementById(peer ? 'container_' + webrtc.getDomId(peer) : 'localScreenContainer');
    if (remotes && el) {
        remotes.removeChild(el);
    }
});

	// we have to wait until it's ready
	webrtc.on('readyToCall', function () {
  
  	// you can name it anything
  	webrtc.joinRoom(self.roomId);
	});

}]);

