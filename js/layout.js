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
			/*
			$('button.cmd-toggle').each(function(){
				$('#' + $(this).val()).removeClass('st-active');
			});
			*/

			if((scrollTop < $lyTitle.outerHeight()) && (($this.height() + scrollTop) < $(document).height())){
				var window_height = $this.height();
				var lyTitle_ratio = (window_height - scrollTop)/window_height;
				if(lyTitle_ratio < 0) lyTitle_ratio = 0;

				$lyTitle.attr('style', 'height: ' + (lyTitle_ratio * 100) + '%');

				setTimeout(function(){
					var lyTitle_opacityRatio = ($lyTitle.outerHeight() - $this.scrollTop()) / $this.height();
					if(lyTitle_opacityRatio < 0) lyTitle_opacityRatio = 0;

					$('.el-content', $lyTitle).attr('style', 'opacity: ' + lyTitle_opacityRatio + ';');
				}, 1);
			}
		});

		$(document).on('click.global', '.cmd-toggle', function(ev){
			var $this = $(this);

			var $target = $('#' + $this.val());
			$target.removeAttr('style');

			$target.toggleClass('st-active');
			setTimeout(function(){
				$target.attr('style', 'overflow-y: auto;');
			}, 500);
		});
	});
})(window.document, window.jQuery);
