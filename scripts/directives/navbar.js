'use strict';

angular.module(config.app.name).directive('navbar', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/navbar.html'
  };
});