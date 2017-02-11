angular.module(config.app.name)

.controller('LoginController', ["$rootScope", "$scope", "$user",
    function($rootScope, $scope, $user) {
        
        // FUNCTIONS
        $scope.login = function() {
            $user.login($scope.credentials, function(e){
                $scope.errors = e;
            });
        }

        // CONSTRUCTOR
        $scope.init = function() {
            $rootScope.loading = false;
            $scope.credentials = {
                email:'',
                password:'',
                staylogged:false
            };
        };
        $scope.init();
    }
]);