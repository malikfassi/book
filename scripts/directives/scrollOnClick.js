'use strict';

angular.module(config.app.name).directive('scrollOnClick', function(){
    return {
    	restrict: 'A',
    	link: function (scope, element, attr) {
                element.bind("click", function()
                {
                    console.log("hello");
                    console.log(element.offset().top);
                    $('html, body').animate({
                        scrollTop: element.offset().top
                    }, 500);
                    return false;
                });
        }
    }
});