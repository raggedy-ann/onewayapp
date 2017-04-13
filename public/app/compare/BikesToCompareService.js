angular.module('app').factory('BikesToCompareService', function (CachedBikesService, $rootScope, localStorageService, NotifierService) {
    
    var toggleBike = function (id){
        var bikesToCompare = localStorageService.get('to-compare');

        if (bikesToCompare === null) {
            bikesToCompare = [];
        }
        var index = bikesToCompare.indexOf(id);
        if (index > -1) {
            NotifierService.notifySuccess('Bike successfully removed from the compare list. Changed your mind?');
            bikesToCompare.splice(index, 1);
        }
        else {
            if (bikesToCompare.length < 4) {
                NotifierService.notifySuccess('Cool! You just added a bike to the compare list. Hit the compare button!');
                bikesToCompare.push(id);
            }
            else {
                NotifierService.notifyWarning('How about we compare these 4 first? Yes, I know your monitor is wide enough.');
            }
        }
        localStorageService.set('to-compare', bikesToCompare);
        $rootScope.$broadcast('compare.changed');
    }
    
    var getBikesToCompare = function () {
        var bikesToCompare = localStorageService.get('to-compare');
        var result = [];
        if (bikesToCompare !== null) {
            CachedBikesService.query().$promise.then(function (bikes) {
                for (var i = 0; i < bikesToCompare.length; i++) {
                    for (var j = 0; j < bikes.length; j++) {
                        if (bikes[j]._id === bikesToCompare[i]) {
                            result.push(bikes[j]);
                        }
                    }
                }
            });
        }
        return result;
    }
    
    var getToggleCompareText = function (id) {
        var result = 'Add to Compare';
        var bikesToCompare = localStorageService.get('to-compare');
        if (bikesToCompare != null) {
            if (bikesToCompare.indexOf(id) > -1) {
                return 'Remove from compare';
            }
        }
        return result;
    };
    
    var reset = function (bikes){
        var newIds = [];
        for (var i = 0; i < bikes.length; i++) {
            newIds.push(bikes[i]._id);
        }
        localStorageService.set('to-compare', newIds);
        $rootScope.$broadcast('compare.changed');
    }

    return {
        getBikesToCompare: getBikesToCompare,
        toggleBike: toggleBike,
        getToggleCompareText: getToggleCompareText,
        reset: reset
    }
});