/*
	File Name: main.js
	Author: Jayvee O. Cruz
*/

localStorage['creativeName'] = '';

var imageLoaded = 0,
	images = [
		'iconv1.ico',
		'background1.jpg',
		'background2.jpg',
		'monitor.png',
		'gear.png',
		'megaphone.png'
	];

function initiate() {
	// Display The Website
	select('html, body').setStyle({
		'display': 'block'
	});

	// Custom Style
	customStyle();

	// Check If The Element Is Visible
	checkElementIfVisible();
	window.addEventListener('scroll', checkElementIfVisible);

	// Initiate Word Cloud
	tagCanvas();

	// Rich Media
	// iFrame();
}

function customStyle() {

}

function checkElementIfVisible() {
	if (checkIfVisibleById('taglineParagraph')) {
		select('#taglineParagraph').setStyle({
			'opacity': 1,
			'transform': 'translate3d(0px, 0px, 0px)',
			'transition': 'opacity 1s ease-in-out, transform 1s ease-in-out'
		});
	}

	if (checkIfVisibleById('title1')) {
		select('#title1').setStyle({
			'opacity': 1,
			'transform': 'perspective(1000px) scale(1)',
			'transition': 'opacity 1s ease-in-out, transform 1s ease-in-out'
		});
	}

	if (checkIfVisibleById('contentsHolder1')) {
		select('#contentsHolder1 .content').setStyle({
			'opacity': 1,
			'transform': 'perspective(1000px) scale(1)',
			'transition': 'opacity 1s ease-in-out, transform 1s ease-in-out'
		});
	}

	if (checkIfVisibleById('title2')) {
		select('#title2').setStyle({
			'opacity': 1,
			'transform': 'perspective(1000px) scale(1)',
			'transition': 'opacity 1s ease-in-out, transform 1s ease-in-out'
		});
	}

	if (checkIfVisibleById('wordCloudContainer')) {
		select('#wordCloudContainer').setStyle({
			'opacity': 1,
			'transform': 'perspective(1000px) scale(1)',
			'transition': 'opacity 1s ease-in-out, transform 1s ease-in-out'
		});
	}

	if (checkIfVisibleById('title3')) {
		select('#title3').setStyle({
			'opacity': 1,
			'transform': 'perspective(1000px) scale(1)',
			'transition': 'opacity 1s ease-in-out, transform 1s ease-in-out'
		});
	}

	if (checkIfVisibleById('contentsHolder2')) {
		select('.contentCaption').setStyle({
			'opacity': 1,
			'transform': 'perspective(1000px) scale(1)',
			'transition': 'opacity 1s ease-in-out, transform 1s ease-in-out'
		});

		if (checkIfVisibleById('richMedia1')) {
			if (getElementById('richMedia1').classList.value.indexOf('active') == -1) {
				select('#contentsHolder2 #richMedia1').setStyle({
					'opacity': 1,
					'transform': 'perspective(1000px) scale(1)',
					'transition': 'opacity 1s ease-in-out, transform 1s ease-in-out'
				});

				localStorage['creativeName'] += 'adidas,';
				getElementById('richMedia1').classList.add('active');
			}
		}

		if (checkIfVisibleById('richMedia2')) {
			if (getElementById('richMedia2').classList.value.indexOf('active') == -1) {
				select('#contentsHolder2 #richMedia2').setStyle({
					'opacity': 1,
					'transform': 'perspective(1000px) scale(1)',
					'transition': 'opacity 1s ease-in-out, transform 1s ease-in-out'
				});

				localStorage['creativeName'] += 'pill-pockets,';
				getElementById('richMedia2').classList.add('active');
			}
		}
	}

	if (checkIfVisibleById('contentsHolder3')) {

		if (checkIfVisibleById('richMedia3')) {
			if (getElementById('richMedia3').classList.value.indexOf('active') == -1) {
				select('#contentsHolder3 #richMedia3').setStyle({
					'opacity': 1,
					'transform': 'perspective(1000px) scale(1)',
					'transition': 'opacity 1s ease-in-out, transform 1s ease-in-out'
				});

				localStorage['creativeName'] += 'servpro,';
				getElementById('richMedia3').classList.add('active');
			}
		}

		if (checkIfVisibleById('richMedia4')) {
			if (getElementById('richMedia4').classList.value.indexOf('active') == -1) {
				select('#contentsHolder3 #richMedia4').setStyle({
					'opacity': 1,
					'transform': 'perspective(1000px) scale(1)',
					'transition': 'opacity 1s ease-in-out, transform 1s ease-in-out'
				});

				localStorage['creativeName'] += 'maui-jim,';
				getElementById('richMedia4').classList.add('active');
			}
		}
	}
}

function tagCanvas() {
	TagCanvas.Start('wordCloud', 'tags', {
		textFont: 'Courier New, sans-serif',
		textColour: '#FFF',
		shadow: '#FFF',
		shadowBlur: 10,
		textHeight: 30,
		stretchX: 2,
		noSelect: true,
		activeCursor: 'default',
		animTiming: 'Smooth',
		wheelZoom: false,
		noMouse: true,
		reverse: true,
		initial: [0.1, 0.05],
		depth: 1,
    	maxSpeed: 0.1,
	});
}

// function iFrame() {
// 	var iFrame = document.getElementsByTagName('iframe');
// 		iframeCount = iFrame.length;

// 	// for (var f = 0; f < iFrame.length; f++) {
// 	// 	iFrame[f].contentWindow.window.document.body.style.cssText = 'margin: 0; padding:0';

// 	// 	var offsetWidth = iFrame[f].contentWindow.window.document.body.offsetWidth,
// 	// 		offsetHeight = iFrame[f].contentWindow.window.document.body.offsetHeight;

// 	// 	iFrame[f].style.cssText = 'width: ' + offsetWidth + 'px;' +
// 	// 							  'height: ' + offsetHeight + 'px';
// 	// }
// }

// Automatic Functions
var getElementById = function(elementId) {
		var element_id = document.getElementById(elementId);

		if (element_id != null) {
			return element_id;
		} else {
			throw 'SyntaxError: element id "' + elementId + '" does not defined!';
		}
	},
	preloadImages = function() {
		for (var i = 0; i < images.length; i++) {
			var image = new Image();
				image.src = 'assets/' + images[i];
				image.addEventListener('load', checkIfImagesIsLoaded, false);
		}
	},
	checkIfImagesIsLoaded = function() {
		imageLoaded++;

		if (imageLoaded === images.length) {
			setTimeout(initiate, 1000);
		}
	},
	checkIfVisibleById = function(elementId) {
		var element_id = document.getElementById(elementId);

		if (element_id != null) {
			var selected_element_top = element_id.getBoundingClientRect().top,
				selected_element_bottom = element_id.getBoundingClientRect().bottom,
				window_inner_height = window.innerHeight;

			if (selected_element_top <= window_inner_height && selected_element_bottom >= 0) {
				// console.log('Element:', element_id);
				// console.log('Element Top:', selected_element_top);
				// console.log('Element Bottom:', selected_element_bottom);
				// console.log('Window Inner Height:', window_inner_height);

				// console.log('element:', elementId, 'is visible:', true);
				return true;
			} else {
				// console.log('element:', elementId, 'is visible:', false);
				return false;
			}
		} else {
			throw 'SyntaxError: element id "' + elementId + '" does not defined!';
		}
	},
	select = function(selected) {
		var selected_element = document.querySelectorAll(selected);

		if (selected_element.length != 0) {
			return new customFunction(selected_element);
		} else {
			throw 'SyntaxError: element "' + selected + '" does not defined!';
		}
	},
	customFunction = function(selected_element) {
		this.setStyle = function(style) {
			for (var e = 0; e < selected_element.length; e++) {
				for (property in style) {
					if (property in selected_element[e].style) {
						if (property == 'transition' || property == 'transform') {
							if (style[property].indexOf('transform') > -1) {
								// console.log('-webkit-' + property + ': ' + style[property].replace('transform', '-webkit-transform') + ';\n' +
								// 			'-moz-' + property + ': ' + style[property].replace('transform', '-moz-transform') + ';\n' +
								// 			'-ms-' + property + ': ' + style[property].replace('transform', '-ms-transform') + ';\n' +
								// 			property + ': ' + style[property] + ';');

								selected_element[e].style.cssText += '-webkit-' + property + ': ' + style[property].replace('transform', '-webkit-transform') + ';\n' +
																	 '-moz-' + property + ': ' + style[property].replace('transform', '-moz-transform') + ';\n' +
																	 '-ms-' + property + ': ' + style[property].replace('transform', '-ms-transform') + ';\n' +
																	 property + ': ' + style[property] + ';';
							} else {
								// console.log('-webkit-' + property + ': ' + style[property] + ';\n' +
								// 			'-moz-' + property + ': ' + style[property] + ';\n' +
								// 			'-ms-' + property + ': ' + style[property] + ';\n' +
								// 			property + ': ' + style[property] + ';');

								selected_element[e].style.cssText += '-webkit-' + property + ': ' + style[property] + ';\n' +
																	 '-moz-' + property + ': ' + style[property] + ';\n' +
																	 '-ms-' + property + ': ' + style[property] + ';\n' +
																	 property + ': ' + style[property] + ';';
							}
						} else {
							// console.log(property + ': ' + style[property]);
							selected_element[e].style.cssText += property + ': ' + style[property];
						}
					} else {
						throw 'SyntaxError: style property "' + property + '" is not defined!';
					}
				}
			}
			// console.log(selected_element, style);
		}
	};

var ifEverythingIsLoaded = setInterval(function() {
	if (/loaded|complete/.test(document.readyState)) {
		clearInterval(ifEverythingIsLoaded);
		preloadImages(); // this is the function that gets called when everything is loaded
	}
}, 8);