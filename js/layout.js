var layout = {
	'type': 'noflexbox'
};

(function(document, $){
	'use strict';

	var layoutURI = 'css/layout';
	var $link = $('<link rel="stylesheet" type="text/css" />');
	if(Modernizr.flexbox){
		$link.attr('href', layoutURI + '-flexbox.css');
		layout.type = 'flexbox';
	} else if(Modernizr.flexboxtweener){
		$link.attr('href', layoutURI + '-flexboxtweener.css');
		layout.type = 'flexboxtweener';
		$(function(){
			var flexibleDummy = '<div class="ly-flexboxtweener-flexible" />';
			$('#ly-navigation>.ly-element:last-child').before(flexibleDummy);
			$('#ly-footer>*:last-child').before(flexibleDummy);
			$('#ly-footer').before(flexibleDummy);
		});
	} else if(Modernizr.flexboxlegacy){
		$link.attr('href', layoutURI + '-flexboxlegacy.css');
		layout.type = 'flexboxlegacy';
		$(function(){
			$('#ly-navigation')
				.wrap('<div class="ly-wrapper" style="position: fixed; top: 0px; box-sizing: border-box; width: 100%; z-index: 999;"></div>')
				.addClass('ly-nofixed')
			;

			var flexibleDummy = '<div class="ly-flexboxlegacy-flexible" />';
			$('#ly-navigation>.ly-element:last-child').before(flexibleDummy);
			$('#ly-footer>*:last-child').before(flexibleDummy);
			$('#ly-footer').before(flexibleDummy);
		});
	} else{
		$link.attr('href', layoutURI + '-noflexbox.css');
		layout.type = 'noflexbox';
	}

	$('head').append($link);

	$(function(){
		var $html = $('html');
		var $lyTitle = $('#ly-title');
		var $cpTitleContent = $('#cp-title-content', $lyTitle);
		var $lyFooter = $('#ly-footer');

		if((layout.type === 'flexbox') || (layout.type === 'flexboxtweener')){
			layout.initFn = function(){
				$lyTitle.removeAttr('style');
				$cpTitleContent.removeAttr('style');
			};
		} else if(layout.type === 'flexboxlegacy'){
			layout.initFn = function(){
				$lyTitle.attr('style', 'height: ' + $(window).height() + 'px;');
				$cpTitleContent.removeAttr('style');
			};
		} else {
			layout.initFn = function(){
				$lyTitle.attr('style', 'height: ' + $(window).height() + 'px;');
				$cpTitleContent.removeAttr('style');
				$lyFooter.removeAttr('style');

				if($(window).height() > ($lyFooter.offset()['top'] + $lyFooter.outerHeight())) $lyFooter.attr('style', 'width: 100%; position: fixed;');
			};
		}

		layout.initFn();

		$(window).on('scroll.layout', function(ev){
			var $this = $(this);
			var scrollTop = $this.scrollTop();

			if(scrollTop == 0) $html.stop();

			$html[(scrollTop == 0)? 'removeClass' : 'addClass']('st-float');

			if($html.hasClass('st-show-title')){
				if((scrollTop < $lyTitle.outerHeight()) && (($this.height() + scrollTop) < $(document).height())){
					if((layout.type === 'flexbox') || (layout.type === 'flexboxtweener')){
						var window_height = $this.height();
						var lyTitle_ratio = (window_height - scrollTop)/window_height;
						if(lyTitle_ratio < 0) lyTitle_ratio = 0;

						$lyTitle.attr('style', 'height: ' + (lyTitle_ratio * 100).toFixed(2) + '%;');
					} else{ // for flaxboxlegacy and noflexbox
						var window_height = $this.height();
						var lyTitle_height = window_height - scrollTop;
						if(lyTitle_height < 0) lyTitle_height = 0;

						$lyTitle.attr('style', 'height: ' + lyTitle_height + 'px;');
					}

					var lyTitle_opacityRatio = ($lyTitle.outerHeight() - $this.scrollTop()) / $this.height();
					if(lyTitle_opacityRatio < 0) lyTitle_opacityRatio = 0;

					$cpTitleContent.attr('style', 'opacity: ' + lyTitle_opacityRatio.toFixed(2) + '; transform: translateY(' + parseInt(scrollTop/2) + 'px);');
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
