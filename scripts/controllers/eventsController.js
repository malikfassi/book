angular.module(config.app.name)
.controller('eventsController', ["$location", "$rootScope", "$scope", "$dataFactory", "$http", function ($location, $rootScope, $scope, $dataFactory, $http) {
	$scope.selectEvent = function(event, type)
	{
		$scope.selectedData = event;
		$scope.popup = type;
		console.log($scope.selectedData);
	}
	$scope.commentEvent = function()
	{
		var success = function(data)
		{
			console.log(data.comment);
			data.comment.picture_url_thumb = $rootScope.user.picture_url_thumb;
			data.comment.from_name = $rootScope.user.first_name + " " + $rootScope.user.last_name; 
			$scope.selectedData.comments.user_comments.push(data.comment);
			$scope.selectedData.comments.total_comments += 1;
			$scope.comment = "";
		}
		var error = function()
		{
			console.log ("oooh");
		}
		var data = {
			user_id : $rootScope.user.id,
			activity_id : $scope.selectedData.activity_id,
			comment : $scope.comment
		}
		$dataFactory.post("comments/create", data,success, error);
	}
	$scope.likeEvent = function()
	{
		var success = function(data)
		{
			if ($scope.selectedData.liked) //(if you unlike post)
			{
				$scope.selectedData.likes.total_likes -= 1; 

				$scope.selectedData.likes.user_likes.forEach(function(entry)
				{
						if (entry.user_id = 1) //(remove your like from list)
						{
							remove($scope.selectedData.likes.user_likes, entry);
							return (false);
						}
					});
			}
			else //(if you like a post)
			{
				$scope.selectedData.likes.total_likes += 1;
				//construct data for html binding data
				data.like.picture_url_thumb = $rootScope.user.picture_url_thumb;
				data.like.from_name = $rootScope.user.first_name + " " + $rootScope.user.last_name;
				//add like in user_likes list
				$scope.selectedData.likes.user_likes.push(data.like);
			}
			$scope.selectedData.liked = !$scope.selectedData.liked;
		}
		var error = function(data)
		{
			console.log("oooh");
			console.log(data);
		}
		var data = {
			user_id : $rootScope.user.id,
			activity_id : $scope.selectedData.activity_id
		}
		var url = ($scope.selectedData.liked ? "likes/unlike" : "likes/create");
		$dataFactory.post(url, data, success, error);
	}
	var success = function(data){
		console.log(data);
		$scope.contents = data.feed;
		console.log("length ="+$scope.contents.length);

		$scope.contents.forEach(function(content){
			content.likes.user_likes.forEach(function(like){
				var successLike = function(data)
				{
					like.picture_url_thumb = data.user.picture_url_thumb;
				}
				var errorLike = function(data)
				{
					console.log("oh non :( !")
				}
				var data = {
					user_id : like.user_id
				}
				//$dataFactory.post("users/profile", data, successLike, errorLike);
			});
		});
		$scope.errors = [];
		$rootScope.loading = false;
	}
	var error = function (data) {
		$scope.errors = [];
		$scope.errors.join(data.messages);
		$rootScope.loading = false;
	}
	$scope.getStory = function()
	{
		if ($scope.story == 'top')
			$scope.story = 'all';
		else
			$scope.story = 'top';
		$location.search("story", $scope.story);
		loadMainData();
	}
	var loadMainData = function()
	{
		console.log("yeah");
    	var page = (!isNaN(parseInt($location.search().page)) ? parseInt($location.search().page) : 1);
		$scope.previous_page = (page == 1 ? 0 : page - 1);
		$scope.next_page = parseInt(page) + 1;
		$rootScope.loading = true;
		$scope.story = (!$location.search().story ? 'all' : $location.search().story);
		var data = {
			user_id: $rootScope.user.id,
			subject: '{"filter":[4]}',
			page: page,
			orderby: $scope.story
		};

		$http.get("/ita-access/app/data/events.json").success(function(data){
  	    	console.log(data);
  	    	success(data);
  	    }).error(function(data) {
  	    	console.log("error");
  	    });
		
		//for real api
		//$dataFactory.post("feeds", data, success, error);

	}
	var init = function() {
		loadMainData();
		console.log("het");
	}
	init();
}])
.controller('eventController', ["$rootScope", "$scope", "$dataFactory", function ($rootScope, $scope, $dataFactory) {
	var init = function()
	{   
		$scope.show = false;//show more data about attendees
		$scope.init = function(current_event)
		{
			$scope.current_event = current_event;

			$scope.current_event.attending_list = [];
			$scope.current_event.invited_list = [];
			$scope.current_event.maybe_list = [];
			$scope.current_event.not_attending_list = [];

			$scope.current_event.entry.attendees.forEach(function(attendee){
				$scope.current_event.is_attending = -1;//setup default value (not invited)
				if (attendee.user.user_id == $rootScope.user.id)
				{
					//I found myself in the attendees
					$scope.current_attendee = attendee;
					$scope.current_event.is_attending = (attendee.status == "attending" ? 0 : $scope.current_event.is_attending);
					$scope.current_event.is_attending = (attendee.status == "maybe" ? 1 : $scope.current_event.is_attending);
					$scope.current_event.is_attending = (attendee.status == "not attending" ? 2 : $scope.current_event.is_attending);
				}
				if (attendee.status == "attending")
					$scope.current_event.attending_list.push(attendee);
				if (attendee.status == "maybe")
					$scope.current_event.maybe_list.push(attendee);
				if (attendee.status == "not attending")
					$scope.current_event.not_attending_list.push(attendee);
				if (attendee.status == "invited")
					$scope.current_event.invited_list.push(attendee);
			});
		}
		$scope.rsvp = function (id)
		{
			var status;
			var rsvp_list = ["attending", "maybe", "not attending"];
			if ($scope.current_event.is_attending == id)
			{
				if (id == 0)
					remove($scope.current_event.attending_list, $scope.current_attendee);
				else if (id == 1)
					remove($scope.current_event.maybe_list, $scope.current_attendee);
				else if (id == 2)
					remove($scope.current_event.not_attending_list, $scope.current_attendee);
				status = "invited";
				$scope.current_event.is_attending = -1;
				$scope.current_event.invited_list.push($scope.current_attendee);
			}
			else
			{
				if ($scope.current_event.is_attending == 0)
					remove($scope.current_event.attending_list, $scope.current_attendee);
				else if ($scope.current_event.is_attending == 1)
					remove($scope.current_event.maybe_list, $scope.current_attendee);
				else if ($scope.current_event.is_attending == 2)
					remove($scope.current_event.not_attending_list, $scope.current_attendee);
				remove($scope.current_event.invited_list, $scope.current_attendee);
				if (id == 0)
					$scope.current_event.attending_list.push($scope.current_attendee);
				else if (id == 1)
					$scope.current_event.maybe_list.push($scope.current_attendee);
				else if (id == 2)
					$scope.current_event.not_attending_list.push($scope.current_attendee);
				status = rsvp_list[id];
				$scope.current_event.is_attending = id;
			}
			var data = {
				user_id: $rootScope.user.id,
				event_id: $scope.current_event.entry.entry_id,
				status: status
			}
			var success = function()
			{
				console.log("youpie");
			}
			var error = function()
			{
				console.log("noooo :( ");
			}
			$dataFactory.post("events/event_status", data, success, error);
		}
	}
	init();
}]);