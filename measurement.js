(function(window){

	var m = m || {};

	m.placeholder = 'svgplaceholder';
	m.ns = 'http://www.w3.org/2000/svg';

	m.line = function (direction, style, length, sx, sy){
		/*
		Outputs SVG to draw measurements e.g. |----75----|
			direction horizontal or vertical
			style inline, above or below
			A measurement/line is composed of 3 SVG objects;
			- path (red line showing length spatially),
			- text (showing length numerically)
			- rect (to serve as background to text so path doesn't strikeout text)
			z index determined by order in which elements are appended
		*/

		var digits = (''+length).length; //cast to string then count number of digits
		var pathd; //SVG Path d describing vector line
		var rectx, recty, rectwidth; //SVG Rect coordinates
		var textx, texty; //SVG Text coordinates


		switch(direction){
			case 'horizontal':

				pathd = 'M' + sx + ',' + (sy - 6) + ' l0,12' + //left t
					'M' + sx + ',' + sy + ' l' + length + ',0' + //length
					'M' + (sx+length) + ',' + (sy - 6) + 'l0,12'; //right t;

				switch (style) {
					case 'inline': //middle when direction is vertical
						textx = sx + length/2 - (8 * digits)/2; //each text character is 8px wide
						texty = sy + 5;
						rectx = textx;
						recty = sy - 9;
						rectwidth = 8 * digits;
				    break;

				    case 'above':
					    textx = sx + length/2 - (8 * digits)/2;
					    texty = sy -5;
						rectx = 0;
						recty = 0;
					    rectwidth = 0;//rect not visible
				    break;
				    
				    case 'below':
					    textx = sx + length/2 - (8 * digits)/2;
					    texty = sy + 15;
					    rectx = 0;
						recty = 0;
					    rectwidth = 0;
				    break;

				    default:
				    break;
				}

			break;

			case 'vertical':

				pathd = 'M' + (sx-6) + ',' + sy + ' l12,0' + //top t
					'M' + sx + ',' + sy + ' l' + '0,' + length  + //length down
					'M' + (sx-6) + ',' + (sy + length) + 'l12,0'; //bottom t; 

				switch (style) {
					case 'inline': //middle when direction is vertical
						textx = sx - (8 * digits)/2;
						texty = sy + length/2;
						rectx = textx;
						recty = sy + length/2 - 14;
						rectwidth = 8 * digits;
				    break;

				    case 'above':
					    textx = sx - (8 * digits)/2;
					    texty = sy -5;
						rectx = 0;
						recty = 0;
					    rectwidth = 0;//rect not visible
				    break;
				    
				    case 'below':
					    textx = sx  - (8 * digits)/2;
					    texty = sy + length + 15;
					    rectx = 0;
						recty = 0;
					    rectwidth = 0;
				    break;

				    default:
				    break;
				}

			break;

			default:
			break;
		}

		//SVG Path
		var path = document.createElementNS(m.ns, 'path');
		path.setAttributeNS(null,'stroke','red');
		path.setAttributeNS(null,'d',pathd);
		document.getElementById(m.placeholder).appendChild(path);

		//SVG Rect (to provide white background behind dim text)
		var rect = document.createElementNS(m.ns, 'rect');
		rect.setAttributeNS(null,'width', rectwidth);
		rect.setAttributeNS(null,'x',rectx);
		rect.setAttributeNS(null,'y',recty);
		rect.setAttributeNS(null,'height','18');
		rect.setAttributeNS(null,'fill','white');
		document.getElementById(m.placeholder).appendChild(rect);

		//SVG Text
		var text = document.createElementNS(m.ns, 'text');
		text.setAttributeNS(null,'x',textx);
		text.setAttributeNS(null,'y',texty);
		text.setAttributeNS(null,'fill','black');
		text.textContent=length;
		document.getElementById(m.placeholder).appendChild(text);
	}

	m.sampleprofile = function(){

		var path = document.createElementNS(m.ns, 'path');
		var pathd = 'M0 50 l15 0 l25.65 32 l85.7 0 l25.65 -32 l15 0 l15 0 l25.65 32 l85.7 0 l25.65 -32 l15 0 l15 0 l25.65 32 l85.7 0 l25.65 -32 l15 0 l15 0 l25.65 32 l85.7 0 l25.65 -32 l15 0 l15 0 l25.65 32 l85.7 0 l25.65 -32 l15 0 l15 0 l25.65 32 l85.7 0 l25.65 -32 l15 0';
		path.setAttributeNS(null,'stroke','black');
		path.setAttributeNS(null,'stroke-width','4');
		path.setAttributeNS(null,'fill','white');
		path.setAttributeNS(null,'d',pathd);
		document.getElementById(m.placeholder).appendChild(path);
	}

	m.samplemeasurements = function(){
		m.line('horizontal','inline', 167, 0,40);//pitch
		m.line('horizontal','above', 30, 319,40);//crown
		m.line('vertical','below', 32, 167,54);//depth
		m.line('horizontal','below', 85.7, 40.65,95);//trough
		m.line('horizontal','inline', 1000, 0,10);//cover

	}


window.m = m;
console.log('loaded measurement.js');
//m.line.horizontal(10,20,40);
})(window);