angular.module('app').controller('CompareController', function ($rootScope, $scope, localStorageService, BikesToCompareService, IdentityService, CompareService) {
    $scope.bikes = BikesToCompareService.getBikesToCompare();
    
    saveCompare();

    $scope.removeBike = function removeBike(id) {
        BikesToCompareService.toggleBike(id);
        saveCompare();
    };

    $rootScope.$on('compare.changed', function () {
        $scope.bikes = BikesToCompareService.getBikesToCompare();
    });

    function saveCompare(){
        var user = IdentityService.getUser();
        if (user !== undefined) {
            CompareService.saveCompare({ user: user._id, bikes: localStorageService.get('to-compare') });
        }
    }
});