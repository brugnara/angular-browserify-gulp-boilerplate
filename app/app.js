'use strict';

var angular = require('angular');
require('angular-route');

// initializing modules
var modules = {
  rooms: require('./modules/rooms')
};

function App(appName, dependencies) {
  this.app = angular.module(appName, dependencies);
  //
  this.initApp();
  this.initModules(modules);
}

App.prototype.initApp = function() {
  // initializing app
  // routes
  var routes = require('./routes');
  this.app.config(['$routeProvider', routes]);

  // controllers
  var controllers = {
    HomeCtrl: require('./controllers/HomeCtrl')
  };
  this.initializeControllers(controllers);
};

App.prototype.initModules = function(modules) {
  for (var moduleName in modules) {
    var module = modules[moduleName];
    //
    console.log('Initializing module: ' + moduleName);
    this.app.config(['$routeProvider', module.routes]);
    this.initializeControllers(module.controllers);
  }
};

App.prototype.initializeControllers = function(controllers) {
  // initializing controllers
  for (var controllerName in controllers) {
    var controller = controllers[controllerName];
    //
    console.log('Initializing controller: ' + controllerName);
    this.app.controller(controllerName, ['$scope', '$location', '$http', '$routeParams', controller]);
  }
};

new App('MyApp', ['ngRoute']);
