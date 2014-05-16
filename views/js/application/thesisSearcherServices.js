var thesisSearcherServices = angular.module('thesisSearcherServices', ['ngResource']);
 
thesisSearcherServices.factory('PDF', ['$resource',
  function($resource){
    return $resource('http://178.32.102.161/search/:searchValue', {}, {});
  }]);

thesisSearcherServices.factory('PDFDetail', ['$resource',
  function($resource){
    return $resource('http://178.32.102.161/pdf/:searchValue', {}, {});
  }]);

thesisSearcherServices.factory('GlobalStorage', [ '$rootScope',
	function ($rootScope) {
		return {
			getData: function(dataName) {
				return $rootScope[dataName];
			},

			setData: function(dataName, data) {
				$rootScope[dataName] = data;
			}
		};
	}]);