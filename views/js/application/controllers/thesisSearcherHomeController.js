thesisSearcherControllers.controller('thesisSearcherHomeController', ['$scope', 'PDF',
  function ($scope, PDF) {
      $scope.query = '';

      $scope.$watch('query', function() {
         console.log($scope.query);
         $scope.answers = PDF.get({searchValue: $scope.query});
     });
  }]);