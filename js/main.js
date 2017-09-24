/*
	File Name: main.js
	Author: Jayvee O. Cruz
*/

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
		select('.content').setStyle({
			'opacity': 1,
			'transform': 'perspective(1000px) scale(1)',
			'transition': 'opacity 1s ease-in-out, transform 1s ease-in-out'
		});
	}
}

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

				return true;
				console.log('element:', element_id, 'is visible:', isVisible);
			} else {
				return false;
				console.log('element:', element_id, 'is visible:', isVisible);
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