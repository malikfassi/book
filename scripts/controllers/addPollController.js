 angular.module(config.app.name)
 .controller('addPollController', ["$location", "$scope", "$dataFactory", "$rootScope", function($location, $scope, $dataFactory, $rootScope) {
    var init = function()
    {
        $scope.popup = -1;
        $scope.newPost = {};
        $scope.newPost.groups = [];
        $scope.allGroups=[];
        $scope.choices = [];
        $scope.initial  = 4;
        $rootScope.loading = false;
        $scope.addChoice = function () {
          $scope.choices.push({data:''});
          console.log($scope.choices);
        };
        for (var i = 0; i < $scope.initial; i++) {
            $scope.addChoice();
        };
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
        $scope.selectGroup = function(group)
        {
            console.log($scope.popup);
            $scope.popup= 0;
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
        $scope.postPoll = function()
        {
            var allAnswers = [];
            $scope.choices.forEach(function(elem)
            {
                allAnswers.push(elem.data);
            })
            var answers = {"answers": allAnswers};
            var data = {
                user_id : $rootScope.user.id,
                question: $scope.question,
                answers: JSON.stringify(answers),
                groups: gatherGroupsId($scope.allGroups)
            }
            var success = function(data)
            {
                console.log("youpie");
                console.log(data);
            }
            var error = function(data)
            {
                console.log("Oooh :(");
                console.log(data);
            }
            $dataFactory.post("polls/create", data, success, error);
        }
    }
    init();
}]);