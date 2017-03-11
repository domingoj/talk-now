'use strict';

angular.module('RoomService', [])

.factory('Room', function($http){

	//create a new object
	let roomFactory = {};

	//get a room
	roomFactory.get = function(name){
		return $http.get('/api/rooms/' + name);
	}

	// create a room
	roomFactory.create = function(roomData) { 
		return $http.post('/api/rooms/', roomData);
	};

  	// return our entire userFactory object
	return roomFactory;

});