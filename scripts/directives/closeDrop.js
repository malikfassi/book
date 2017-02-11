angular.module(config.app.name)
  .directive('closeDrop', function($timeout, $parse) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
          element.bind("click", function(e) {
            scope.closeDrop();
            $("#mask").stop().fadeOut("fast");
          })
      }
    }
  });