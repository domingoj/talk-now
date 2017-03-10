'use strict';

angular.module('talknowApp', [
	'app.routes',
	'RoomService',
	'AuthService',
	'UserService',
	'HomeController',
	'RoomController'])

// application configuration to integrate token into requests
.config(function($httpProvider) {

	// attach our auth interceptor to the http requests
	$httpProvider.interceptors.push('AuthInterceptor');
});
