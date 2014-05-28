thesisSearcherControllers.controller('thesisSearcherHomeController', ['$scope', 'PDF', 'GlobalStorage',
  function ($scope, PDF, GlobalStorage) {
	$scope.query = GlobalStorage.getData('query');
	$scope.predicate = 'fileName';

	$scope.changePredicate = function(predicate) {
		console.log('changing predicate')
		if($scope.predicate.indexOf(predicate) !== -1 && $scope.predicate.indexOf('-') !== -1 && predicate.indexOf('-') === -1) {
			$scope.predicate = predicate;
		} else {
			$scope.predicate = '-' + predicate;
		}
	}

	$scope.$watch('query', function() {
		GlobalStorage.setData('query', $scope.query);
		$scope.answers = PDF.get({searchValue: $scope.query});
	});
  }]);