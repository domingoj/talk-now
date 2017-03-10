angular.module('AuthService',[])


// ===================================================
// auth factory to login and get information
// inject $http for communicating with the API
// inject $q to return promise objects
// inject AuthToken to manage tokens
// ===================================================
.factory('Auth', function($http, $q, AuthToken){

	//create Auth factory
	let authFactory = {};

	//handle joining a room
	authFactory.joinRoom = function(user){

		// return the promise object and its data
		return $http.post('/api/authenticate',{
			roomName: user.roomName,
			userName: user.userName,
			password: user.password
			})
			.then(function(response){
				AuthToken.setToken(response.data.token);
				return response.data;
		});
	};

	//clearing the token for the user exiting the room
	authFactory.exitRoom = function(){

		// clear the token
		AuthToken.setToken();
	};

	// check if a user is logged in with a password on a room
	// checks if there is a local token
	authFactory.isAuthenticated = function(){

		if(AuthToken.getToken()){
			return true;
		} 
		else {
			return false;
		}
	};

	// return auth factory object
	return authFactory;

})

// =================================================== 
// factory for handling tokens
// inject $window to store token client-side
// ===================================================
.factory('AuthToken', function($window){

	var authTokenFactory = {};

	// get the token out of local storage
	authTokenFactory.getToken = function(){

		return $window.localStorage.getItem('token');
	};

	// function to set token or clear token
	// if a token is passed, set the token
	// if there is no token, clear it from local storage
	authTokenFactory.setToken = function(token){

		if(token){
			$window.localStorage.setItem('token', token);
		}
		else {
			$window.localStorage.removeItem('token');
		}
	};

	return authTokenFactory;

})


// ===================================================
// application configuration to integrate token into requests 
// will be responsible for attaching the token to all HTTP requests coming from our frontend application
// ===================================================
.factory ('AuthInterceptor', function($q, $location, AuthToken){

	var interceptorFactory = {};

	// this will happen on all HTTP requests
	interceptorFactory.request = function(config) {

		// grab the token
		var token = AuthToken.getToken();

		// if the token exists, add it to the header as x-access-token
		if(token){
			config.headers['x-access-token'] = token;
		}

		return config;
	}

	// happens on response errors
	interceptorFactory.responseErrors = function(response){

    	// if our server returns a 403 forbidden response
    	if(response == 403){

    		//clear token
    		//token is empty or not good enough to authenticate the user for a particular room
    		AuthToken.setToken();
    		$location.path('/home');
    	}

    	// return the errors from the server as a promise
    	return $q.reject(response);
	};

	return interceptorFactory;
});

