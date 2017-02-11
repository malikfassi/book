'use strict';

angular.module(config.app.name).directive('backImg', function(){
	    /*----------------------------------------------
    | TO USE ON ANY TAG
    |
    | affects a background image
    |
    | attribute back-src="img/image.png"
    ----------------------------------------------*/
    return {
    	restrict: 'A',
    	link: function (scope, element, attr) {

    		// $(element).css('backgroundImage', 'url('+attr.backImg+')');
    		// $(element).css('backgroundSize', "cover");

    		// FOR REAL API REQUEST 
    		attr.$observe('backImg', function(value) {
    			$(element).css('backgroundImage', 'url('+attr.backImg+')');
    			$(element).css('backgroundSize', "cover");
    		});
    	}
    }
})
.directive('backImgSize', function(){
        /*----------------------------------------------
    | TO USE ON ANY TAG
    |
    | affects a background image
    |
    | attribute back-src="img/image.png"
    ----------------------------------------------*/
    return {
        restrict: 'A',
        link: function (scope, element, attr) {

            // $(element).css('backgroundImage', 'url('+attr.backImg+')');
            // $(element).css('backgroundSize', "cover");

            // FOR REAL API REQUEST 
            attr.$observe('backImgSize', function(value) {

                $(element).css('backgroundImage', 'url('+attr.backImgSize+')');
                $(element).css('backgroundSize', "cover");
                var img = new Image;
                $(img).load(function () {
                    $(element).css("height", img.height);
                });
                img.src = attr.backImgSize;
                console.log(img);
            });
        }
    }
})
.directive('imgSrc', function(){
        /*----------------------------------------------
    | TO USE ON ANY TAG
    |
    | affects a src to an image
    |
    | attribute img-src="img/image.png"
    ----------------------------------------------*/
    return {
        restrict: 'A',
        link: function (scope, element, attr) {

            // $(element).css('backgroundImage', 'url('+attr.backImg+')');
            // $(element).css('backgroundSize', "cover");

            // FOR REAL API REQUEST 
            attr.$observe('imgSrc', function(value) {
                $(element).attr('src', attr.imgSrc);
                
            });
        }
    }
})
.directive('imgSrcCenter', function(){
        /*----------------------------------------------
    | TO USE ON ANY TAG
    |
    | affects a src to an image
    |
    | attribute img-src="img/image.png"
    ----------------------------------------------*/
    return {
        restrict: 'A',
        link: function (scope, element, attr) {

            // $(element).css('backgroundImage', 'url('+attr.backImg+')');
            // $(element).css('backgroundSize', "cover");

            // FOR REAL API REQUEST 
            attr.$observe('imgSrcCenter', function(value) {
                $(element).attr('src', attr.imgSrcCenter);
                console.log("parent half height"+ parseInt($(element).parent().css("height"), 10)/2);
                console.log("img half height"+ parseInt($(element).css("height"), 10)/2);
                $(element).load(function()
                {
                    $(element).css("margin-top", parseInt($(element).parent().css("height"), 10)/2 - parseInt($(element).css("height"), 10)/2);
                });
                $(window).resize(function(){
                    $(element).css("margin-top", parseInt($(element).parent().css("height"), 10)/2 - parseInt($(element).css("height"), 10)/2);
                })
            });
        }
    }
})
.directive('addImg', function(){
        /*----------------------------------------------
    | TO USE ON ANY TAG
    |
    | affects a src to an image
    |
    | attribute img-src="img/image.png"
    ----------------------------------------------*/
    return {
        restrict: 'A',
        link: function (scope, element, attr) {

            // $(element).css('backgroundImage', 'url('+attr.backImg+')');
            // $(element).css('backgroundSize', "cover");

            // FOR REAL API REQUEST 
            console.log("hey");
            console.log(element);
            $(element).css('background-image', "url("+attr.addImg+")");
        }
    }
})
.directive('displayIfImg', function(){
    /*----------------------------------------------
    | TO USE ON ANY TAG
    |
    | ng-if img is loaded
    |
    | attribute display-if-img="img"
    ------------------------------------------------*/
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            attr.$observe('backImgSize', function(value) {
                console.log($(element).siblings());
                var img = new Image;
                $(img).load(function () {
                    $(element).css("display", "block");
                });
                img.src = attr.displayIfImg;
            });
        }
    }
});