
// ============= SCROLLING ANIMATIONS =================

window.addEventListener('DOMContentLoaded', e => {
	document.querySelector('.one').style.animationName = 'fade-in-a';
})

window.addEventListener('scroll', e => {
	// console.log(parseInt(document.querySelector('.three').getBoundingClientRect()['top']), parseInt(innerHeight) + 200)
	if (pageYOffset > 30) {
		document.querySelector('header').style.top = (innerWidth < 600) ? '-50px' : '-45px';
	} else {
		document.querySelector('header').style.top = '0px';
	}
	// hecks whether the element is within the limits of the viewport or not
	let fade = (element, animationName) => {
		if (element.getBoundingClientRect()['top'] < innerHeight) 
			element.style.animationName = animationName;
	}; 
	
	Array.from(document.querySelectorAll('.block:not(.one):not(.two)')).forEach(block => fade(block, 'fade-in-a'));
	Array.from(document.querySelectorAll('#block7 img')).forEach(image => fade(image, 'fade-in-a'));
	fade(document.querySelector('#block4'), 'fade-in-b');
	fade(document.querySelector('#block5'), 'fade-in-b');
})

// ############ get book from db ###############

function generateBook(){
	
}
