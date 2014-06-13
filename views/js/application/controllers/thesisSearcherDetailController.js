thesisSearcherControllers.controller('thesisSearcherDetailController', ['$scope', '$routeParams', '$sce', 'PDFDetail', 'GlobalStorage',
  function ($scope, $routeParams, $sce, PDFDetail, GlobalStorage) {
      $scope.pdf = PDFDetail.get({searchValue: $routeParams.searchValue});

      $scope.currentSearch = -1;
      $scope.validResearch = false;

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

	 console.log($('span.highlight').length)

	  $scope.highlightThis = function (string) {
	  	if(string) {
		  	var query = GlobalStorage.getData('query');
			var regexp = new RegExp( '(' + query + ')', 'gi');
			string = string.replace(regexp, '<span class="highlight">$1</span>');
			$scope.validResearch = string.indexOf('<span class="highlight">') > -1;
			return string;
		}
	  }

	  $scope.getContent = function(string) {
	  	if(string) {
	  		return $sce.trustAsHtml($scope.highlightThis(string).replace(/\n/g, '<br>'));
	  	}
	  }

	  $scope.nextSearch = function () {

	  	var search = $($('span.highlight')[$scope.currentSearch]);
	  	search.removeClass('current');

	  	if(++$scope.currentSearch >= $('span.highlight').length) {
	  		$scope.currentSearch = 0;
	  	}

	  	search = $($('span.highlight')[$scope.currentSearch]);
	  	search.addClass('current');

	  	 $('html, body').animate({
	        scrollTop: search.offset().top
	    }, 10);
	  }

	  $scope.previousSearch = function () {

	  	var search = $($('span.highlight')[$scope.currentSearch]);
	  	search.removeClass('current');

	  	if(--$scope.currentSearch < 0) {
	  		$scope.currentSearch = $('span.highlight').length - 1;
	  	}

	  	search = $($('span.highlight')[$scope.currentSearch]);
	  	search.addClass('current');

	  	 $('html, body').animate({
	        scrollTop: search.offset().top
	    }, 10);
	  }
  }]);