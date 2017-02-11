'use strict';

angular.module(config.app.name).directive('popup', function(){
    return {
    	restrict: 'A',
    	link: function (scope, element, attr) {
            var lauched = false;
           /* element.bind("click", function(e){
                event.preventDefault();
                e.stopPropagation();
                if ($(".popup").css("max-height") == "0px" && !lauched)
                {
                    lauched = true;
                    $("#mask").fadeIn("slow");
                    console.log(attr.popup);
                    $(attr.popup).animate(
                    {
                        "max-height" : attr.height + "px",
                        "max-width" : attr.width + "px",
                        "margin-top": (parseInt(-attr.height)/2).toString()+'px',
                        "margin-left": (parseInt(-attr.width)/2).toString()+'px'
                    },
                    "200",
                    'easeInOutElastic'
                    , function()
                    {
                        lauched = false;
                    });
                }*/
                /*
                $("body").click(function(event)
                {
                    event.preventDefault();
                    event.stopPropagation();
                    if ($(".popup").css("max-height") != "0px" && $(event.target).closest(".popup").length == 0 && !lauched)
                    {
                        lauched = true;
                        $("#mask").fadeOut("slow");
                        $(".popup").animate(
                            {
                               "max-height" : "0px",
                               "max-width" : "0px",
                               "margin-top": "0px",
                               "margin-left": "0px"
                            },
                            "100",
                            'easeInOutElastic',
                            function(){
                                lauched=false;
                                console.log("youhou j'ai fermé");
                            });

                    }
                })*/
            }
        }
});