/*'use strict',
angular.module(config.app.name)
.directive('dropdown', function()
{
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.closeDrop = function(){
                for(var key in scope.dropdowns_elem)
                {
                    if (key == "customDrop")
                    {
                        var i = 0;
                        scope.dropdowns_elem["customDrop"].forEach(function(entry)
                            {
                                entry.close();
                            })
                    }
                    else if (scope.dropdowns_elem[key][1] && scope.dropdowns_elem[key][1].css("display") == "block")
                        scope.dropdowns_elem[key][1].fadeOut("fast");
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
                        scope.dropdowns_elem[attrs.child][1].fadeIn("slow");
                    else
                        $("#mask").fadeOut("fast");
                    if ($("#mask").css("display") == "none")
                        $("#mask").fadeIn("slow");
                });
            }
            else // if clicked element is popup or navbar
            {
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
                    console.log(menu);
                    if (!scope.dropdowns_elem["customDrop"])
                        scope.dropdowns_elem["customDrop"] = [];
                    var size=190; //size of lateral menu
                    var time=600; //time in millisecond of animation               
                    element.open=function()//open lateral menu
                    {
                        if (othermenu.css("width") != "0px") // if other menu is open
                        {
                            $(window).scrollTop(0);
                            othermenu.animate({"width":"0%"},time);
                            if (otherposition == "left") //close left menu
                            {
                                othernav.animate({"left":"0%"},time);
                                var animation = 
                                {
                                    duration:time,
                                    complete:function()
                                    {
                                        menu.animate({"width":size},time);
                                        nav.animate({"right":size},time);
                                        wrapper.css("left", "");
                                        wrapper.animate({"right":size},time);            
                                    }
                                }
                                wrapper.animate({"left":"0%"},animation);
                            }
                            else { //close right menu
                                othernav.animate({"right":"0%"},time);//close othermenu
                                var animation = 
                                {
                                    duration: time,
                                    complete: function()
                                    {
                                        //then open actual menu
                                        menu.animate({"width":size},time);
                                        nav.animate({"left":size},time);
                                        wrapper.css("right", "");
                                        wrapper.animate({"left":size},time);            
                                    }
                                }
                                wrapper.animate({"right":"0%"},animation);
                            }
                        }
                        else //other menu is not open
                        {
                            //open menu
                            menu.animate({"width":size},time);
                            if (position == "left") //left
                            {
                                nav.animate({"left":size},time);
                                wrapper.animate({"left":size},time);
                            }
                            else //right
                            {
                                nav.animate({"right":size},time);
                                wrapper.animate({"right":size},time); 
                            }
                            $("#mask").fadeIn("slow"); //remove mask
                        }
                    }
                    element.close = function()//close lateral menu
                    {
                        menu.animate({"width":"0%"},time);
                        if (position == "left")//If close menu-left
                        {
                            nav.animate({"left":"0%"},time);
                            var animation = 
                            {
                                duration:time,
                                complete: function()
                                {
                                    wrapper.css("left", "");
                                    $("#mask").fadeOut("fast");
                                }
                            }
                            wrapper.animate({"left":"0px"},animation);   
                        }
                        else { // else close menu right
                            nav.animate({"right":"0%"},time);
                            var animation = {
                                duration:time,
                                complete: function(){
                                    wrapper.css("right", "");
                                    $("#mask").fadeOut("fast");
                                }
                            }
                            wrapper.animate({"right":""},animation);
                        }
                    };
                    //RESIZE
                    function preventResize() { //close lateral menu if it is open and you resize to a non responsive size.
                        if ($(window).width() > 768)
                        {
                            if(menu.css("width") != "0px"){
                                functionClose(menu,nav,wrapper, position);
                            }
                        }
                    };
                    $(window).resize(function() {
                        preventResize();
                    });
                    $('body').on('touchmove', function (e) 
                    {
                        if ($(e.target).closest("#page-wrap").length == 0)
                            e.preventDefault();
                    });
                    scope.dropdowns_elem["customDrop"].push(element);
                    element.bind("click",function(){
                        console.log("clicked on " +position);
                        //handle open close
                        if(menu.css("width") == "0px"){
                            console.log("open");
                            element.open();
                        }else{
                            console.log("close");
                            element.close();
                        }
                    });
                }
                else //element is popup
                {
                    var launched = false;
                    element.close = function()
                    {
                        if (!launched)
                        {
                            launched = true;
                            $("#mask").fadeIn("slow");
                            $(attrs.popup).animate(
                            {
                                "max-height" : "0px",
                                "max-width" : "0px",
                                "margin-top": "0px",
                                "margin-left": "0px"
                            },
                            "200",
                            'easeInOutElastic'
                            , function()
                            {
                                launched = false;
                            });
                        } 
                    }
                    element.open = function()
                    {
                        if (!launched)
                        {
                            launched = true;
                            $("#mask").fadeIn("slow");
                            $(attrs.popup).animate(
                            {
                                "max-height" : attrs.height + "px",
                                "max-width" : attrs.width + "px",
                                "margin-top": (parseInt(-attrs.height)/2).toString()+'px',
                                "margin-left": (parseInt(-attrs.width)/2).toString()+'px'
                            },
                            "200",
                            'easeInOutElastic'
                            , function()
                            {
                                launched = false;
                            });
                        }
                    }
                    element.bind("click", function(e)
                    {
                        scope.closeDrop();
                        if ($(attrs.popup).css("max-height") == "0px" && !launched)
                            element.open();
                    });
                }
            }
            element.bind("click",function(e){
                e.stopPropagation();
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
                if (menuLeft.css("width") != "0px")
                    functionClose(menuLeft,navLeft,wrapper, positionLeft);
                if (menuRight.css("width") != "0px")
                    functionClose(MenuRight, navRight, wrapper, positionRight);
            });
            $(".drop-click").click(function(){ //clsoe dropdown if clicked on link
                scope.closeDrop();
                $("#mask").fadeOut("fast");
            });
            if (!scope.clickFunc)
            {
                //Catch click on page and disable dropdowns
                $('body').click(function(e)
                {
                    var isFocused = false;
                    console.log(scope.dropdowns_elem);
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
                        console.log("closedorp");
                        if ($("#mask").css("display") == "block")
                        {
                            console.log("fade");
                            $("#mask").fadeOut("fast");
                        }
                    }
                });
                scope.clickFunc = true;
            }
        }   
    }
});
*/