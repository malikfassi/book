'use strict';

angular.module(config.app.name).directive('maxHeight', function(){
    return {
    	restrict: 'A',
    	link: function (scope, element, attr) {
    			scope.$on("popupOpened", function(){
    				element.css("height", element.css("max-height"));
    			    console.log(element.css("max-height"));
    			});
            }
        }
});