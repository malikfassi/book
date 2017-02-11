'use strict';

angular.module(config.app.name)
.directive('placeholderFocus', function () {
    /*----------------------------------------------
    | TO USE ON INPUT TAGS
    |
    | works like placeholder but placeholder disapear when
    | user focuses the input, not when he starts typing
    |
    | attribute placeholder-focus="Enter Password"
    ----------------------------------------------*/
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            $(element).attr('placeholder', $(element).attr('placeholder-focus'));
            $(element).bind('focus', function(e) {
                $(this).attr('placeholder', '');
            });
            $(element).bind('blur', function(e) {
                $(this).attr('placeholder', $(this).attr('placeholder-focus'));
            });
        }
    }
});
