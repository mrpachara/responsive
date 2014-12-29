(function(document, $){
	'use strict';

	var layoutURI = 'css/layout';
	var $link = $('<link rel="stylesheet" type="text/css" />');
	if(Modernizr.flexbox){
		$link.attr('href', layoutURI + '-flex.css');
	} else{
		console.log('NONE flexbox!!!');
	}

	$('head').append($link);

	$(function(){
		var $html = $('html');
		var $lyTitle = $('#ly-title');

		$(window).on('scroll.layout', function(ev){
			var $this = $(this);
			var scrollTop = $this.scrollTop();

			$html[(scrollTop == 0)? 'removeClass' : 'addClass']('st-float');

			if($html.hasClass('st-show-title')){
				if((scrollTop < $lyTitle.outerHeight()) && (($this.height() + scrollTop) < $(document).height())){
					var window_height = $this.height();
					var lyTitle_ratio = (window_height - scrollTop)/window_height;
					if(lyTitle_ratio < 0) lyTitle_ratio = 0;

					$lyTitle.attr('style', 'height: ' + (lyTitle_ratio * 100).toFixed(2) + '%;');

					//setTimeout(function(){
						var lyTitle_opacityRatio = ($lyTitle.outerHeight() - $this.scrollTop()) / $this.height();
						if(lyTitle_opacityRatio < 0) lyTitle_opacityRatio = 0;

						var $cpTitleContent = $('#cp-title-content', $lyTitle);
						$cpTitleContent.attr('style', 'opacity: ' + lyTitle_opacityRatio.toFixed(2) + '; transform: translateY(' + parseInt(scrollTop/2) + 'px);');
					//}, 1);
				}
			}
		});

		$(document).on('click.layout', '.cmd-toggle', function(ev){
			var $this = $(this);

			var $target = $('#' + $this.val());
			$target.removeAttr('style');

			$target.toggleClass('st-active');

			if($target.attr('id') == 'cp-menu'){
				$('html')[($target.hasClass('st-active'))? 'addClass' : 'removeClass']('st-overlap');
			}

			setTimeout(function(){
				$target.attr('style', 'overflow-y: auto;');
			}, 500);
		});
	});
})(window.document, window.jQuery);
