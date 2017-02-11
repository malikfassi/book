'use strict';

angular.module(config.app.name).directive('displayWhenHover', function(){
    return {
    	restrict: 'A',
    	link: function (scope, element, attr) {
    			$(element.mouseenter(function(){
    				$(element).stop();
    			}));
    			$(attr.displayWhenHover)
    			.mouseenter(function(){
    				$(element.fadeIn(10));
    			})
    			.mouseleave(function(){
    				$(element.fadeOut(10));
    			});
            }
        }
});