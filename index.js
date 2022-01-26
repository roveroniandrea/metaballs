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

function setColors() {
	document.querySelector('.rootContainer').style.backgroundColor = bgColor;
	const bgColorRgb = hexToRgb(bgColor);
	const ballsColorRgb = hexToRgb(ballsColor);
	/**The helper color ensures that the resulting balls color will be as close as possible to the chosen one */
	const helperColor = {
		r: ((ballsColorRgb.r / bgColorRgb.r) * 255) % 255,
		g: ((ballsColorRgb.g / bgColorRgb.g) * 255) % 255,
		b: ((ballsColorRgb.b / bgColorRgb.b) * 255) % 255,
	};
	document.querySelector('.ballsHelperColorSetter').style.backgroundColor = colorToString(helperColor);

	document.querySelector('#r0').innerHTML = colorToString(bgColorRgb);

	document.querySelector('#r1').innerHTML = colorToString(ballsColorRgb);
	/**The resulting color of the balls, can be different from the chosen one */
	const calculatedResultingColor = {
		r: ((helperColor.r / 255) * (bgColorRgb.r / 255) * 255) % 255,
		g: ((helperColor.g / 255) * (bgColorRgb.g / 255) * 255) % 255,
		b: ((helperColor.b / 255) * (bgColorRgb.b / 255) * 255) % 255,
	};
	/**There might be some losses in the final ball color due to `mix-blend-mode: multiply;` calculating only the modulus values */
	const calculatedLossColor = {
		r: ballsColorRgb.r - calculatedResultingColor.r,
		g: ballsColorRgb.g - calculatedResultingColor.g,
		b: ballsColorRgb.b - calculatedResultingColor.b,
	};
	document.querySelector('#r2').innerHTML = `Ball color resulting: ${colorToString(calculatedResultingColor)}`;
	document.querySelector('#r3').innerHTML = `Ball color loss: ${colorToString(calculatedLossColor)}`;
	document.querySelector('#r4').innerHTML = `Helper color is: ${colorToString(helperColor)}`;
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
	const container = document.querySelector('.rootContainer');
	document.body.style.setProperty('--mouseX', `${e.pageX - container.offsetTop}px`);
	document.body.style.setProperty('--mouseY', `${e.pageY - container.offsetLeft}px`);
});
