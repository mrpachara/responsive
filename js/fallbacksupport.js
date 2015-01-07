(function(window, document, Modernizr){
	if(!Modernizr.history){
		var script = document.createElement('script');
		script.setAttribute('type', 'text/javascript');
		$('head').append(script);
		script.setAttribute('src', 'js/lib/history.js');
	}
})(this, this.document, this.Modernizr);
