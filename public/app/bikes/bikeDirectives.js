angular.module('app')
    .directive('bikeThumbnails', function () {
        return {
            restrict: 'E',
            scope: {
                'bikesList': '=data',
                'compare': '=compare'
            },
            template:   "<div class='container grid'>\n" +
                            "<div class='row'>\n" +
                                "<div class='col-md-4' ng-repeat='bike in bikesList | orderBy: Model' ng-hide='bike.excludedByFilter'>\n" +
                                    "<one-bike data='bike' compare='compare'\n" +
                                "</div>\n" + 
                            "</div>\n" + 
                        "</div>"
        }
    })
    .directive('oneBike', function () {
        return {
            restrict: 'E',
            scope: {
                'bike': '=data',
                'compare': '=compare'
            },
            template: "<div class='team-member'>\n" +  
                            "<div class='single-post-title text-center'>\n" +
                                "<h3> {{ bike.Manufacturer }} {{ bike.Model }}</h3> \n" +
                            "</div>\n" + 
                            "<div class='single-post-image'>\n" + 
                                "<a href='/bikes/{{bike._id}}'>\n" + 
                                    "<img class='drill image' ng-src='{{bike.ImageL}}' />\n" + 
                                "</a>\n" + 
                                "<a class='top-margin-small btn btn-orange' href='#' ng-click='compare.toggleBike(bike._id)'>\n" + 
                                    "{{compare.getToggleCompareText(bike._id)}}\n" + 
                                "</a>\n" + 
                            "</div>\n" + 
                        "</div>"
        }
    });