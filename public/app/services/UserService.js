angular.module('roomService',[])

.factory('Room', function($http){

	//create a new object
	var roomFactory = {};

	//get a room
	roomFactory.get = function(roomName){
		return $http.get('/api/rooms/' + roomName);
	}

	// create a room
	roomFactory.create = function(roomData) { 
		return $http.post('/api/rooms/', roomData);
	};

	// update a room
	roomFactory.update = function(roomName, roomData) { 
		console.log(roomName);
		console.log(userData);
		return $http.put('/api/rooms/' + roomName, roomData);
	};

  	// delete a user
	roomFactory.delete = function(roomName) { 
		return $http.delete('/api/rooms/' + id);
	};

  	// return our entire userFactory object
	return roomFactory;

});