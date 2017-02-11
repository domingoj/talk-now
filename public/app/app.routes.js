'use strict';

angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider){

	$routeProvider

	// home page route
	.when('/', {
		templateUrl: 'app/views/pages/home.html',
		controller: 'homeController',
			controllerAs: 'home'
			
	})

	//room route
	.when('/rooms/:user_id', {
		templateUrl: 'app/views/pages/room.html',
		controller: 'roomController',
			controllerAs: 'room'
			
	});


	// get rid of the hash in the URL
	$locationProvider.html5Mode(true);		
});