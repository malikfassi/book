'use strict';

angular.module(config.app.name).directive('scrollTo', function(){
    return {
    	restrict: 'A',
    	link: function (scope, element, attr) {
				element.bind("click", function() {
				    $(".popup").animate({
				        scrollTop: $(attr.scrollTo).position().top
				    }, 1000);
				});
            }
        }
});