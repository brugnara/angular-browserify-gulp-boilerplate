'use strict';

function Routes($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });
}

module.exports = Routes;