var autosMart = angular.module('AutosMart', []);

(function(document, $, angular, autosMart){
	'use strict';

	var commandData = {
		'lang': 'eng'
	};

	var loadContentFn = function(){
		var link = location.hash.substring(2);
		var $a = $('#cp-menu a[href="' + link + '"]');
		if($a.length === 0) $a = $('#cp-menu a[href]');
		history.replaceState(null, $a.first().text(), '#!' + $a.first().attr('href'));
		$a.first().trigger('click');
	};

	autosMart.controller('CommandController', ['$scope', function($scope){
		$scope.data = commandData;
		$scope.toggleLang = function(){
			if($scope.data.lang === 'eng'){
				$scope.data.lang = 'th';
			} else{
				$scope.data.lang = 'eng';
			}
		};
	}]);

	autosMart.controller('MenuController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout){
		$http.get('resources/menu.json')
			.success(function(data, status, headers, config) {
				$scope.menus = data;

				$timeout(function(){
					$(window).on('popstate.global', loadContentFn).trigger('popstate');
				}, 100);
			})
		;
	}]);

	autosMart.controller('MyTestController', ['$scope', function($scope){
		$scope.data = {'message': 'Home'};
		console.log('zzz', $scope);
	}]);

	$(function(){
		var $html = $('html');
		var $cpMenu = $('#cp-menu');
		var $lyContent = $('#ly-content');

		$('#cp-menu').on('click.global', 'a', function(ev){
			ev.preventDefault();

			var $this = $(this);

			$cpMenu.removeClass('st-active');
			$html.removeClass('st-overlap');

			$cpMenu.children().removeClass('st-active');
			$this.closest('li').addClass('st-active');

			if($this.data('showTitle')){
				$html.addClass('st-show-title');
			} else{
				$html.removeClass('st-show-title');
			}

			if(typeof ev.originalEvent != 'undefined') history.pushState(null, $this.text(), '#!' + $this.attr('href'));

			$.ajax($this.attr('href'), {
				'type': 'get',
				'cache': false
			})
				.done(function(data){
					var doc = (new DOMParser()).parseFromString(data, "text/html");
					$lyContent.empty();
					var $script = $('script', doc);
					$script.each(function(){
						$lyContent.append(document.importNode(this, true));
					});
					$script.remove();

					$('body>*', doc).each(function(){
						var newElement = document.importNode(this, true);
						$lyContent.append(newElement);
						layout.initFn();

						$('html, body').animate({'scrollTop': 0}, 'slow');
					});
					/*
					angular.element(document).injector().invoke(function($compile) {
					});
					*/
				})
			;
		});

		$('#cp-command').on('touchstart.global', 'button', function(ev){
			//ev.preventDefault();
		});
	});
})(window.document, window.jQuery, window.angular, autosMart);
