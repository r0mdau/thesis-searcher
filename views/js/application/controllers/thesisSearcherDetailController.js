thesisSearcherControllers.controller('thesisSearcherDetailController', ['$scope', '$routeParams', 'PDFDetail',
  function ($scope, $routeParams, PDFDetail) {
      $scope.pdf = PDFDetail.get({searchValue: $routeParams.searchValue});

  }]);