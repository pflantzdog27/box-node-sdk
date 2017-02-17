angular.module('appRoutes',[]).config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'views/home.html',
        controller: 'MainController'
    })
    //nerds page that will use the NerdController
    .when('/files', {
        templateUrl: 'views/files.html',
        controller: 'FilesController'
    });
    
    $locationProvider.html5Mode(true);
}]);