'use strict';

angular.module('RoomController', [])

.controller('roomController', function($scope){

let self = this;

//to be updated once we are using the REST API
let socket = io('http://localhost:3000' + '/room');
console.log(socket);

});

