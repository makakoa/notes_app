'use strict';

require('angular/angular');
require('angular-route');

var notesApp = angular.module('notesApp', ['ngRoute']);

//services
require('./notes/services/resource_backend_service')(notesApp);

//controllers
require('./notes/controllers/notesCtrl')(notesApp);

notesApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/notes', {
    templateUrl: 'templates/notes/notes_template.html',
    controller: 'notesCtrl'
  })
  .otherwise({
    redirectTo: '/notes'
  });
}]);
