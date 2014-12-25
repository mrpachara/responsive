var autosMart = angular.module('AutosMart', []);

(function(window, document, autosMart){
	'use strict';
	
	console.log(autosMart);
	
	autosMart.controller('MenuController', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http){
		console.log('xxx');
		$http.get('resources/menu.json')
			.success(function(data, status, headers, config) {
				$scope.menus = data;
			})
		;
	}]);
})(window, document, autosMart);