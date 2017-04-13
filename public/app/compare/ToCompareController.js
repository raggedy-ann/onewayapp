angular.module('app').controller('ToCompareController', function ($rootScope, $scope, BikesToCompareService) {
    $scope.bikesToCompare = BikesToCompareService.getBikesToCompare();
    
    $scope.removeBike = function removeBike(id) {
        BikesToCompareService.toggleBike(id);
    };

    $rootScope.$on('compare.changed', function () {
        $scope.bikesToCompare = BikesToCompareService.getBikesToCompare();
    });
});