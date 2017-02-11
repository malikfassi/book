angular.module(config.app.name)
 .controller('addEventController', ["$formData","$location", "$scope", "$dataFactory", "$rootScope", function ($formData, $location, $scope, $dataFactory, $rootScope) {

 	//CALENDAR
 	$scope.selectedDate = {month_id:6, day:18, year:2014, hour: 8, minutes:0, ampm:0};
 	$scope.months = ["January","February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
 	$scope.ampm = ["AM", "PM"];
 	$scope.sched = {hour: "08", minutes: "00"};

 	$scope.nextMonth = function(){
 		if ($scope.selectedDate.month_id == 11)
 			$scope.selectedDate.month_id = 0;
 		else
 			$scope.selectedDate.month_id += 1;
 		if ($scope.selectedDate.month_id == 1)
 		{
 			if ($scope.selectedDate.day > 29 && (($scope.selectedDate.year % 4 == 0 && $scope.selectedDate % 100 != 0) || ($scope.selectedDate % 400 == 0)))
 				$scope.selectedDate.day = 29;
 			else if ($scope.selecteDate.day > 28 && !(($scope.selectedDate.year % 4 == 0 && $scope.selectedDate % 100 != 0) || ($scope.selectedDate % 400 == 0)))
 				$scope.selectedDate.day = 28;
 			
 		}
 		else
 		{
 			if ($scope.selectedDate.day == 31 && !(($scope.selectedDate.month_id <= 6 && $scope.selectedDate.month_id % 2 == 0) || ($scope.selectedDate.month_id >= 7 && $scope.selectedDate.month_id % 2 != 0)))
 				$scope.selectedDate.day = 30;
 		}
 	}
 	$scope.lastMonth = function(){
 	 	console.log($scope.selectedDate.month_id);
 		if ($scope.selectedDate.month_id == 0)
 		{
 			$scope.selectedDate.month_id = 11;
 		}
 		else
 			$scope.selectedDate.month_id -= 1;
 		console.log($scope.selectedDate.month_id);
 	}
 	$scope.nextDay = function() {
 		if ($scope.selectedDate.month_id == 1)//February
 		{
 			if ($scope.selectedDate.day == 28)//28 February
 			{
 				if (($scope.selectedDate.year % 4 == 0 && $scope.selectedDate % 100 != 0) || ($scope.selectedDate % 400 == 0))
 					$scope.selectedDate.day +=1;//Bissextile
 				else
 					$scope.selectedDate.day = 1;
 			}
 			else if ($scope.selectedDate.day == 29)
	 			$scope.selectedDate.day = 1;
	 		else 
	 			$scope.selectedDate.day += 1;
	 	}
 		else if ($scope.selectedDate.day == 30)
 		{
 			if (($scope.selectedDate.month_id <= 6 && $scope.selectedDate.month_id % 2 == 0) || ($scope.selectedDate.month_id >= 7 && $scope.selectedDate.month_id % 2 != 0))
 				$scope.selectedDate.day += 1;
 			else
 				$scope.selectedDate.day = 1;
 		}
 		else if ($scope.selectedDate.day == 31)
 			$scope.selectedDate.day = 1;
 		else
 			$scope.selectedDate.day += 1;
 	}
 	$scope.lastDay = function() {
 		if ($scope.selectedDate.month_id == 2)//March
 		{

 			if ($scope.selectedDate.day == 1)//0 March
 			{
 				if (($scope.selectedDate.year % 4 == 0 && $scope.selectedDate % 100 != 0) || ($scope.selectedDate % 400 == 0))
 					$scope.selectedDate.day = 29;//Bissextile
 				else
 					$scope.selectedDate.day = 28;
 			}
 			else
 				$scope.selectedDate.day -= 1;
	 	}
 		else if ($scope.selectedDate.day == 1)
 		{
			if (($scope.selectedDate.month_id <= 6 && $scope.selectedDate.month_id % 2 == 0) || ($scope.selectedDate.month_id >= 7 && $scope.selectedDate.month_id % 2 != 0))
 				$scope.selectedDate.day = 31;
 			else
 				$scope.selectedDate.day = 30;
 		}
 		else
 			$scope.selectedDate.day -= 1;
 	}
 	$scope.nextYear = function() {
 		$scope.selectedDate.year += 1;
 	}
 	$scope.lastYear = function() {
 		$scope.selectedDate.year -= 1;
 	}
 	$scope.nextHour = function() {
 		if ($scope.selectedDate.hour == 12)
 			$scope.selectedDate.hour = 0;
 		else 
 			$scope.selectedDate.hour += 1;
 		$scope.sched.hour = pad($scope.selectedDate.hour);
 	}
 	$scope.lastHour = function() {
 		if ($scope.selectedDate.hour == 0)
 			$scope.selectedDate.hour = 12;
 		else 
 			$scope.selectedDate.hour -= 1;
 		$scope.sched.hour = pad($scope.selectedDate.hour);
 	}
 	$scope.nextMin = function(){
 		if ($scope.selectedDate.minutes == 59)
 			$scope.selectedDate.minutes = 0;
 		else 
 			$scope.selectedDate.minutes += 1;
 		$scope.sched.minutes = pad($scope.selectedDate.minutes);
 	}
 	$scope.lastMin = function(){
 		if ($scope.selectedDate.minutes == 0)
 			$scope.selectedDate.minutes = 59;
 		else 
 			$scope.selectedDate.minutes -= 1;
 		$scope.sched.minutes = pad($scope.selectedDate.minutes);
 	}
 	$scope.nextAmpm = function() {
 	 	if ($scope.selectedDate.ampm == 0)
 	 		$scope.selectedDate.ampm = 1;
 	 	else
 	 		$scope.selectedDate.ampm = 0;
 	}
 	//!CALENDAR


 	$scope.popup = -1;
 	$scope.newPost = {};
 	$scope.newPost.loadedPict = [];
 	$scope.newPost.loadedVid = "";
 	$scope.newPost.groups = [];
 	$scope.selectedPicture = {};
 	$scope.loadedData = "";
 	$scope.allGroups=[];
  $scope.show = 0;
  $rootScope.loading = false;
/*//if loading multiple files
 	$scope.$watch('loadedData', function(value) {
   		console.log($scope);
      if ($scope.loadedData)
      {
        $scope.newPost.loadedPict.push($scope.loadedData);
        $scope.loadedData = "";
      }
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
  $scope.addLoc = function()
  {
    $scope.show = 0;
  }
 	$scope.selectPict = function(pict)
 	{
 		$scope.selectedPicture.link = pict;
 		$scope.popup = 0;
 	}
 	$scope.removePict = function(pict)
 	{
    $scope.loadedPict = "";
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
  $scope.addEvent = function(){
    //if ($scope.)
    console.log($scope.loadedData);
    var data = {
      user_id : $rootScope.user.id,
      name : $scope.event_title, 
      description: $scope.description,
      event_date: $scope.selectedDate.year+"-"+$scope.selectedDate.month_id+"-"+$scope.selectedDate.day+" "+$scope.selectedDate.hour+":"+$scope.selectedDate.minutes+":00",
      location_name: $scope.location_name,
      location_long: "longitude",
      location_lat: "latitude",
      groups: gatherGroupsId($scope.allGroups),
      picture: $scope.loadedPict
    }
    var pict = new FormData();
    pict.append("pict", $scope.loadedData);
    //data.picture = pict;
    var url=config.apiURL + "events/create";
    //data is a json (max one level of object)
    console.log($formData);
    $formData = new $formData($scope);
    $formData.setData(data);
    console.log($scope.ultimateData);
    $rootScope.loading = true;
    $formData.setFile($scope.ultimateData, "picture");
    $formData.send(url,function(response){
      $location.path("/events");
    });



    console.log(data);
    var error = function(data)
    {
      console.log(":(");
        console.log(data);
    }
    var success = function(data)
     {
      console.log("yeah");
      console.log(data);
    }
    //$dataFactory.post("events/create", data, success, error);
  }
}]);