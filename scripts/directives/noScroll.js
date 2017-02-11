'use strict';

angular.module(config.app.name).directive('noScroll', ["$rootScope",function ($rootScope) {
    /*----------------------------------------------
    | TO USE ON A ELEMENT
    |
    | disable the propagation of the scroll
    |
    | The parameter no-scroll is the element where you want to scroll without propagation while element is 
    | the element that will be scrolled
    |
    | <div class="wrapper">....
    |   <div class="content" no-scroll="wrapper">...</div>
    | </div>
    ----------------------------------------------*/
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            var elem=element;
            var parent=$("#"+attr.noScroll);
        }}}]);
            /*
            Desktop part
            */
            /*
            parent.bind('mousewheel DOMMouseScroll', function(e) {
                var direction=0;
                if(e.type=="DOMMouseScroll"){
                    if(e.originalEvent.detail > 0){
                        //down
                        direction=1;
                    }
                }
                if(e.type=="mousewheel"){
                    if(e.originalEvent.wheelDelta  < 0){
                        //down
                        direction=1;
                    }
                }
                //If at the end=>stop propagation (10 is a security)
                if((parent.scrollTop()+parent.height()+10)>=elem.innerHeight() && direction>0){
                    e.preventDefault();
                    e.stopImmediatePropagation();
                }
                else if(parent.scrollTop()<=5 && direction==0){
                    e.preventDefault();
                    e.stopImmediatePropagation();
                }
            });
            //mobile part
            var position={};
            var handleStart=function(ev){
                var e = ev.originalEvent;
                position={
                    "x":e.touches[0].pageX,
                    "y":e.touches[0].pageY
                };
                console.log("started");
                console.log(position);
            };
            var handleMove=function(ev){
                var e = ev.originalEvent;
                var currentPos={
                    "x":e.touches[0].pageX,
                    "y":e.touches[0].pageY
                };
                var deltaY=currentPos.y-position.y;
                if(deltaY!=0){
                    var rapp=1.0;
                    console.log("scrolled");
                    parent.scrollTop(parent.scrollTop()-(Math.round(deltaY*rapp)));
                    position=currentPos;
                }
                e.preventDefault();
            }
            parent.bind("touchstart",handleStart);
            parent.bind("touchmove",handleMove);
        }
    }
}])*/