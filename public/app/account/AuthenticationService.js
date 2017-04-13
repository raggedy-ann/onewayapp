angular.module('app').factory('AuthenticationService', function ($http, IdentityService, $q, UserService) {
    return {
        authenticateUser: function (username, password) {
            var dfd = $q.defer();
            $http.post('/login', { username: username, password: password }).then(function (response) {
                if (response.data.success) {
                    var user = new UserService();
                    angular.extend(user, response.data.user);
                    IdentityService.setCurrentUser(user);
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        },
        createUser: function (newUserData) {
            var newUser = new UserService(newUserData);
            var dfd = $q.defer();
            newUser.$save().then(function () {
                IdentityService.setCurrentUser(newUser);
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            return dfd.promise;
        },
        updateCurrentUser: function (newUserData) {
            var dfd = $q.defer();
            //creating a clone so we don't update IdentityService unless there's a successful save
            var clone = angular.copy(IdentityService.getUser());
            angular.extend(clone, newUserData);

            clone.$update().then(function () {
                IdentityService.setCurrentUser(clone);
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data);
            });
            return dfd.promise;
        },
        logoutUser: function () {
            var dfd = $q.defer();
            $http.post('/logout', { logout: true }).then(function () {
                IdentityService.setCurrentUser(undefined);
                dfd.resolve();
            });
            return dfd.promise;
        },
        authorizeCurrentUserForRoute: function (role) {
            if (IdentityService.isAuthorized(role)) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        },
        authorizeAuthenticatedUserForRoute: function (){
            if (IdentityService.isAuthenticated()) {
                return true;
            }
            return $q.reject('not authorized');
        }
    }
});