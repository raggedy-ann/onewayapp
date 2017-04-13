angular.module('app').factory('UserService', function ($resource) {
    var UserResource = $resource('/api/users/:id', { _id: "@id" }, {
        update: { method: 'PUT', isArray: false },
        delete_user: { method: 'DELETE', isArray: false }
    });
    
    return UserResource;
});