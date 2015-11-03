(function(window){

var m = m || {};

m.placeholder = 'svgplaceholder';
m.ns = 'http://www.w3.org/2000/svg';
m.line = {
	//create 1. svg path representing distance measurement as double headed arrow
	//		 2. measurement as svg text
	// the end result being something like: <--35mm-->
	horizontal: function(length, sx, sy){
		//TODO: adjust placement of rect and text
		//starting coordinates (sx,sy) lineto
		//finishing coordinates (fx,fy)
		// M sx,sy ld,0
		
		//z index determined by order in which elements are appended
		//e
		//svg path

		var path = document.createElementNS(m.ns, 'path');
		var pathd = 'M' + sx + ',' + sy + ' l' + length + ',0';
		path.setAttributeNS(null,'stroke','red');
		path.setAttributeNS(null,'d',pathd);
		document.getElementById(m.placeholder).appendChild(path);
		
		//svg rect to provide white background behind dim text
		var rect = document.createElementNS(m.ns, 'rect');

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
		var rectwidth = 8 * rectdigits;
		rect.setAttributeNS(null,'width', rectwidth);

		/*
		rect should sit in the middle of the path
		*/
		var rectx = sx + length/2 - rectwidth/2;
		rect.setAttributeNS(null,'x',rectx);

		var recty = sy - 9;
		rect.setAttributeNS(null,'y',recty);
		rect.setAttributeNS(null,'height','18');
		rect.setAttributeNS(null,'fill','white');
		document.getElementById(m.placeholder).appendChild(rect);

		//svg text
		var text = document.createElementNS(m.ns, 'text');
		text.setAttributeNS(null,'x',rectx);
		text.setAttributeNS(null,'y',sy+5);
		text.setAttributeNS(null,'fill','black');
		text.textContent=length;
		document.getElementById(m.placeholder).appendChild(text);
	},

	vertical: function(title,sx,sy,fx,fy){

	},

	sampleprofile: function(){

		var path = document.createElementNS(m.ns, 'path');
		var pathd = 'M0 50 l15 0 l25.65 32 l85.7 0 l25.65 -32 l15 0 l15 0 l25.65 32 l85.7 0 l25.65 -32 l15 0 l15 0 l25.65 32 l85.7 0 l25.65 -32 l15 0 l15 0 l25.65 32 l85.7 0 l25.65 -32 l15 0 l15 0 l25.65 32 l85.7 0 l25.65 -32 l15 0 l15 0 l25.65 32 l85.7 0 l25.65 -32 l15 0';
		path.setAttributeNS(null,'stroke','black');
		path.setAttributeNS(null,'stroke-width','4');
		path.setAttributeNS(null,'fill','white');
		path.setAttributeNS(null,'d',pathd);
		document.getElementById(m.placeholder).appendChild(path);
	}
};


window.m = m;
console.log('loaded measurement.js');
//m.line.horizontal(10,20,40);
})(window);