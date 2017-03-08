'use strict';

angular.module('UserService',[])

.service('User', function() {

	let userName = 'awesome-user';
	let roomPassword = '';
      
	return {
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