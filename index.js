/**The selected background color */
let bgColor = '#01ffff';
/**The selected balls color */
let ballsColor = '#213682';

document.querySelector('#bgcolor').value = bgColor;
document.querySelector('#ballscolor').value = ballsColor;
setColors();

document.querySelector('#bgcolor').addEventListener('change', (e) => {
	bgColor = e.target.value;
	setColors();
});

document.querySelector('#ballscolor').addEventListener('change', (e) => {
	ballsColor = e.target.value;
	setColors();
});

document.querySelector('#blurInput').addEventListener('change', (e) => {
	document.body.style.setProperty('--blurIntensity', `${Math.max(e.target.value || 0)}px`);
});

const initialBlur = 40;
document.querySelector('#blurInput').value = initialBlur;
document.body.style.setProperty('--blurIntensity', `${initialBlur}px`);


function setColors() {
	const bgColorRgb = hexToRgb(bgColor);
	const ballsColorRgb = hexToRgb(ballsColor);
	const differenceColorRgb = {
		r: Math.max(ballsColorRgb.r - bgColorRgb.r, 0),
		g: Math.max(ballsColorRgb.g - bgColorRgb.g, 0),
		b: Math.max(ballsColorRgb.b - bgColorRgb.b, 0),
	};
	bgColorRgb.r += differenceColorRgb.r;
	bgColorRgb.g += differenceColorRgb.g;
	bgColorRgb.b += differenceColorRgb.b;

	document.querySelector('.bgColorSetter').style.backgroundColor = colorToString(bgColorRgb);
	document.querySelector('.bgColorDifferenceHelper').style.backgroundColor = colorToString(differenceColorRgb);
	/**The helper color ensures that the resulting balls color will be as close as possible to the chosen one */
	const helperColor = {
		r: (ballsColorRgb.r / bgColorRgb.r) * 255,
		g: (ballsColorRgb.g / bgColorRgb.g) * 255,
		b: (ballsColorRgb.b / bgColorRgb.b) * 255,
	};
	document.querySelector('.ballsHelperColorSetter').style.backgroundColor = colorToString(helperColor);

	document.querySelector('#r0').innerHTML = colorToString(hexToRgb(bgColor));

	document.querySelector('#r1').innerHTML = colorToString(ballsColorRgb);
	document.querySelector('#r4').innerHTML = `Helper color is: ${colorToString(helperColor)}`;
	if(differenceColorRgb.r === 0 && differenceColorRgb.g === 0 && differenceColorRgb.b === 0){
		document.querySelector('#r3').innerHTML = `bgColorDifferenceHelper is not required`;
	}
	else{
		document.querySelector('#r3').innerHTML = `bgColorDifferenceHelper is: ${colorToString(differenceColorRgb)}`;
	}
}

/**Converts a string formatted as `#xxxxxx` into the three color channels in range `0-255` */
function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16),
		  }
		: null;
}

/**Used to pretty-print the color and assign it to an element property */
function colorToString(obj) {
	return `rgb(${obj.r}, ${obj.g}, ${obj.b})`;
}

/**Used to make the moving ball follow the mouse */
document.addEventListener('mousemove', (e) => {
	const container = document.querySelector('.bgColorSetter');
	document.body.style.setProperty('--mouseX', `${e.pageX - container.offsetTop}px`);
	document.body.style.setProperty('--mouseY', `${e.pageY - container.offsetLeft}px`);
});
