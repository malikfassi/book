'use strict';

/**
 * @ngdoc function
 * @name itaAccessApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the itaAccessApp
**/
angular.module(config.app.name)
.controller('MainCtrl', ["$scope", "$rootScope", "$location", "$dataFactory", "$user", "$http", function ($scope, $rootScope, $location, $dataFactory, $user, $http) {
	console.log(!getCookie("user"));
	if (getCookie("user") && JSON.parse(getCookie("user")))
		$user.isLogged = true;
	$rootScope.loading = true;
	$scope.selectMainGroupList = function()
	{
		//console.log($rootScope.user.groups);
		//console.log($scope.groups);
		$scope.groupTab = !$scope.groupTab;
		if ($scope.groupTab)
			$scope.selectedGroups = $rootScope.user.groups;
		else
			$scope.selectedGroups = $rootScope.groups;
	}
	$scope.selectMainGroup = function(group){
		$rootScope.mainGroup = group;
	}
	$scope.isLogged = function()
	{
		return ($user.isLogged);
	}
	$scope.logout = function()
 	{
    	$user.logout();
    }
    $scope.tab_not_selected = function()
	{
		$scope.tab = [false, false, false, false, false]; 
	}
	//Activate element on navbar disable others
	$scope.tab_active = function(index)
	{
		$scope.tab = [false, false, false, false, false];
		if (!$scope.tab[index])
		{
			$scope.tab = [false, false, false, false, false];
			$scope.tab[index] = true;
		}
	}

	var getGlobalData = function()
	{
		var success_all_groups = function(data){
			// console.log(data);
			// console.log("all_groups");
		    $rootScope.groups = data.groups;
		    $rootScope.toCall--;
		}
		var success_my_groups = function(data){
			// console.log(data);
		    $rootScope.user.groups = data.groups.splice(1, 4);
		    $rootScope.allGroups = data.groups;
		    // console.log($rootScope.user.groups);
		    // console.log("my groups");
		    $scope.selectedGroups = $rootScope.user.groups;
		    $rootScope.toCall--;
		    $rootScope.mainGroup = false;
		}
		var success_notif = function(data)
		{
			// console.log(data);

			var notifications = {
			 	user_commented_on_your_post: ["has commented your", false], 
			 	user_has_accepted_group_invitation:["is now a member of", true],
			 	admin_request_denied_by_user: ["has been denied request to join", true],
			 	invited_to_group : ["invited you to join", true],
			 	user_joined_group : ["joined the group", true],
			 	request_to_join_group : ["requested to join", true],
				accepted_to_group : ["has been accepted to join", true],
				user_liked_your_post : ["liked your", false],
				user_request_denied_by_admin : ["admin denied your request", true]
 			};
			$rootScope.notifications = data.notifications;
			$rootScope.notifications.forEach(function(elem, index){
				elem.notif = notifications[elem.kind][0];
				// console.log(elem.notif);
				if (notifications[elem.kind][1])
					elem.subject = elem.subject_to.name;
				else
					elem.subject = "post";
				elem.date = timeDifference(elem.created_at);

			});
		}
		var error = function(data){
			// console.log(":(");
		}
		var data = {
			user_id: $rootScope.user.id
		};
		$rootScope.toCall=2;

	  	//for json 
  	    $http.get("/ita-access/app/data/allgroups.json").success(function(data){
  	    	var mygroups = data.data;
  	    	data.groups = mygroups;
  	    	success_all_groups(data);
  	    }).error(function(data) {
  	    	console.log("error");
  	    });
  	    	  	//for json 
  	    $http.get("/ita-access/app/data/allgroups.json").success(function(data){
  	    	var mygroups = data.data.splice(1, 4);
  	    	data.groups = mygroups;
  	    	success_my_groups(data);
  	    }).error(function(data) {
  	    	console.log("error");
  	    });
  	    $http.get("/ita-access/app/data/notifications.json").success(function(data){
  	    	console.log(data);
  	    	data.notifications = data.data;
  	    	success_notif(data);
  	    }).error(function(data) {
  	    	console.log("error");
  	    });

		//for real api
        //$dataFactory.post("groups", data, success_all_groups, error);
        //$dataFactory.post("groups/user_groups", data, success_my_groups, error);
        //$dataFactory.post("notifications_data", data, success_notif, error);
	}

	var setTab = function()
	{
		var current_loc = $location.path().replace("/", "");
		if (beginsWith("feed", current_loc))
			$scope.tab_active(0);
		else if (beginsWith("events", current_loc))
			$scope.tab_active(1);
		else if (beginsWith("photos", current_loc))
			$scope.tab_active(2);	
		else if (beginsWith("people", current_loc))
			$scope.tab_active(3);
		else
			$scope.tab_not_selected();
	}

	var checkCookies = function()
	{
		console.log(getCookie("user"));
		if (!getCookie("user") || !JSON.parse(getCookie("user")))
		{
			//user not in cookie
			// console.log("user not in cookie")
			$scope.logout();
			return (false);
		}
		else
		{
			//user is in cookie
			// console.log("user in cookie");
			$user.setUser();

			if (!$rootScope.user)
			{
				// console.log("hey");
				$rootScope.user = JSON.parse(getCookie("user"));
			}
			// console.log($rootScope.user);
			if ($location.path() == "/")
				$location.path("/feed");
			return (true);
		}
	}
	$scope.$on('$routeChangeStart', function(next, current) { 
 		if (checkCookies())
 		{
	 		setTab();
			getGlobalData();
		}
	});
 	var init = function ()
 	{
 		$scope.groupTab = false;
 		// console.log($rootScope);
 		$scope.dropdowns_elem = [];
 		$scope.clickFunc = false;
 		$scope.launched = false;
		$scope.tab = [false, false, false, false, false];
	}
	init();
}]);