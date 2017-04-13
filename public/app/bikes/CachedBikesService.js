angular.module('app').factory('CachedBikesService', function (BikeService) {
    var bikeList;

    return {
        query: function (){
            if (!bikeList) {
                bikeList = BikeService.bikes.query();
            }
            return bikeList;
        }
    }
})