'use strict';

angular.module(config.app.name).directive('preventKeyboardBug', function(){
    return {
    	restrict: 'A',
    	link: function (scope, element, attr) {
			// Only on touch devices
			if (Modernizr.touch) {
			   /* $("body").mobileFix({ // Pass parent to apply to
			        inputElements: element, // Pass activation child elements
			        addClass: "fixfixed" // Pass class name
			    });*/
			}
        }
    }
});
