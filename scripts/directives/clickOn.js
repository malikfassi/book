'use strict';

angular.module(config.app.name).directive('clickOn', function(){
    return {
    	restrict: 'A',
    	link: function (scope, element, attr) {
                element.bind("click", function()
                {
                    $(attr.clickOn).click();
                })
            }
        }
});