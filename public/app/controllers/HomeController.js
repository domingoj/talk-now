'use strict';

angular.module('HomeController', [])

.controller('homeController', function($scope){

let self = this;

self.createRoom = () => {

	bootbox.alert('create a room');
}

self.joinRoom = () => {

	bootbox.alert('join a room');
}

});

