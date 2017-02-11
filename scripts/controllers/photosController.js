angular.module(config.app.name)
 .controller('photosController', ["$rootScope", "$routeParams","$scope","$dataFactory", "$http", function ($rootScope, $routeParams, $scope, $dataFactory, $http) {
    $scope.selectPicture = function(data, popup_id){
    	$scope.selectedPicture = data;
      $scope.popup = popup_id;
    }
    $scope.commentPhoto = function()
    {
        var success = function(data)
        {
          console.log(data.comment);
          data.comment.picture_url_thumb = $rootScope.user.picture_url_thumb;
          data.comment.from_name = $rootScope.user.first_name + " " + $rootScope.user.last_name; 
          $scope.selectedPicture.comments.user_comments.push(data.comment);
          $scope.selectedPicture.comments.total_comments += 1;
          $scope.comment = "";
        }
        var error = function()
        {
          console.log ("oooh");
        }
        var data = {
          user_id : $rootScope.user.id,
          activity_id : $scope.selectedPicture.activity_id,
          comment : $scope.comment
        }
        $dataFactory.post("comments/create", data,success, error);
    }



    $scope.likePhoto = function()
    {
        var success = function(data)
        {
          if ($scope.selectedPicture.liked) //(if you unlike post)
          {
            $scope.selectedPicture.likes.total_likes -= 1; 

            $scope.selectedPicture.likes.user_likes.forEach(function(entry)
            {
               if (entry.user_id = 1) //(remove your like from list)
               {
                 remove($scope.selectedPicture.likes.user_likes, entry);
                 return (false);
               }
            });
          }
          else //(if you like a post)
          {
            $scope.selectedPicture.likes.total_likes += 1;
            //construct data for html binding data
            data.like.picture_url_thumb = $rootScope.user.picture_url_thumb;
            data.like.from_name = $rootScope.user.first_name + " " + $rootScope.user.last_name;
            //add like in user_likes list
            $scope.selectedPicture.likes.user_likes.push(data.like);
          }
          $scope.selectedPicture.liked = !$scope.selectedPicture.liked;
        }
        var error = function(data)
        {
          console.log("oooh");
          console.log(data);
        }
        var data = {
          user_id : $rootScope.user.id,
          activity_id : $scope.selectedPicture.activity_id
        }
        var url = ($scope.selectedPicture.liked ? "likes/unlike" : "likes/create");
        $dataFactory.post(url, data, success, error);
    }




    var success = function(data){
      $scope.allData = data.feed;
      console.log(data);
      if ($(window).innerWidth() <= 1000)
      {
        threeCols = $scope.allData.chunk(Math.round($scope.allData.length / 2));
        $scope.imgs1 = threeCols[0];
        $scope.imgs2 = threeCols[1];
        $scope.imgs3 = "";
      }
      else
      {
        threeCols = $scope.allData.chunk(Math.round($scope.allData.length / 3));
        $scope.imgs1 = threeCols[0];
        $scope.imgs2 = threeCols[1];
        $scope.imgs3 = threeCols[2];
      }
      $scope.error = "";
      $rootScope.loading = false;
    }
    var error = function (data) {
      // TODO: apply user notification here
      $scope.errors.push(data.messages[0]);
    }
    var init = function() {
      $scope.popup = -1;
      //var page = (!isNaN(parseInt($routeParams.page)) ? $routeParams.page : 1);
      var data = {
        user_id: $rootScope.user.id,
        subject: '{"filter":[2]}'
      };
      $rootScope.loading = true;
     // $scope.previous_page = (page == 1 ? 0 : page - 1);
     // $scope.next_page = parseInt(page) + 1;
      $http.get("/ita-access/app/data/photos.json").success(function(data){
          console.log(data);
          success(data);
        }).error(function(data) {
          console.log("error");
        });
     //for real api
      //$dataFactory.post("feeds", data, success, error);
    }
    init();
 }]);