var thesisSearcherServices = angular.module('thesisSearcherServices', ['ngResource']);
 
thesisSearcherServices.factory('PDF', ['$resource',
  function($resource){
    return $resource('http://192.168.2.18/pdf/:searchValue', {}, {});
  }]);