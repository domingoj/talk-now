'use strict';

angular.module('UserService',[])

.service('User', function() {

	let userName = 'awesome-user';
      
	return {
	    getUser: function () {
	        return userName;
	    },
	    setUser: function (value) {
	        userName = value;
	    }
	};

});