(function(window){

var m = m || {};

m.placeholder = 'svgplaceholder';

m.line = {
	//create 1. svg path representing distance measurement as double headed arrow
	//		 2. measurement as svg text
	// the end result being something like: <--35mm-->
	horizontal: function(length, sx, sy, d){
		//TODO: adjust placement of rect and text
		//starting coordinates (sx,sy) lineto
		//finishing coordinates (fx,fy)
		console.log('l.h');
		// M sx,sy ld,0
		
		//z index determined by order in which elements are appended
		//e
		//svg path
		var ns = 'http://www.w3.org/2000/svg';

		var path = document.createElementNS(ns, 'path');
		var pathd = 'M' + sx + ',' + sy + ' l' + d + ',0';
		path.setAttributeNS(null,'stroke','red');
		path.setAttributeNS(null,'d',pathd);
		document.getElementById(m.placeholder).appendChild(path);
		
		//svg rect to provide white background behind dim text
		var rect = document.createElementNS(ns, 'rect');

		//width of rect depends on number of digits in length
		//possible values include 4digits e.g. cover = 1000,
		//3digits e.g. pitch = 180, 2digits e.g. depth = 30,
		//1digit e.g. crown = 8
		var rectdigits = (''+length).length; //cast to string then count number of digits
		/*
			1digit -> px
			2digits -> px
			3digits -> px
			4digits -> px
			rectwidth = k * rectdigits;
			k = width of single digit
		*/
		var rectwidth = 5 * rectdigits;
		rect.setAttributeNS(null,'width', rectwidth);

		/*
		rect should sit in the middle of the path
		*/
		var rectx = sx + d/2 - rectwidth/2;
		rect.setAttributeNS(null,'x',rectx);

		rect.setAttributeNS(null,'y',sy);
		rect.setAttributeNS(null,'height','15');
		rect.setAttributeNS(null,'fill','red');
		document.getElementById(m.placeholder).appendChild(rect);

		//svg text
		var text = document.createElementNS(ns, 'text');
		text.setAttributeNS(null,'x',rectx);
		text.setAttributeNS(null,'y',sy);
		text.setAttributeNS(null,'fill','black');
		text.textContent=length;
		document.getElementById(m.placeholder).appendChild(text);
	},

	vertical: function(title,sx,sy,fx,fy){

	}
};


window.m = m;
console.log('loaded measurement.js');
m.line.horizontal(30,20,40,100);
})(window);