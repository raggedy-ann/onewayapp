angular.module('app').controller('TechController', function($scope, $timeout){
	$timeout(function() {
            $scope.loaded = true
        }, 200); // delay 250 ms
});