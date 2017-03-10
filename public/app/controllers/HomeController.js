'use strict';

angular.module('HomeController', [])

.controller('homeController', function($scope, $location, Room, User, Auth){

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

					User.setUser(self.create);

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

	    Auth.joinRoom(self.join)
	    .then(function(data){

	      if(data.success){
	      		//hide the modal
				$('#joinModal').modal('hide');

				//set user-room details
		      	User.setUser(self.join);

		   		//move to room page
		        $location.path('/rooms/' + User.getRoom());

	      } else {
	        //TODO: popup for auth details again
	        self.validationMessage = data.message;
	      }
	    });
	}

});

