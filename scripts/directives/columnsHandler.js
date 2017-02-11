angular.module(config.app.name)
  .directive('columnsHandler', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
          var threeCols;
          $(window).resize(function() {
            console.log($(window).innerWidth());
            console.log(scope.imgs3);
            if ($(window).innerWidth() <= 1000)
            {
              threeCols = scope.allData.chunk(Math.round(scope.allData.length / 2));
              scope.imgs1 = threeCols[0];
              scope.imgs2 = threeCols[1];
              scope.imgs3 = "";
              console.log("yeah");
              scope.$apply();
            }
            else
            {
              threeCols = scope.allData.chunk(Math.round(scope.allData.length / 3));
              scope.imgs1 = threeCols[0];
              scope.imgs2 = threeCols[1];
              scope.imgs3 = threeCols[2];
              scope.$apply();
            }
          })
      }
    }
  });