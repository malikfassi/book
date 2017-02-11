 angular.module(config.app.name)
 .controller('feedController', ["$user","$rootScope", "$location", "$scope", "$dataFactory", "$http", function ($user, $rootScope, $location, $scope, $dataFactory, $http) {
  $scope.errors = [];
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
  var success = function(data){
      $scope.contents = data.feed;
      if (data.feed.length < MAXPERPAGE)
        $scope.next_page = -1;
      $scope.contents.forEach(function(entry)
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
          //$dataFactory.post("users/profile", data, successLike, errorLike);
        });
      });
      $scope.error = "";
      $rootScope.loading = false;
  }
  var error = function (data) {
      // TODO: apply user notification here
      $scope.errors.push(data.messages[0]);
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
  $scope.goToPage = function(page){
      $location.search("page", page);
      loadMainData();
  }
  var loadMainData = function(){
    $rootScope.loading = true;
    var page = (!isNaN(parseInt($location.search().page)) ? parseInt($location.search().page) : 1);
    var group = (!isNaN(parseInt($location.search().group)) ? parseInt($location.search().group) : -1);
    $scope.story = (!$location.search().story ? 'all' : $location.search().story);
    var data = {
        user_id: $rootScope.user.id,
        subject: '{"filter":[1, 5]}',
        page: page,
        orderby: $scope.story,
    };
    if (group != -1)
      data.group_id = group;
    else
      data.mygroupfeed = "y";
    $scope.previous_page = (page == 1 ? 0 : page - 1);
    $scope.next_page = page + 1;

    $http.get("/ita-access/app/data/feed.json").success(function(data){
          console.log(data);
          success(data);
        }).error(function(data) {
          console.log("error");
        });
        //for real api
    //$dataFactory.post("feeds", data, success, error);
  }
 	var init = function() {
    $rootScope.$watch("toCall", function()
    {
      if ($rootScope.toCall===0)
      {
        $rootScope.$watch("mainGroup", function(){
          if ($rootScope.mainGroup)
          {
            $location.search("group", $rootScope.mainGroup.id);
          }
          else {
            $location.search("group", null);
          }
          loadMainData();
        });
        $rootScope.$watch("toCall", function(){});//stop watching toCall;
      }
    })
  }
 	init();
 }]);