angular.module('app').controller('BikeThumbnailsController', function ($rootScope, $scope, $filter, BikeService, BikesToCompareService, CachedBikesService) {
    $scope.mode = 'manufacturer';
    
    $scope.compare = BikesToCompareService;
    $scope.cachedBikes = CachedBikesService.query();

    $scope.categoriesOfManufacturer = [];
    $scope.bikesOfCategory = [];
    
    $scope.applySearch = function () {
        var filter = $scope.searchText.toLowerCase();
        if (filter.length > 0) {
            $scope.mode = 'search';
            angular.forEach($scope.cachedBikes, function (bike) {
                var completeName = bike.Manufacturer.toLowerCase() + " " + bike.Model.toLowerCase();
                bike.excludedByFilter = bike.Manufacturer.toLowerCase().indexOf(filter) === -1
                                     && bike.Model.toLowerCase().indexOf(filter) === -1
                                     && completeName.indexOf(filter) === -1;
            });
        }
        else {
            $scope.mode = 'search';
        }
    }
    
    $scope.reset = function () {
        $scope.manufacturer = null;
        $scope.category = null;
        $scope.searchText = null;
        $scope.mode = 'manufacturer';
    }
    
    $scope.setManufacturer = function (manufacturer) {
        $rootScope.$broadcast('drilldown.manufacturer.set', manufacturer);
        $scope.manufacturer = manufacturer;
    }
    
    $scope.setCategory = function (category) {
        $rootScope.$broadcast('drilldown.category.set', category);
        $scope.category = category;
    }
    
    //not using the cache here - to show an example of chaining calls: getting manufacturers then the count for each
    BikeService.manufacturers.query().$promise.then(function (data) {
        var result = [];
        angular.forEach(data, function (item) {
            BikeService.countBikesOfManufacturer.get({ manufacturer: item }).$promise.then(function (count) { 
                result.push( {
                    manufacturer: count.manufacturer,
                    count: count.count 
                })
            });
        });
        $scope.manufacturers = result;
    });
    
    //not using cached bikes here - to show an endpoint with grouping and count
    $rootScope.$on('drilldown.manufacturer.set', function (event, data) {
        BikeService.categories.query({ manufacturer: data }).$promise.then(function (categories) {
            $scope.categoriesOfManufacturer = categories;
            $scope.mode = 'category';
        });
    });
    
    //not using cached bikes here - only because this endpoint exists
    $rootScope.$on('drilldown.category.set', function (event, data) {
        $scope.bikesOfCategory = BikeService.filteredBikes.query({ manufacturer: $scope.manufacturer, category: data }, function () {
            $scope.mode = 'model';
        });
    });
});