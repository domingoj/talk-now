'use strict';

angular.module('RoomService', [])

.factory('Room', function($http){

	//create a new object
	let roomFactory = {};

	//get a room
	roomFactory.get = function(roomName){
		return $http.get('/api/rooms/' + roomName);
	}

	// create a room
	roomFactory.create = function(roomData) { 
		return $http.post('/api/rooms/', roomData);
	};

  	// return our entire userFactory object
	return roomFactory;

});