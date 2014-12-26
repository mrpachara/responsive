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
})(window.document, window.jQuery);
