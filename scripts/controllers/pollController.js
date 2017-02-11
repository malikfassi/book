angular.module(config.app.name)
.controller('pollController', ["$rootScope","$scope", "$dataFactory", function ($rootScope, $scope, $dataFactory) {
  $scope.choiceVote = -1;
  $scope.hasVoted = 0;
  $scope.init = function(data)
  {
  	$scope.content = data;
  }
  $scope.vote = function(id)
  {
    $scope.choiceVote = id;
    $scope.hasVoted = 1;
    var data = {
    	user_id : $rootScope.user.id,
    	poll_id : $scope.content.entry.anwsers[id].poll_id,
    	anwser_id : $scope.content.entry.anwsers[id].id
    }
    console.log($scope.content.entry);
    var success = function(data){
    	console.log("youpie");
    	console.log(data);
    	$scope.content.entry.total_votes = data.message.total_votes;
    	$scope.content.entry.anwsers = data.message.anwsers;
    }
    var error = function(data)
    {
    	console.log("oooh :(");
    	console.log(data);
    }
    $dataFactory.post("polls/vote", data, success, error);
  }

}]);