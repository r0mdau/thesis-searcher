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
      when('/detail/:searchValue', {
        templateUrl: 'partials/detail.html',
        controller: 'thesisSearcherDetailController'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);