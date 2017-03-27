'use strict';

angular.module('UserService',[])

.service('User', function() {

	let userName = '';
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
	    setRoomPassword: function(value){
	    	roomPassword = value;
	    },

	    setUser: function(user){
	    	userName = user.userName;
	    	roomName = user.roomName;
	    	roomPassword = user.roomPassword;
	    },

	    getUser: function(){
	    	return {
	    		userName,
	    		roomName,
	    		roomPassword
	    	}
	    }
	};

});
