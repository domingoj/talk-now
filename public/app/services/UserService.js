'use strict';

angular.module('UserService',[])

.service('User', function() {

	let userName = 'awesome-user';
	let roomName = '';
	let roomPassword = '';

	return {
		getRoom: function () {
	        return roomName;
	    },
	    setRoom: function (value) {
	        roomName = value;
	    },
	    getUser: function () {
	        return userName;
	    },
	    setUser: function (value) {
	        userName = value;
	    },
	    getRoomPassword: function(){
	    	return roomPassword;
	    },
	    setRoomPassword: function(password){
	    	roomPassword = password;
	    }
	};

});