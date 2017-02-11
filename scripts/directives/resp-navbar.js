'use strict';

/*angular.module(config.app.name).directive('customMenu', function(){});*/
/*    var size=190;
    var duration=600;
    var functionOpen=function(menu,nav,wrapper,position, othermenu, othernav, otherposition){
        if (othermenu.css("width") != "0px")
        {
            var time=duration;
            $(window).scrollTop(0);
            othermenu.animate({"width":"0%"},time);
            if (otherposition == "left")
            {
                othernav.animate({"left":"0%"},time);
                wrapper.animate({"left":"0%"},{duration:time, complete:function(){
                    menu.animate({"width":size},duration);
                    nav.animate({"right":size},duration);
                    wrapper.css("left", "");
                    wrapper.animate({"right":size},duration);            
                }});
            }
            else {
                othernav.animate({"right":"0%"},time);
                wrapper.animate({"right":"0%"},{duration:time, complete:function(){
                    menu.animate({"width":size},duration);
                    nav.animate({"left":size},duration);
                    wrapper.css("right", "");
                    wrapper.animate({"left":size},duration);            
                }});
            }
        }
        else 
        {
            menu.animate({"width":size},duration);
            if (position == "left")
            {
                nav.animate({"left":size},duration);
                wrapper.animate({"left":size},duration);
            }
            else 
            {
                nav.animate({"right":size},duration);
                wrapper.animate({"right":size},duration); 
            }
        }
        $("#mask").fadeIn("slow");
        $('body').on('touchmove', function (e) {
            if ($(e.target).closest("#page-wrap").length == 0)
                e.preventDefault();
        });

        /*
        CSS VERSION (less compatibility)
        menu.css("width",size);
        nav.css("left",size);
        wrapper.css("left",size);*/

        //disable the body to scroll
        //disableScroll("x");
    /*};
    var functionClose=function(menu,nav,wrapper,position,fast){
        var time=duration;
        if(fast){
            menu.css("width","0%");
            if (position == "left")
            {   
                nav.css("left","0%");
                wrapper.css("left","0px");
                wrapper.css("left", "");
            }
            else {
                nav.css("right","0%");
                wrapper.css("right","0px");
                wrapper.css("right", "");
            }
            $("#mask").fadeOut("fast");
        }
        else{
            menu.animate({"width":"0%"},time);
            if (position == "left")
            {
                nav.animate({"left":"0%"},time);
                wrapper.animate({"left":"0px"},{duration:time, queue: false, complete: function(){
                    wrapper.css("left", "");
                    $("#mask").fadeOut("fast");
                }})    
            }
            else {
                nav.animate({"right":"0%"},time);
                wrapper.animate({"right":""},{duration:time, complete: function(){
                    wrapper.css("right", "");
                    $("#mask").fadeOut("fast");
                }})
            }
        }
        //allow the body to scroll
      //  enableScroll("x"  }
    };
    return function(scope, element, attrs){
        element.bind("click",function(){

            var menu,wrapper,nav, position, othermenu, othernav, otherposition;
            //get the three elements: (the wrapper, the static nav bad, the menu)
            if (attrs.position != "")
                position=attrs.position;
            else
                position="left";
            if (position == "left")
                otherposition = "right"
            else
                otherposition = "left";
            if(attrs.customMenu!="")
                menu=$("#"+attrs.customMenu);
            else
                menu=$("#menu-"+position);
            othermenu=$("#menu-"+otherposition);
            if(attrs.wrapper!="")
                wrapper=$("#"+attrs.wrapper);
            else
                wrapper=$("#wrapper");
            if(attrs.navBar!="")
                nav=$("#"+attrs.navBar);
            else
                nav=$("#resp-navbar-"+position);
            othernav=$("#resp-navbar-"+otherposition);
            console.log("clicked on " +position);
            //handle open close
            if(menu.css("width") == "0px"){
                console.log("open");
                functionOpen(menu,nav,wrapper, position, othermenu, othernav, otherposition);
            }else{
                console.log("close");
                functionClose(menu,nav,wrapper, position);
            }

            function preventResize() {
                if ($(window).width() > 768)
                {
                    if(menu.css("width") != "0px"){
                        console.log("ohlala resize");
                        functionClose(menu,nav,wrapper, position, true);
                    }
                }
            };

            $(window).resize(function() {
                preventResize();
            });
        });
        $(".nav-click").bind("click", function(){
            var menuLeft, navLeft, wrapper, positionLeft, menuRight, navRight, positionRight;

            menuLeft = $("#menu-left");
            navLeft = $("#resp-navbar-left");
            wrapper=$("#page-wrap");
            positionLeft="left";
            menuRight = $("#menu-right");
            navRight = $("#resp-navbar-right");
            wrapper=$("#page-wrap");
            positionRight="right";
            if (menuLeft.css("width") != "0px")
                functionClose(menuLeft,navLeft,wrapper, positionLeft);
            if (menuRight.css("width") != "0px")
                functionClose(MenuRight, navRight, wrapper, positionRight);

        });
    };
})*/