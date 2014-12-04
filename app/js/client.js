'use strict';

require('angular/angular');

var app = angular.module('notesApp', []);

require('./notes/controllers/notesCtrl')(app);
