'use strict',
angular.module(config.app.name)
.directive('dropdown', function($rootScope)
{
    var opened = [];
    return {
        scope: false,
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.closeDrop = function(){
                var i = 1;
                for(var key in scope.dropdowns_elem)
                {
                    if (key == "customDrop")
                    {
                        opened.forEach(function(entry)
                        {
                            // console.log(i);
                            i++;
                            entry.close();
                        });
                        opened = [];
                    }
                    else if (scope.dropdowns_elem[key][0] && scope.dropdowns_elem[key][1] && scope.dropdowns_elem[key][1].css("display") == "block")
                    {
                        scope.dropdowns_elem[key][1].fadeOut("fast");
                    }
                }
            }
            //if clicked element is dropdown parent or child
            if (attrs.parent) //element is the dropdown itself
            {
                if (!scope.dropdowns_elem[attrs.parent])
                    scope.dropdowns_elem[attrs.parent] = [];
                scope.dropdowns_elem[attrs.parent][1] = element;
            }
            else if (attrs.child) //element is the button triggering the dropdown
            {
                if (!scope.dropdowns_elem[attrs.child])
                    scope.dropdowns_elem[attrs.child] = [];
                scope.dropdowns_elem[attrs.child][0] = element;
                element.bind("click", function() //open or close dropdowns
                {
                    scope.closeDrop();
                    if (scope.dropdowns_elem[attrs.child][1].css("display") == "none")
                    {
                        scope.dropdowns_elem[attrs.child][1].fadeIn("slow");
                        $("#mask").stop().fadeIn("slow");
                    }
                    else
                        $("#mask").stop().fadeOut("fast");
                    if ($("#mask").css("display") == "none")
                    {
                        $("#mask").stop().fadeIn("slow");
                    }
                });
            }
            else // if clicked element is popup or navbar
            {
                if (!scope.dropdowns_elem["customDrop"])
                    scope.dropdowns_elem["customDrop"] = [];
                scope.dropdowns_elem["customDrop"].push(element);
                if (element.attr("custom-menu")) //if clicked element is navbar
                {
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
                    var size='80%'; //size of lateral menu
                    var time=600; //time in millisecond of animation               
                    element.open=function()//open lateral menu
                    {
                        // console.log("element");
                        // console.log(element);
                        // console.log(wrapper.css("left"));
                        // console.log(wrapper.css("right"));
                        if (wrapper.css(otherposition) != "auto") // if other menu is open
                        {
                            //othermenu.stop().animate({"width":"0%"},time);
                            if (otherposition == "left") //close left menu
                            {
                                //$("#mask").stop().fadeIn("fast"); //add mask
                                othernav.animate({"left":"0%"},time);
                                wrapper.animate({"left":"0%"},{
                                    duration:time,
                                    complete:function()
                                    {
                                        menu.css("z-index", 0);
                                        menu.css("display", "block");
                                        othermenu.css("z-index", -1);
                                        othermenu.css("display", "none");
                                        //menu.animate({"width":size},time);
                                        nav.animate({"right":size},time);
                                        wrapper.css("left", "");
                                        wrapper.animate({"right":size},time, function(){
                                            menu.css("z-index", 1);
                                        });
                                    }
                                });
                            }
                            else { //close right menu
                                //$("#mask").stop().fadeIn("fast"); //add mask
                                othernav.animate({"right":"0%"},time);//close othermenu
                                wrapper.animate({"right":"0%"},
                                {
                                    duration: time,
                                    complete: function()
                                    {
                                        menu.css("z-index", 0);
                                        menu.css("display", "block");
                                        othermenu.css("z-index", -1);
                                        othermenu.css("display", "none");
                                        //then open actual menu
                                        nav.animate({"left":size},time);
                                        wrapper.css("right", "");
                                        wrapper.animate({"left":size},time, function(){
                                            menu.css("z-index",1);
                                        });
                                    }
                                });
                            }
                            var index = checkIfInOpened(opened, othernav)
                            if (index > -1) {
                                opened.splice(index, 1);
                            }
                        }
                        else //other menu is not open
                        {
                            //open menu
                            //menu.stop().animate({"width":size},time);
                            // console.log("open menu");
                            if (position == "left") //left
                            {
                                menu.css("display", "block");
                                othermenu.css("z-index", -1);
                                othermenu.css("display", "none");
                                nav.animate({"left":size},time);
                                wrapper.animate({"left":size},time, function(){
                                    menu.css("z-index", 1);
                                });
                            }
                            else //right
                            {
                                menu.css("z-index", 0);
                                menu.css("display", "block");
                                othermenu.css("z-index", -1);
                                othermenu.css("display", "none");
                                nav.animate({"right":size},time);
                                wrapper.animate({"right":size},time, function(){
                                    menu.css("z-index", 1);
                                });
                            }
                            //$("#mask").stop().fadeIn("slow"); //add mask
                        }
                        opened.push(element);
                    }
                    element.close = function()//close lateral menu
                    {
                        if (wrapper.css(position) != "auto")
                        {
                            if (position == "left")//If close menu-left
                            {
                                menu.css("z-index",0);
                                wrapper.animate({"left":"0px"},time,function(){
                                    wrapper.css("left", "");
                                    menu.css("z-index", -1);
                                    menu.css("display", "none");
                                });
                                nav.animate({"left":"0%"},time);
                                //$("#mask").stop().fadeOut("slow");
                            }
                            else { // else close menu right
                                menu.css("z-index",0);
                                wrapper.animate({"right":"0px"},time,function(){
                                    wrapper.css("right", "");
                                    menu.css("z-index", -1);
                                    menu.css("display", "none");
                                });
                                nav.animate({"right":"0%"},time);
                                //$("#mask").stop().fadeOut("slow");
                            }
                        }
                        var index = checkIfInOpened(opened, othernav)
                        if (index > -1) {
                            opened.splice(index, 1);
                        }
                    };
                    //RESIZE
                    function preventResize() { //close lateral menu if it is open and you resize to a non responsive size.
                        if ($(window).width() > 768)
                        {
                            if(menu.css("width") != "0px"){
                                element.close();
                            }
                        }
                    };
                    $(window).resize(function() {
                        preventResize();
                    });
                    /*$('body').on('touchmove', function (e) 
                    {
                        if ($(e.target).closest("#page-wrap").length == 0)
                            e.preventDefault();
                    });*/
                    element.bind("click",function(){
                        //handle open close
                        scope.closeDrop();
                        if(wrapper.css(position) == "auto"){
                            element.open();
                        }else{
                            element.close();
                        }
                    });
                }
                else //element is popup
                {
                    var index;
                    if (Modernizr.touch)
                        attrs.height -= (50/$(window).innerHeight()) *100;
                    element.close = function()
                    {
                        $rootScope.displayClose = 0;
                        $rootScope.$apply();
                        if (!$(attrs.popup).is(':animated') && ($(attrs.popup).css("max-height") != "0px" && $(attrs.popup).css("max-height") != undefined))
                        {
                            scope.popup = -1;
                            $("#mask").stop().fadeOut(800);
                            //$("mask").show();
                            $(attrs.popup).fadeOut(800);
                            var index = opened.indexOf(element);
                            if (index > -1) {
                                opened.splice(index, 1);
                            }
                        }
                    }
                    element.open = function()//open popup
                    {
                        $rootScope.displayClose = 1;
                        $rootScope.$apply();
                        if (!$(attrs.popup).is(':animated')) 
                        {
                            $("#mask").stop().fadeIn(800);
                            var popup=$(attrs.popup);
                            popup.hide();
                            popup.fadeIn(800);
                            var updatePopup = function()
                            {
                                var top_offset = 100;
                                if ($(window).width() < 768)
                                    top_offset = 50;


                                var left_offset = 60; //60 px for round-close button X
                                var margin_around_popup = 40; //10 margin-top 10 margin-bottom
                                var max_height = $(window).height() - margin_around_popup - top_offset;
                                var width = parseInt(attrs.width, 10);
                                if (attrs.width.substr(attrs.width.length - 1) == '%')
                                    width = attrs.width;//if percentage

                                if (parseInt(popup.height(), 10) < max_height)
                                    margin_around_popup = 0; 
                                var top = ($(window).height() - top_offset)/2 + top_offset;
                                popup.css("top", top + "px");
                                popup.css("max-height", max_height + "px");
                                $("div[id$='-popup'],div[id*='-popup ']").css("max-height", max_height + "px");
                                popup.css("width", width);
                                scope.$emit("popupOpened");

                                var margin_top = -(popup.height()/2);

                                popup.css("margin-top", margin_top);
                                popup.css("margin-left", -parseInt(popup.width(), 10)/2); 
                            }
                            updatePopup();
                            $(window).resize(function() {
                                updatePopup();
                            });
                            opened.push(element);
                        }
                    }
                    element.bind("click", function(e)
                    {
                        scope.closeDrop();
                        if (!$(attrs.popup).is(':animated'))
                            element.open();
                    });
                }
            }
            element.bind("click",function(e){
                e.stopPropagation();
            });
            if (!scope.clickFunc)
            {
                // console.log("hey");
                //Catch click on page and disable dropdowns
                $('body').click(function(e)
                {
                    if (!$( "*" ).is(":animated"))
                    {
                        var isFocused = false;
                        for(var key in scope.dropdowns_elem)
                        {
                            if ($(e.target).closest(scope.dropdowns_elem[key][0]).length != 0 || $(e.target).closest(scope.dropdowns_elem[key][1]).length != 0)
                            {
                                isFocused = true;
                                break;
                            }
                        }
                        if(!isFocused)
                        {
                            scope.closeDrop();
                            if ($("#mask").css("display") == "block")
                            {
                                $("#mask").stop().fadeOut("fast");
                            }
                        }
                    }
                });
                $(".nav-click").bind("click", function(){ //close lateral menu if clicked on link
                    var menuLeft, navLeft, wrapper, positionLeft, menuRight, navRight, positionRight;

                    menuLeft = $("#menu-left");
                    navLeft = $("#resp-navbar-left");
                    wrapper=$("#page-wrap");
                    positionLeft="left";
                    menuRight = $("#menu-right");
                    navRight = $("#resp-navbar-right");
                    wrapper=$("#page-wrap");
                    positionRight="right";
                    scope.closeDrop();

                    if (menuLeft.css("width") != "0px")
                        scope.closeDrop();
                    if (menuRight.css("width") != "0px")
                        scope.closeDrop();
                });
                $(".drop-click").bind("click", function(){ //clsoe dropdown if clicked on link
                    // console.log("hey");
                    scope.closeDrop();
                    // console.log("hey2");
                    $("#mask").stop().fadeOut("fast");
                    // console.log("hey3");
                });
                scope.clickFunc = true;
            }
        }   
    }
});