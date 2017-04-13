angular.module('app').factory('IdentityService', function ($window, UserService) {
    var currentUser;
    if (!!$window.bootstrappedUserObject) {
        currentUser = new UserService();
        angular.extend(currentUser, $window.bootstrappedUserObject);
    }
    
    function getUser(){
        return currentUser;
    }

    function setCurrentUser(user){
        currentUser = user;
    }
    
    function isAuthorized(role) {
        return currentUser != undefined && currentUser.roles.indexOf(role) > -1;
    }
    
    function isAuthenticated() {
        return currentUser != undefined;
    }
    
    function isAdmin() {
        return isAuthorized('admin');
    }
    
    return {
        getUser: getUser,
        setCurrentUser: setCurrentUser,
        isAuthenticated: isAuthenticated,
        isAuthorized: isAuthorized,
        isAdmin: isAdmin
    }
})