'use strict';

angular.module('HomeController', [])

.controller('homeController', function($scope, $location, Room, User){

let self = this;

self.create = {
	roomName: '',
	password: '',
	userName: ''
};
self.join = {
	roomName: '',
	password: '',
	userName: ''
};

self.validationMessage = '';

self.createRoom = () => {

	Room.create(self.create)
		
		.then(function(response){

			let data = response.data;

			if(data.success){


console.log(User);
				User.setUser(self.create.userName);

				//hide the modal
				$('#createModal').modal('hide');

				//redirect to the room page
				$location.path('/rooms/' + data.room.name);
			}

			else {

				//room already in the db, cant create same name
				if(data.messageCode === 11000){
					self.validationMessage = data.message;
				}

				//something weird happened
				else {
					self.validationMessage = 'Oops, something went wrong. Please try again';
				}
			}
		});
}


self.joinRoom = () => {

$location.path('/rooms/room1');
}

});

