'use strict';

angular.module(config.app.name)
.factory('$user', ["$http","$rootScope", "$dataFactory","$location", function ($http, $rootScope, $dataFactory, $location) {
	var user = {};
	user.getUser = function()
	{
		return (getCookie("user"));
	}
	user.setUser = function()
	{
		// console.log(getCookie("user"));
		user.user = JSON.parse(getCookie("user"));
	}
 	user.login = function (credentials, errors) {

        var error = function (data) {
	        setCookie("user", "1", -1);
	        user.isLogged=false;
	        errors(data.messages);
	        user.user = undefined;
	        // console.log($("input.login-input"));
	        $("#login-button-wrapper").effect("shake", {times:2, distance:6});
    	}

    	var success = function (data, status, headers, config) {
	        /*
	          var token = data.token;
	          */
			// document.cookie="user_id="+data.user.id+"; expires="Thu, 18 Dec 2013 12:00:00 UTC"; path=/";

	        if (data.status == 200)
	        {
			    user.isLogged=true;
			    user.user = data.user;
			    $rootScope.user = data.user;
			    // console.log(data);
			    setCookie("user", JSON.stringify(data.user), 2);//user.user for realapi
			    $location.path("/feed");
			    // console.log("hey");
			}
			else
			{
				errors(data.messages);
				user.user = undefined;
			}
  	    };
  	    //for json 
  	    $http.get("/ita-access/app/data/people.json").success(function(data){
  	    	console.log(data);
  	    	data.user = data.feed[0];
  	    	success(data);
  	    }).error(function(data) {
  	    	console.log("error");
  	    });

        //$dataFactory.post("auth/login", credentials, success, error); //for real api
      }
    user.logout = function()
    {
        setCookie("user", "1", -1);
        user.isLogged=false;
    	$rootScope.loading = true;
        $location.path("/");
    	user.user = undefined;
    }
  return user;
}]);