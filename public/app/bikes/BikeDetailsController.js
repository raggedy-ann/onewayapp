angular.module('app').controller('BikeDetailsController', function ($scope, $routeParams, BikeService, BikesToCompareService, CachedBikesService) {
    $scope.bike = BikeService.bikes.get({ id: $routeParams.id });
    $scope.compare = BikesToCompareService;
    
    CachedBikesService.query().$promise.then(function (cachedBikes) {
        $scope.moreOfCategoryManufacturer = getBikesSameManufacturerSameCategory(cachedBikes);
        $scope.moreOfManufacturer = getBikesSameManufacturerOtherCategories(cachedBikes);
        $scope.moreOfCategory = getBikesOtherManufacturerSameCategories(cachedBikes);
    });

    function getBikesSameManufacturerSameCategory(cachedBikes){
        var bike = $.grep(cachedBikes, function (e) { return e._id == $routeParams.id; })[0];
        var result = [];
        for (var i = 0; i < cachedBikes.length; i++) {
            if (cachedBikes[i]._id == bike._id) continue;
            if (cachedBikes[i].Manufacturer == bike.Manufacturer && cachedBikes[i].Category == bike.Category) {
                result.push(cachedBikes[i]);
            }
        }
        return result;
    }

    function getBikesSameManufacturerOtherCategories(cachedBikes){
        var bike = $.grep(cachedBikes, function (e) { return e._id == $routeParams.id; })[0];
        var result = [];
        for (var i = 0; i < cachedBikes.length; i++) {
            if (cachedBikes[i].Manufacturer == bike.Manufacturer && cachedBikes[i].Category != bike.Category) {
                result.push(cachedBikes[i]);
            }
        }
        return result;
    }

    function getBikesOtherManufacturerSameCategories(cachedBikes) {
        var bike = $.grep(cachedBikes, function (e) { return e._id == $routeParams.id; })[0];
        var result = [];
        for (var i = 0; i < cachedBikes.length; i++) {
            if (cachedBikes[i].Manufacturer != bike.Manufacturer && cachedBikes[i].Category == bike.Category) {
                result.push(cachedBikes[i]);
            }
        }
        return result;
    }
});