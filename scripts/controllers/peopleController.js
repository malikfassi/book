angular.module(config.app.name)
 .controller('peopleController', ["$rootScope","$scope", "$dataFactory", "$http",function ($rootScope, $scope, $dataFactory, $http) {
  var success = function(data){
  	console.log(data);
      $scope.contents = data.feed;
      $scope.people = data.feed;
      console.log("lenght = ");
      console.log(data.feed.length);
      $scope.contents.forEach(function(entry)
      {
        entry.date = timeDifference(entry.created_at);
      });
      $scope.error = "";
      $rootScope.loading = false;
  }
  var error = function (data) {
      // TODO: apply user notification here
       $rootScope.loading = false;
      $scope.errors = [];
      $scope.errors.push(data.messages);
  }
 	var init = function() {
      var data = {
        user_id: $rootScope.user.id,
        page : 1
      };
      $rootScope.loading = true;

$http.get("/ita-access/app/data/people.json").success(function(data){
          console.log(data);
          success(data);
        }).error(function(data) {
          console.log("error");
        });

     //for real api
     // $dataFactory.post("users/people", data, success, error);
    }
 	init();




 	$scope.letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
 	$scope.filtersTab = [false, false];
 	$scope.filters = {"letter":"", "attr":"", "search":""};
 	$scope.chooseAttr = function(attr)
 	{
 		if ($scope.filters.attr == attr)
 			$scope.filters.attr = "";
 		else
 			$scope.filters.attr = attr;
 		$scope.filtersTab = [false, false];
 	}
 	$scope.chooseLetter = function(letter)
 	{
 		if ($scope.filters.letter == letter)
 			$scope.filters.letter = "";
 		else
 			$scope.filters.letter = letter;
  		$scope.filtersTab = [false, false];
 	}
 	$scope.chooseSearch = function(search)
 	{
 		$scope.filters.search = search;
 	}
 	$scope.selectDrop = function (id)
 	{
 		if (id)
 		{
 			$scope.filtersTab[0] = !$scope.filtersTab[0];
 			$scope.filtersTab[1] = false;
 		}
 		else
 		{
 			$scope.filtersTab[1] = !$scope.filtersTab[1];
 			$scope.filtersTab[0] = false;
 		}
 	}
 	$("body").click(function(e) {
		if ($(e.target).closest($("#alphabet-drop")).length == 0 
			&& $(e.target).closest($("#sort-drop")).length == 0
			&& $(e.target).closest($(".filter")).length == 0)
		{
			 	$scope.filtersTab = [false, false];
		}
		$scope.$apply();
    });
}]);