angular.module('app').controller('NavBarLoginController', function ($scope, $http, IdentityService, NotifierService, AuthenticationService, $location) {
    $scope.identity = IdentityService;
    $scope.signin = function (username, password) {
        AuthenticationService.authenticateUser(username, password).then(function (success) {
            if (success) {
                NotifierService.notifySuccess('You have successfully signed in!');
            } else {
                NotifierService.notifyWarning('Username/Password combination incorrect');
            }
        });
    }
    
    $scope.signout = function () {
        AuthenticationService.logoutUser().then(function () {
            $scope.username = "";
            $scope.password = "";
            NotifierService.notifySuccess('You have successfully signed out!');
            $location.path('/');
        })
    }
});