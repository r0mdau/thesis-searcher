var thesisSearcherApplication = angular.module('thesisSearcherApplication', [
  'ngRoute',
  'thesisSearcherServices',
  'thesisSearcherControllers'
]);
 
thesisSearcherApplication.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'thesisSearcherHomeController'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);