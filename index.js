/**The selected background color */
let bgColor = '#01ffff';
/**The selected balls color */
let ballsColor = '#213682';

//Just to provide some interactivity in the page
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
	document.querySelector('.metaballsContainer .bg').style.backgroundColor = bgColor;
	document.querySelector('.metaballsContainer .fg').style.backgroundColor = ballsColor

	document.querySelector('#r0').innerHTML = bgColor;

	document.querySelector('#r1').innerHTML = ballsColor;
}

/**Used to make the moving ball follow the mouse */
document.addEventListener('mousemove', (e) => {
	const container = document.querySelector('.metaballsContainer');
	document.body.style.setProperty('--mouseX', `${e.pageX - container.offsetLeft}px`);
	document.body.style.setProperty('--mouseY', `${e.pageY - container.offsetTop}px`);
});
