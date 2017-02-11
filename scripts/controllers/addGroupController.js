 angular.module(config.app.name)
 .controller('addGroupController', ['$rootScope', '$scope', '$dataFactory', function ($rootScope,$scope, $dataFactory) {
 	$scope.is_private = false;
 	$scope.popup = -1;
 	$scope.newPost = {};
 	$scope.newPost.loadedPict = [];
 	$scope.newPost.loadedVid = [];
 	$scope.newPost.members = [];
 	$scope.selectedPicture = {};
 	$scope.loadedData = "";
 	$scope.allmembers=[];
    $rootScope.loading = false;

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
	var callback = function(data){
        data.forEach(function(elem){
        	elem.checked=false;
        	$scope.allmembers.push(elem);
        });
        console.log($scope.allmembers);
    }
    $dataFactory.get("allmembers.json", callback, true);
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
 	$scope.selectMember = function(member)
 	{
 		console.log($scope.popup);
 		$scope.popup= 1;
 		if (member.checked)
 			remove($scope.newPost.members, member);
 		else
 			$scope.newPost.members.push(member);
 		member.checked = !member.checked;
 		console.log($scope.popup);
 	}
 	$scope.removeMember = function(member)
 	{
 		remove($scope.newPost.members, member);
 	}
}]);