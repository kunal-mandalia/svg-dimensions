(function(window){

var m = m || {};

m.placeholder = 'svgplaceholder';

m.line = {
	//create 1. svg path representing distance measurement as double headed arrow
	//		 2. measurement as svg text
	// the end result being something like: <--35mm-->
	horizontal: function(title,sx,sy,fx,fy, d){
		//starting coordinates (sx,sy) lineto
		//finishing coordinates (fx,fy)
		console.log('l.h');
		// M sx,sy ld,0
		
		//svg path
		var ns = 'http://www.w3.org/2000/svg';

		var path = document.createElementNS(ns, 'path');
		path.setAttributeNS(null,'stroke','red');
		path.setAttributeNS(null,'d','M10,18 l100,0');
		document.getElementById(m.placeholder).appendChild(path);
			
		//svg text
		var text = document.createElementNS(ns, 'text');
		text.setAttributeNS(null,'x','22');
		text.setAttributeNS(null,'y','22');
		text.setAttributeNS(null,'fill','black');
		text.textContent='35mm';
		document.getElementById(m.placeholder).appendChild(text);
	},

	vertical: function(title,sx,sy,fx,fy){

	}
};


window.m = m;
console.log('loaded measurement.js');

})(window);