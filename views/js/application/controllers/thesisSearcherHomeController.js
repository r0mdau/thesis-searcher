thesisSearcherControllers.controller('thesisSearcherHomeController', ['$scope', 'PDF', 'GlobalStorage',
  function ($scope, PDF, GlobalStorage) {
      $scope.query = GlobalStorage.getData('query');

      $scope.$watch('query', function() {
      	GlobalStorage.setData('query', $scope.query);
        $scope.answers = PDF.get({searchValue: $scope.query});
     });
  }]);