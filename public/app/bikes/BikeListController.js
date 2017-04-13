angular.module('app').controller('BikeListController', function ($scope, $timeout, BikeService, CachedBikesService, BikesToCompareService) {
    $scope.compare = BikesToCompareService;
    
    CachedBikesService.query().$promise.then(function (data) {
        $scope.bikes = data;
        $timeout(function () {
            $scope.$emit('iso-init');
        }, 100);
    });

    BikeService.manufacturers.query().$promise.then(function (data) {
        $scope.manufacturers = data;
    });
});
