(function(window){

var m = m || {};

m.placeholder = 'svgplaceholder';

m.line = {
	//create svg path representing distance measurement
	horizontal: function(title,sx,sy,fx,fy, d){
		//starting coordinates (sx,sy) lineto
		//finishing coordinates (fx,fy)
		console.log('l.h');
		// M sx,sy ld,0
		// title
	},

	vertical: function(title,sx,sy,fx,fy){

	}
};


window.m = m;
console.log('loaded measurement.js');

})(window);