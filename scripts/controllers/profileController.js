angular.module(config.app.name)
.controller('profileController', ["$user", "$scope", "$rootScope", "$dataFactory", function ($user, $scope, $rootScope, $dataFactory) {

	var init = function(){
		$scope.errors = [];
		$scope.loadedData = "";
		$scope.edit = false;
		$scope.popup = -1;
		$scope.allGroups=[];
		
		getUserPictures();
		getUserPosts();
	}
	/*   EDIT PROFILE   */

	$scope.editProfile = function ()
	{
		if ($scope.edit)
		{
			$rootScope.loading = true;
			var data = {
				user_id : $rootScope.user.id,
			}
			if ($scope.newUser.first_name != $rootScope.user.first_name)
				data.first_name = $scope.newUser.first_name;
			if ($scope.newUser.last_name != $rootScope.user.last_name)
				data.last_name = $scope.newUser.last_name;
			if ($scope.newUser.website != $rootScope.user.website)
				data.website = $scope.newUser.website;
			if ($scope.newUser.office_no != $rootScope.user.office_no)
				data.office_no = $scope.newUser.office_no;
			if ($scope.newUser.mobile_no != $rootScope.user.mobile_no)
				data.mobile_no = $scope.newUser.mobile_no;
			if ($scope.newUser.job_title != $rootScope.user.job_title)
				data.job_title = $scope.newUser.job_title;
			if ($scope.newUser.department != $rootScope.user.department)
				data.department = $scope.newUser.department;
			if ($scope.newUser.picture_url_thumb != $rootScope.user.picture_url_thumb)
				data.picture = $scope.newUser.picture_url_thumb;            
			var success = function(data)
			{
				console.log(data);
				data.user.groups = $rootScope.user.groups;
				data.user.pictures = $rootScope.user.pictures;
				$rootScope.user = data.user;
				setCookie("user", JSON.stringify(data.user), 2);
				$user.setUser();
				$rootScope.loading = false;
				$scope.edit = 0;
			}
			var error = function(data)
			{
				console.log(":(");
				console.log(data);
			}
			$dataFactory.post("users/update", data, success, error);
		}
		$scope.edit = !$scope.edit;
	}
	/*   !EDIT PROFILE   */

	$scope.removePost = function(post)
	{
		var data = {
			user_id : $rootScope.user.id,
			object_id : post.entry.entry_id
		}
		var success = function(data)
		{
			console.log(data);
			console.log("youhuo");
			remove_with_id($rootScope.user.posts, post.entry.entry_id);//<== ATTENTION ENLEVER LA DATA DES DONNEES LOCALES
			/*
			data.user.groups = $rootScope.user.groups;
			data.user.pictures = $rootScope.user.pictures;
			$rootScope.user = data.user;
			setCookie("user", JSON.stringify(data.user), 2);
			$user.setUser();
			$rootScope.loading = false;
			$scope.edit = 0;*/
		}
		var error = function(data)
		{
			console.log(":(");
			console.log(data);
		}
		$dataFactory.post(post.type.toLowerCase() + "s/delete", data, success, error);
	}
	$scope.selectPost = function(post, type)
	{
		$scope.selectedPost = post;
		console.log(post);
		$scope.popup = type;
	}
	$scope.commentPost = function()
	{
		var success = function(data)
		{
			console.log(data.comment);
			data.comment.picture_url_thumb = $rootScope.user.picture_url_thumb;
			data.comment.from_name = $rootScope.user.first_name + " " + $rootScope.user.last_name; 
			$scope.selectedPost.comments.user_comments.push(data.comment);
			$scope.selectedPost.comments.total_comments += 1;
			$scope.comment = "";
		}
		var error = function()
		{
			console.log ("oooh");
		}
		var data = {
			user_id : $rootScope.user.id,
			activity_id : $scope.selectedPost.activity_id,
			comment : $scope.comment
		}
		$dataFactory.post("comments/create", data,success, error);
	}
	$scope.likePost = function()
	{
		var success = function(data)
		{
			if ($scope.selectedPost.liked) //(if you unlike post)
			{
			  	$scope.selectedPost.likes.total_likes -= 1; 

			  	$scope.selectedPost.likes.user_likes.forEach(function(entry)
			  	{
				   if (entry.user_id = $rootScope.user.id) //(remove your like from list)
				   {
				   	remove($scope.selectedPost.likes.user_likes, entry);
				   	return (false);
				   }
				});
			  }
			  else //(if you like a post)
			  {
			  	$scope.selectedPost.likes.total_likes += 1;
				//construct data for html binding data
				data.like.picture_url_thumb = $rootScope.user.picture_url_thumb;
				data.like.from_name = $rootScope.user.first_name + " " + $rootScope.user.last_name;
				//add like in user_likes list
				$scope.selectedPost.likes.user_likes.push(data.like);
			}
			$scope.selectedPost.liked = !$scope.selectedPost.liked;
		}
		var error = function(data)
		{
			console.log("oooh");
			console.log(data);
		}
		var data = {
			user_id : $rootScope.user.id,
			activity_id : $scope.selectedPost.activity_id
		}
		var url = ($scope.selectedPost.liked ? "likes/unlike" : "likes/create");
		$dataFactory.post(url, data, success, error);
	}

	var getUserPosts = function()
	{
		var data = {
			user_id: $rootScope.user.id,
			user_filter: $rootScope.user.id
		}
		var success = function(data)
		{
			console.log(data);
			$rootScope.user.posts = data.feed;
			if (data.feed.length < MAXPERPAGE)
				$scope.next_page = -1;
			$rootScope.user.posts.forEach(function(entry)
			{
				if (entry.type != "Event")
				{
					entry.date = timeDifference(entry.created_at);
					entry.likes.user_likes.forEach(function(like){
						var successLike = function(data)
						{
							like.picture_url_thumb = data.user.picture_url_thumb;
						}
						var errorLike = function(data)
						{
							console.log("oh non :( !");
							console.log(data);
						}
						var data = {
							user_id : like.user_id
						}
						$dataFactory.post("users/profile", data, successLike, errorLike);
					});
				}
			});
			$scope.error = "";
			$rootScope.loading = false;
		}
		var error = function(data)
		{
			console.log("error");
			console.log(data);
		}
		$dataFactory.post("feeds", data, success, error);   
	}
	var getUserPictures = function()
	{
		var data = {
			user_id: $rootScope.user.id,
			subject: '{"filter":[2]}', //2 for PHOTOS
			user_filter: $rootScope.user.id
		};
		var success = function(data)
		{
			console.log(data);
			$rootScope.user.pictures = data.feed;
		}
		var error = function(data)
		{
			console.log("error");
			console.log(data);
		}
		$dataFactory.post("feeds", data, success, error);
	}

	$scope.selectGroup = function(group)
	{
		$scope.allGroups[get_by_id($scope.allGroups, group)].checked = !$scope.allGroups[get_by_id($scope.allGroups, group)].checked;
		if (!$scope.allGroups[get_by_id($scope.allGroups, group)].checked)
		{
			remove_with_id($scope.newUser.groups, group);
		}
		else
		{
			$scope.newUser.groups.push(clone(group));
			$scope.newUser.groups[get_by_id($scope.newUser.groups, group)].checked = !$scope.newUser.groups[get_by_id($scope.newUser.groups, group)].checked;
		}
	}
	init();



	/* WATCH LOADED DATA */
	$scope.$watch('loadedData', function(value) {
		if ($scope.loadedData)
		{
			$scope.newUser.picture_url_thumb = $scope.loadedData;
			console.log($scope.newUser);
			$scope.loadedData = "";
		}
	});

	/* !WATCH LOADED DATA */

	/* WATCH DATA COMING FROM MAIN CONTROLLER*/
	$rootScope.$watch("toCall", function()
	{
		if ($rootScope.toCall===0)
		{
			$rootScope.groups.forEach(function(elem){
				if (in_array($rootScope.user.groups, elem))
					elem.checked=true;
				else
					elem.checked = false;
				$scope.allGroups.push(clone(elem));
			});
			$rootScope.user.groups.forEach(function(elem)
			{
				elem.checked = true;
			});
			$scope.newUser = clone($rootScope.user);
		}
	});
	/* !WATCH DATA COMING FROM MAIN CONTROLLER*/

}]);