 angular.module(config.app.name)

 .controller('LoginController', ["$rootScope", "$scope", "$user",
     function($rootScope, $scope, $user) {
         $rootScope.loading = false;
         $scope.login = function() {
             var credentials = {
                 email: $scope.email,
                 password: $scope.password
             };
             var errorfunc = function(errors) {
                 $scope.errors = errors;
             }
             $user.login(credentials, errorfunc);
         }
         /*

    $scope.login = function (){
		console.log($scope.email);
		console.log($scope.password);
		console.log($scope.staylogged);
        $rootScope.isLogged = false;
        //$dataFactory.get("/data/profile.json", callback, true);
        var data1={
            "email": "admin@cb.com",
            "password": "promax"
        };
        console.log(data1);
    $http({
        method: 'POST',
        url: "http://107.20.247.15/api-v1/auth/login",
        data: $.param(data1),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
                if (data.error == true)
                    console.log("API ERROR");
                else
                {
                    console.log("youpie");
                    $rootScope.isLogged = true;
    if(!$scope.$$phase) {
                    $scope.$apply(function() { $location.path("/feed"); });
                }
                    console.log(data);
                }
            })
        .error(function(data){
            console.log("SERVER ERROR");
        });
/*

		$http.post("http://107.20.247.15/api-v1/auth/login", data1)
        .success(function(data){
    		if (data.error == true)
    			console.log("API ERROR");
    		else
    		{
    			console.log("youpie")
    		}
    	})
    	.error(function(data){
      		console.log("SERVER ERROR");
    	});
        //$location.path('/feed');
        //$location.replace();
	};*/

         $scope.init = function() {
             // INIT FUNCTION
         };
         $scope.init();
     }
 ]);