'use strict';

angular.module('RoomController', [])

.controller('roomController',['$scope','$routeParams', '$location', 'User', 'Auth', 'Room', function($scope, $routeParams, $location, User, Auth, Room){

  let self = this;
  self.newMessage = '';

  if(!User.getRoom()){
    User.setRoom($routeParams.room_id);
  }

  self.roomName = User.getRoom();

  function enableConnection() {

    let socket = io('http://localhost:3000' + '/room');

    socket.on('connect', () => {

        socket.emit('join', {
          roomId: User.getRoom()
        });
      });

    self.sendMessage = () => {

      socket.emit('chat message', {
        message: self.newMessage,
        roomId: User.getRoom(),
        user: User.getUserName()
      });

      $('#messages').append($('<li>').addClass('self').text(self.newMessage));

      self.newMessage = '';
      $('#messages').animate({ scrollTop: $('#messages').prop('scrollHeight') }, 300);
    }

    socket.on('chat message', function(data){

      $('#messages').append($('<li>').addClass('others').html('<b>' + data.user + "</b> : " + data.message));
      $('#messages').animate({ scrollTop: $('#messages').prop('scrollHeight') }, 300);

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

        var remotes = document.getElementById('remotes');
        var el = document.getElementById(peer ? 'container_' + webrtc.getDomId(peer) : 'localScreenContainer');
        if (remotes && el) {
            remotes.removeChild(el);
        }
    });

    // we have to wait until it's ready
    webrtc.on('readyToCall', function () {

      // you can name it anything
      webrtc.joinRoom(User.getRoom());
    });
  }

  //for user room authentication if the user isn't authenticated yet
  self.joinRoom = function(){

    if(!User.getUserName()) {
       alert('TODO: popup no username');
      return;
    }

console.log(User.getUser());
    Auth.joinRoom(User.getUser())
    .then(function(data){


      if(data.success){

        enableConnection();
        return;

      } else {

        console.log(data);
        //TODO: popup for auth details again
        alert('TODO: popup');
      }
    });
  }

  Room.get(User.getRoom())
    .then(function(result){

      let data = result.data;
      if(data.success){

        //if room is present
        //try to join the room
        self.joinRoom();

      } else {
        $location.path('/');
      }
    });

  document.querySelectorAll('video').onclick = function() {
    console.log(document.querySelector('video').srcObject);
}


}])

// custom directive for 'Enter' press on the new chat box text area
.directive('myEnter', function() {
   return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});
