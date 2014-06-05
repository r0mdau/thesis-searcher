thesisSearcherControllers.controller('thesisSearcherDetailController', ['$scope', '$routeParams', '$sce', 'PDFDetail', 'GlobalStorage',
  function ($scope, $routeParams, $sce, PDFDetail, GlobalStorage) {
      $scope.pdf = PDFDetail.get({searchValue: $routeParams.searchValue});

      $scope.toTop = function() {
      	$("html, body").animate({scrollTop: 0}, 1000);
      }

      $(window).scroll(function() {
	    if ($("body").scrollTop() > 100) {
	        $('.backToTop').fadeIn();
	    } else {
	        $('.backToTop').fadeOut();
	    }
	  });

	  $scope.getContent = function(x) {
	  	if(x) {
	  		return $sce.trustAsHtml(x.replace(/\n/g, '<br>'));
	  	}
	  }
  }]);