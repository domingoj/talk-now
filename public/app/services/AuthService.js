angular.module('AuthService',[])


// ===================================================
// auth factory to login and get information
// inject $http for communicating with the API
// inject $q to return promise objects
// inject AuthToken to manage tokens
// ===================================================
.factory('Auth', function($http){

	//create Auth factory
	let authFactory = {};

	//handle joining a room
	authFactory.joinRoom = function(user){

		// return the promise object and its data
		return $http.post('/api/authenticate',{
			roomName: user.roomName,
			userName: user.userName,
			roomPassword: user.roomPassword
			})
			.then(function(response){
				return response.data;
		});
	};

	// return auth factory object
	return authFactory;

});

