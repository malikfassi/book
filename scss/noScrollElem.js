.directive('noScrollelem', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            var elem=element;
            var parent=element.parent();
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
                if((parent.scrollTop()+parent.height()+10)>=elem.innerHeight() && direction>0){
                    e.preventDefault();
                    e.stopImmediatePropagation();
                }
                else if(parent.scrollTop()==0 && direction==0){
                    e.preventDefault();
                    e.stopImmediatePropagation();
                }
            });
            //mobile part
            /*var hammertime = new Hammer(parent[0]);
            console.log(hammertime);*/
            var position={};
            var handleStart=function(ev){
                var e = ev.originalEvent;
                //console.log(e);
                position={
                    "x":e.pageX,
                    "y":e.pageY
                };
            };
            var handleMove=function(ev){
                var e = ev.originalEvent;
                currentPos={
                    "x":e.pageX,
                    "y":e.pageY
                };
                if(currentPos.y!=position.y){
                    var deltaY=currentPos.y-position.y;
                    if(deltaY<0 && (parent.scrollTop()+parent.height()+10)>=elem.innerHeight()){
                        e.stopImmediatePropagation();
                        e.preventDefault();
                    }
                    else if(parent.scrollTop()<=5 && deltaY>0){
                        e.stopImmediatePropagation();
                        e.preventDefault();
                    }
                }
                var currentPos=e;
            }
            parent.bind("touchstart",handleStart);
            parent.bind("touchmove",handleMove);
        }
    }
})