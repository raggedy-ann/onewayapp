angular.module('app').controller('UserListController', function ($scope, UserService, NotifierService) {
    UserService.query().$promise.then(function (users) { 
        var result = [];
        angular.forEach(users, function (user) {
            result.push({
                id: user._id,
                username: user.username,
                email: user.email,
                name: user.firstName + user.lastName,
                roles: user.roles.join(', '),
            });
        });
        $scope.users = result;
    }, function (reason) {
        NotifierService.notifyWarning("You don't have access to this list");
    });
    
    $scope.isAdmin = function(user) {
        return user.roles.indexOf('admin') >= 0;
    }

    $scope.delete = function (user) {
        UserService.delete_user({ id: user.id }).$promise.then(function (response) {
            if (response.msg == '') {
                NotifierService.notifySuccess('User was successfully deleted!');
                removeUser(user);
            }
            else {
                NotifierService.notifyWarning(response.msg);
            }
        });
    }

    function removeUser(user){
        var users = $scope.users;
        for (var i = 0; i < users.length; i++) {
            if (users[i].id == user.id) {
                users.splice(i, 1);
            }
        }
        $scope.users = users;
    }
});