angular.module('app').controller('HomeDrilldownController', function ($scope, BikeService, BikesToCompareService) {
    $scope.mode = 'manufacturer';
    
    $scope.compare = BikesToCompareService;

    BikeService.homeDrilldown.query().$promise.then(function (data) { 
        $scope.drilldown = data;
    });
    
    $scope.setManufacturer = function (manufacturer) {
        $scope.categoriesOfManufacturer = getCategories(manufacturer);
        $scope.manufacturer = manufacturer;
        $scope.mode = 'category';
    }
    
    $scope.setCategory = function (category) {
        $scope.bikesOfCategory = BikeService.filteredBikes.query({ manufacturer: $scope.manufacturer, category: category }, function () {
            $scope.mode = 'model';
        });
    };

    $scope.reset = function () {
        $scope.manufacturer = null;
        $scope.category = null;
        $scope.mode = 'manufacturer';
    }

    function getCategories(manufacturer){
        var result = $scope.drilldown.filter(function (obj) { return obj._id.manufacturer == manufacturer });
        return result ? result[0].categories : null;
    }
});