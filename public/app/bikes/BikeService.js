angular.module('app').factory('BikeService', function ($resource) {
    
    return {
        bikes: $resource('/api/bikes/:id', { _id: '@id' }),
        filteredBikes: $resource('/api/bikes/:manufacturer/:category', { manufacturer: '@manufacturer', category: '@category' }),
        categories: $resource('/api/categories/:manufacturer', { manufacturer: '@manufacturer' }),
        manufacturers: $resource('/api/manufacturers'),
        countBikesOfManufacturer: $resource('/api/countBikesOfManufacturer/:manufacturer', { manufacturer: '@manufacturer' }),
        homeDrilldown: $resource('/api/getHomeDrilldown')
    };
})