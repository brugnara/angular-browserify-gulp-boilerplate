'use strict';

function Routes($routeProvider) {
  $routeProvider.
    when('/rooms/', {
      templateUrl: 'modules/rooms/views/home.html',
      controller: 'RoomsHomeCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });
}

module.exports = Routes;