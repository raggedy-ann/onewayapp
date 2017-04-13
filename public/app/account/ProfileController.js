angular.module('app').controller('ProfileController', function ($scope, AuthenticationService, IdentityService, NotifierService){
    $scope.username = IdentityService.getUser().username;
    $scope.email = IdentityService.getUser().email;
    $scope.fname = IdentityService.getUser().firstName;
    $scope.lname = IdentityService.getUser().lastName;

    $scope.update = function (){
        var newUserData = {
            username: $scope.username,
            email: $scope.email,
            firstName: $scope.fname,
            lastName: $scope.lname
        };
        if ($scope.password && $scope.password.length > 0) {
            newUserData.password = $scope.password;
        }

        AuthenticationService.updateCurrentUser(newUserData).then(function () {
            NotifierService.notifySuccess('Your user account has been updated');
        }, function (reason) { 
            NotifierService.notifyWarning(reason);
        });
    }
})