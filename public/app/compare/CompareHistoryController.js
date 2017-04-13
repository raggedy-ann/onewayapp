angular.module('app').controller('CompareHistoryController', function ($scope, $location, CompareService, IdentityService, CachedBikesService, BikesToCompareService) {
    
    CompareService.compareHistory.query({ user: IdentityService.getUser()._id }).$promise.then(function (compareHistory) {
        CachedBikesService.query().$promise.then(function (cachedBikes) {
            var distinctIds = getDisctinctBikeIds(compareHistory);
            var distinctComparedBikes = getDistinctComparedBikesFromCache(distinctIds, cachedBikes);
            $scope.compares = getCompareHistoryBikes(compareHistory, distinctComparedBikes);
        });
    });
    
    $scope.redoCompare = function(bikes) {
        BikesToCompareService.reset(bikes);
        $location.path('/compare');
    }
    
    function getDisctinctBikeIds(compares){
        var result = [];
        for (var i = 0; i < compares.length; i++) {
            for (var j = 0; j < compares[i].bikes.length; j++) {
                if (result.indexOf(compares[i].bikes[j]) == -1) {
                    result.push(compares[i].bikes[j]);
                }
            }
        }
        return result;
    }
    
    function getDistinctComparedBikesFromCache(ids, cachedBikes){
        var result = [];
        for (var i = 0; i < cachedBikes.length; i++) {
            if (ids.indexOf(cachedBikes[i]._id) != -1) {
                result.push(cachedBikes[i]);
            }
        }
        return result;
    }
    
    function getCompareHistoryBikes(compareHistory, comparedBikesDistinct){
        var result = [];
        for (var i = 0; i < compareHistory.length; i++) {
            var bikes = [];
            for (var j = 0; j < compareHistory[i].bikes.length; j++) {
                var bikeId = compareHistory[i].bikes[j]
                bikes.push(getCachedBike(bikeId, comparedBikesDistinct));
            }
            result.push({ date: compareHistory[i].date, bikes: bikes });
        }
        return result;
    }

    function getCachedBike(id, comparedBikesDistinct) {
        for (var i = 0; i < comparedBikesDistinct.length; i++) {
            if (comparedBikesDistinct[i]._id == id) {
                return comparedBikesDistinct[i];
            }
        }
        return null;
    }
});