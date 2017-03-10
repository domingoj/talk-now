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
	    getUserName: function () {
	        return userName;
	    },
	    setUserName: function (value) {
	        userName = value;
	    },
	    getRoomPassword: function(){
	    	return roomPassword;
	    },
	    setRoomPassword: function(password){
	    	roomPassword = password;
	    },

	    setUser: function(user){
	    	userName = user.userName;
	    	roomName = user.roomName;
	    	roomPassword = user.password;
	    }
	};

});