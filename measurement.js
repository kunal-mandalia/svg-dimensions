(function(window){

	var m = m || {};

	m.settings = {
		placeholder: 'svgplaceholder',
		ns: 'http://www.w3.org/2000/svg'
	}

	m.measurement = function (direction, style, length, sx, sy, render){
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
		if(length===0 || render===false){return;} //don't draw measurement for zero lengths or those explicitly mentioned not to

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
		var path = document.createElementNS(m.settings.ns, 'path');
		path.setAttributeNS(null,'stroke','red');
		path.setAttributeNS(null,'d',pathd);
		document.getElementById(m.settings.placeholder).appendChild(path);

		//SVG Rect (to provide white background behind dim text)
		var rect = document.createElementNS(m.settings.ns, 'rect');
		rect.setAttributeNS(null,'width', rectwidth);
		rect.setAttributeNS(null,'x',rectx);
		rect.setAttributeNS(null,'y',recty);
		rect.setAttributeNS(null,'height','18');
		rect.setAttributeNS(null,'fill','white');
		document.getElementById(m.settings.placeholder).appendChild(rect);

		//SVG Text
		var text = document.createElementNS(m.settings.ns, 'text');
		text.setAttributeNS(null,'x',textx);
		text.setAttributeNS(null,'y',texty);
		text.setAttributeNS(null,'fill','black');
		text.textContent=length;
		document.getElementById(m.settings.placeholder).appendChild(text);
	}

	m.profile = {

		sample: {

			outline: function(){

				var path = document.createElementNS(m.settings.ns, 'path');
				var pathd = 
				//'M20 60 l15 0 l25.65 32 l85.7 0 l25.65 -32 l15 0 l15 0 l25.65 32 l85.7 0 l25.65 -32 l15 0 l15 0 l25.65 32 l85.7 0 l25.65 -32 l15 0 l15 0 l25.65 32 l85.7 0 l25.65 -32 l15 0 l15 0 l25.65 32 l85.7 0 l25.65 -32 l15 0 l15 0 l25.65 32 l85.7 0 l25.65 -32 l15 0';
				'M20 60 q 18 -20 , 36 0 , t 36 0 , t 36 0 , t 36 0 , t 36 0 , t 36 0 , t 36 0 , t 36 0 , t 36 0 , t 36 0 , t 36 0 , t 36 0 , t 36 0 , t 36 0 , t 36 0 , t 36 0 , t 36 0 , t 36 0 ';
				//'M20 60 l17.5 0 l20.1 36 l35.9333333333333 0  l6.28833333333333 -5.04 l23.3566666666667 0 l6.28833333333333 5.04 l35.9333333333333 0l20.1 -36 l17.5 0 l17.5 0 l20.1 36 l35.9333333333333 0  l6.28833333333333 -5.04 l23.3566666666667 0 l6.28833333333333 5.04 l35.9333333333333 0l20.1 -36 l17.5 0 l17.5 0 l20.1 36 l35.9333333333333 0  l6.28833333333333 -5.04 l23.3566666666667 0 l6.28833333333333 5.04 l35.9333333333333 0l20.1 -36 l17.5 0 l17.5 0 l20.1 36 l35.9333333333333 0  l6.28833333333333 -5.04 l23.3566666666667 0 l6.28833333333333 5.04 l35.9333333333333 0l20.1 -36 l17.5 0 l17.5 0 l20.1 36 l35.9333333333333 0  l6.28833333333333 -5.04 l23.3566666666667 0 l6.28833333333333 5.04 l35.9333333333333 0l20.1 -36 l17.5 0'
				path.setAttributeNS(null,'stroke','black');
				path.setAttributeNS(null,'stroke-width','4');
				path.setAttributeNS(null,'fill','white');
				path.setAttributeNS(null,'d',pathd);
				document.getElementById(m.settings.placeholder).appendChild(path);
				console.log('outline');
			},

			measurements: function(){

				var profiledims = {

					// pitch : 167,
					// depth : 32,
					// crown : 30,
					// cover : 501,
					// trough : 85.7
					// shape: 'trapezoidal'

					// pitch : 183,
					// depth : 36,
					// crown : 35,
					// cover : 914,
					// trough : 107.8,
					// shape: 'trapezoidal'

					pitch : 72,
					depth : 20,
					crown : 0,
					cover : 648,
					trough : 0,
					shape: 'sinusoidal'
				}

				var profilebox = {

					x : 20,
					y : 60
				}

				m.profile.measurements(profiledims,profilebox);
				console.log('measurements');
			}
		},

		measurements: function(profiledims, profilebox){

				var pitch, depth, crown, cover, trough, shape; //from profiledims
				var pitches; //calculated

				pitch = profiledims.pitch;
				depth = profiledims.depth;
				crown = profiledims.crown;
				cover = profiledims.cover;
				trough = profiledims.trough;
				shape = profiledims.shape;
				pitches = Math.round(cover/pitch);

				var pitchX, pitchY, depthX, depthY, crownX, crownY, troughX, troughY, coverX, coverY, x, y;
				var pitchstyle, pitchdirection, pitchrender, 
					depthstyle, depthdirection, depthrender,
					crownstyle, crowndirection, crownrender,
					troughstyle, troughdirection, troughrender,
					coverstyle, coverdirection, coverrender;

				//initialise defaults
				pitchdirection = 'horizontal';
				pitchstyle = 'inline';
				depthdirection = 'vertical';
				depthstyle = 'above';
				crowndirection = 'horizontal';
				crownstyle = 'above';
				troughdirection = 'horizontal';
				troughstyle = 'below';
				coverdirection = 'horizontal';
				coverstyle = 'inline';

				pitchrender = depthrender = crownrender = troughrender = coverrender = true; //render all by default

				x = profilebox.x;
				y = profilebox.y;

				pitchX = depthX = crownX = troughX = coverX = x;
				pitchY = depthY = crownY = troughY = coverY = y;

				switch(pitches){ //the number of pitches determines layout of dimensions
					case 1:

						//cover==pitch, so don't show pitch and cover, just show cover
						pitchrender = false;

						if(shape=='sinusoidal'){

							//Only Cover(equal to pitch) and Depth are required
							pitchrender = false;
							crownrender = false;
							troughrender = false;

							depthX = x + 3*pitch/4;
							depthY = y - depth/2;

							coverY = y - 20;

							depthstyle = 'below';

						} 
						else{ //trapezoidal

							crownX = pitch;
							crownY = y - 10;
							crown = crown/2; //only half crown shown on single pitch profile

							depthstyle = 'below';
							depthX = x + pitch;

							troughX = x + (pitch-trough)/2;
							troughY = y + depth + 12;

							coverY = y - 40;
						}

					break;

					case 2:

						if(shape=='sinusoidal'){

							pitchX = x + (0.25 * pitch);
							pitchY = y - (0.5 * depth) - 10;

							depthX = x + (1.75 * pitch);
							depthY = y - depth/2;

							coverY = y - (0.5 * depth) - 30;

							depthstyle = 'above';
						} 
						else{ //trapezoidal

							pitchX = x + (crown/2);
							pitchY = y - 10;

							crownX = x + pitch-(0.5 * crown);
							crownY = y - 22;

							depthX = x + (1.5 * pitch);
							depthY = y;

							troughX = x + (pitch-trough)/2;
							troughY = y + depth + 12;

							coverY = y - 50;
						}

					break;

					case 3:

						if(shape=='sinusoidal'){

							pitchX = x + (1.25 * pitch);
							pitchY = y - (0.5 * depth) - 10;

							depthX = x + (2.75 * pitch);
							depthY = y - depth/2;

							coverY = y - (0.5 * depth) - 30;

							depthstyle = 'above';
						} 
						else{ //trapezoidal

							pitchX = x + (crown/2);
							pitchY = y - 10;

							crownX = x + (2 * pitch ) - (0.5 * crown);
							crownY = y - 10;

							depthX = x + (2.5 * pitch);
							depthY = y;

							troughX = x + (pitch-trough)/2;
							troughY = y + depth + 12;

							coverY = y - 50;
						}

					break;

					default:

						if(shape=='sinusoidal'){

							pitchX = x + (1.25 * pitch);
							pitchY = y - (0.5 * depth) - 10;

							depthX = x + (2.75 * pitch);
							depthY = y - depth/2;

							coverY = y - (0.5 * depth) - 30;

							depthstyle = 'above';
						} 
						else{ //trapezoidal

							pitchX = x + (crown/2) + (pitch);
							pitchY = y - 10;

							crownX = x + (3 * pitch ) - (0.5 * crown);
							crownY = y - 10;

							depthX = x + (3.5 * pitch);
							depthY = y;

							troughX = x + ((pitch-trough)/2) + (pitch);
							troughY = y + depth + 12;

							coverY = y - 50;
						}

					break;
				}

				m.measurement( pitchdirection, pitchstyle, pitch, pitchX, pitchY, pitchrender);//pitch
				m.measurement( crowndirection, crownstyle, crown, crownX, crownY, crownrender);//crown
				m.measurement( depthdirection, depthstyle, depth, depthX, depthY, depthrender);//depth
				m.measurement( troughdirection, troughstyle, trough, troughX, troughY, troughrender);//trough
				m.measurement( coverdirection, coverstyle, cover, coverX, coverY, coverrender);//cover

			console.log('m.profile.measurements');
		}
	}

window.m = m;
console.log('loaded measurement.js');
//m.profile.sample.outline();m.profile.sample.measurements();
})(window);