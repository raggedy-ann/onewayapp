angular.module('app').controller('SignupController', function ($scope, UserService, NotifierService, $location, AuthenticationService) {
    $scope.signup = function (){
        var newUserData = {
            username: $scope.username,
            email: $scope.email,
            password: $scope.password,
            firstName: $scope.fname,
            lastName: $scope.lname
        };
        AuthenticationService.createUser(newUserData).then(function (){
            NotifierService.notifySuccess('User account created!');
            $location.path('/');
        }, function (reason){
            NotifierService.notifyWarning(reason);
        });
    };
});