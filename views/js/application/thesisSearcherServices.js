var thesisSearcherServices = angular.module('thesisSearcherServices', ['ngResource']);

thesisSearcherServices.factory('IPProvider', [
  function(){
  	return {
  		getServerIP: function() {
    		return '178.32.102.161';
  		}
	}
  }]);
 
thesisSearcherServices.factory('PDF', ['$resource', 'IPProvider',
  function($resource, IPProvider){
    return $resource('http://' + IPProvider.getServerIP() + '/search/:searchValue', {}, {});
  }]);

thesisSearcherServices.factory('PDFDetail', ['$resource', 'IPProvider',
  function($resource, IPProvider){
    return $resource('http://' + IPProvider.getServerIP() + '/pdf/:searchValue', {}, {});
  }]);

thesisSearcherServices.factory('GlobalStorage', [ '$rootScope',
	function ($rootScope) {
		return {
			getData: function(dataName) {
				return $rootScope[dataName] ? $rootScope[dataName] : '';
			},

			setData: function(dataName, data) {
				$rootScope[dataName] = data;
			}
		};
	}]);