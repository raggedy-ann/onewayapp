angular.module('app', ['ngResource', 'ngRoute', 'ui.bootstrap', 'LocalStorageModule', 'ui.unique', 'iso.directives', 'angular-loading-bar', 'mwl.confirm']);

angular.module('app').config(function ($routeProvider, $locationProvider, localStorageServiceProvider) {
    
    $routeProvider
        .when('/', { templateUrl: '/partials/main/main' })//, controller: 'MainController' })
        .when('/admin/users', {
            templateUrl: '/partials/admin/user-list',
            controller: 'UserListController', 
            resolve: {
                data: function (AuthenticationService) {
                    return AuthenticationService.authorizeCurrentUserForRoute('admin')
                }
            }
        })
        .when('/signup', {
            templateUrl: '/partials/account/signup',
            controller: 'SignupController'
        })
        .when('/profile', {
            templateUrl: '/partials/account/profile',
            controller: 'ProfileController',
            resolve: {
                data: function (AuthenticationService) {
                    return AuthenticationService.authorizeAuthenticatedUserForRoute()
                }
            }
        })
        .when('/bikes', {
            templateUrl: '/partials/bikes/bike-list',
            controller: 'BikeListController',
        })
        .when('/bikes-th', {
            templateUrl: '/partials/bikes/bike-thumbs',
            controller: 'BikeThumbnailsController',
        })
        .when('/bikes/:id', {
            templateUrl: '/partials/bikes/bike-details',
            controller: 'BikeDetailsController'
        })
        .when('/compare', {
            templateUrl: '/partials/compare/compare',
            controller: 'CompareController',
        })
        .when('/history', {
            templateUrl: '/partials/compare/history',
            controller: 'CompareHistoryController',
            resolve: {
                data: function (AuthenticationService) {
                    return AuthenticationService.authorizeAuthenticatedUserForRoute()
                }
            }
        })
    
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    
    localStorageServiceProvider.setPrefix('oneway').setNotify(true, true);
    
}).config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
}])

angular.module('app').run(function ($rootScope, $window) {
    $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
        if (rejection === 'not authorized') {
            console.log('not authorized. redirecting to home...')
            $window.location.href = '/';
        }
    })
})