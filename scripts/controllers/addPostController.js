 angular.module(config.app.name)
 .controller('addPostController', ["$location", "$formData", "$rootScope","$scope", "$dataFactory", function($location, $formData, $rootScope, $scope, $dataFactory) {
 	$scope.popup = -1;
 	$scope.newPost = {};
 	$scope.newPost.loadedPict = "";
 	$scope.newPost.loadedVid = [];
 	$scope.newPost.groups = [];
 	$scope.selectedPicture = {};
 	$scope.loadedData = "";
 	$scope.allGroups=[];
  $rootScope.loading = false;

/* //if loading multiple files
 	$scope.$watch('loadedData', function(value) {


 		console.log($scope);
 		if (in_array($scope.newPost.loadedPict, $scope.loadedData) == -1 && $scope.loadedData)
 		{
           	$scope.newPost.loadedPict.push($scope.loadedData);
           	$scope.loadedData = "";
 		}
 		else if ($scope.loadedData)
 			alert("picture already loaded" + $scope.loadedData);
    });
 */


    $rootScope.$watch("toCall", function()
    {
      if ($rootScope.toCall===0)
      {
        $rootScope.$watch("mainGroup", function(){
          if ($rootScope.mainGroup)
            $location.search("group", $rootScope.mainGroup.id);
          else
            $location.search("group", null);
          if ($rootScope.groups)
          {
            $scope.allGroups = clone($rootScope.groups);
            $scope.allGroups.forEach(function(elem){
              elem.checked=false;
              if (!$rootScope.mainGroup)
                elem.checked = true;
              else if ($rootScope.mainGroup.id == elem.id)
                elem.checked = true;
              else
                elem.checked = false;
            });
          }
        });
        $rootScope.$watch("toCall", function(){});//stop watching toCall;
      }
    })

 	$scope.selectPict = function(pict)
 	{
 		$scope.selectedPicture.link = pict;
 		$scope.popup = 0;
 	}
 	$scope.removePict = function(pict)
 	{
 		console.log(pict);
 		console.log("vs");
 		console.log($scope.newPost.loadedPict);
 		if (in_array($scope.newPost.loadedPict, pict.link) != -1)
 		{
 			console.log("hey24");
 			console.log(in_array($scope.newPost.loadedPict, pict.link));
 			remove($scope.newPost.loadedPict, pict.link);
 		}
 		$scope.closeDrop();
 		console.log($scope);
 	}
 	$scope.selectGroup = function(group)
 	{
 		console.log($scope.popup);
 		$scope.popup= 1;
 		if (group.checked)
 			remove($scope.newPost.groups, group);
 		else
 			$scope.newPost.groups.push(group);
 		group.checked = !group.checked;
 		console.log($scope.popup);
 	}
 	$scope.removeGroup = function(group)
 	{
 		remove($scope.newPost.groups, group);
 	}
 	$scope.add_post = function()
 	{
    var success = function(data){
      console.log(data);
    }
    var error = function(data){
      console.log("oooh :(");
      console.log(data);
    }
    var data = {
      user_id : $rootScope.user.id,
      post: $scope.post_desc
    }
    if ($scope.loadedData.length != 0)
    {
      if ($scope.loadedData.type == "video/mp4")//if video
      {
        data.vid_posttitle = $scope.post_title;
        data.vid_postlink = $scope.post_link;
        data.groups = gatherGroupsId($scope.allGroups);
        var pict = new FormData();
        pict.append("pict", $scope.loadedData);
        //data.picture = pict;
        var url=config.apiURL + "videos/create";
        //data is a json (max one level of object)
        $formData = new $formData($scope);
        $formData.setData(data);
        $formData.setFile($scope.ultimateData, "video");
        $formData.send(url,function(response){
            console.log("youhou!!!");
        });
      }
      else if (!$scope.loadedData.type) //if image
      {
          console.log("pict");
          data.photo_posttitle = $scope.post_title;
          data.photo_postlink = $scope.post_link;
          data.groups = gatherGroupsId($scope.allGroups);
          var pict = new FormData();
          pict.append("pict", $scope.loadedData);
          //data.picture = pict;
            var url=config.apiURL + "photos/create";
            //data is a json (max one level of object)
            console.log($formData);
            $formData = new $formData($scope);
            $formData.setData(data);
            console.log($scope.ultimateData);
            $formData.setFile($scope.ultimateData, "picture");
            $formData.send(url,function(response){
                console.log("youhou!!!");
            });
         // $dataFactory.post("photos/create", data, success, error, pict);
      }
    }
    else //if post post
    {
        data.posttitle = $scope.post_title;
        data.postlink = $scope.post_link;
        data.groups = gatherGroupsId($scope.allGroups);
        $dataFactory.post("posts/create", data, success, error);
    }
 	}
}]);