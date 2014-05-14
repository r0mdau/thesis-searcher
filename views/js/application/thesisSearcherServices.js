var thesisSearcherServices = angular.module('thesisSearcherServices', ['ngResource']);
 
thesisSearcherServices.factory('PDF', ['$resource',
  function($resource){
    return $resource('/pdf/:searchValue', {}, {});
  }]);