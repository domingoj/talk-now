'use strict';

angular.module('HomeController', [])

.controller('homeController', function($scope, $location){

let self = this;

self.createRoom = () => {

	$location.path('/rooms/room1');

}

self.joinRoom = () => {

$location.path('/rooms/room1');
}

});

