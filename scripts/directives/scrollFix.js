'use strict';

angular.module(config.app.name).directive('scrollFix', function(){
	return {
		restrict: 'A',
		link: function (scope, element, attr) {
			$(window).scroll(function(){
			    //if ($(window).scrollTop() == 0)   
				//	window.scrollTo(1,1)
			})
		}
	}
});
