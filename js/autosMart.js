var autosMart = angular.module('AutosMart', []);

(function(document, autosMart){
	'use strict';

	autosMart.controller('MenuController', ['$scope', '$http', function($scope, $http){
		$http.get('resources/menu.json')
			.success(function(data, status, headers, config) {
				$scope.menus = data;
				$scope.searchTerm = '';
			})
		;
	}]);

	/*
	var searchData = {
		'term': '1234'
	};
	autosMart.controller('SearchController', ['$scope', function($scope){
		$scope.data = searchData;
	}]);
	*/
})(window.document, autosMart);
