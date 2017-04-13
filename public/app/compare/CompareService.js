angular.module('app').factory('CompareService', function ($resource) {
    var CompareSave = $resource('/api/saveCompare/');
    var CompareHistory = $resource('/api/compareHistory/:user', { user: '@user' });
    
    return {
        saveCompare: function (data){
            if (data.bikes.length > 0) {
                var compare = new CompareSave(data);
                compare.$save();
            }
        },
        compareHistory: CompareHistory
    }
});