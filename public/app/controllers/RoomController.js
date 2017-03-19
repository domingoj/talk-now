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



  let videotags = Array.from(document.getElementsByTagName('video'));
  let canvas = document.getElementById('selectedVideo');
  let context = canvas.getContext('2d');

  //for redrawing of the canvas to make it appear like a video
  //http://stackoverflow.com/questions/24496605/how-can-i-show-the-same-html-5-video-twice-on-a-website-without-loading-it-twice
  const updateSelectedVideo = (v,c,w,h) => {

    if(v.paused || v.ended) return false;
    c.drawImage(v,0,0,w,h);
    setTimeout(updateSelectedVideo,20,v,c,w,h);

  }

  //loops through all the video tags and adds a click listener to them
  for(var i = 0; i < videotags.length; i++){

    videotags[i].addEventListener('click', function(e) {

      //grabs the clicked element 'target'
      e = e || window.event;
      let target = e.target || e.srcElement;

      //for clearing the canvas on click of other elements
      //http://stackoverflow.com/questions/9522341/how-to-redraw-canvas-every-250ms-without-flickering-between-each-redraw
      //TODO: add click event listener to new videos once a new user joins
      context.clearRect(0, 0, canvas.width, canvas.height);

      //take the height of the video
      let cw = Math.floor(canvas.clientWidth);
      let ch = Math.floor(canvas.clientHeight);
      canvas.width = cw;
      canvas.height = ch;

      updateSelectedVideo(target,context,cw,ch);


    }, false);
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
