/*
	File Name: main.js
	Author: Jayvee O. Cruz
*/

var imageLoaded = 0,
	images = [
		'iconv1.ico',
		'background1.jpg',
		'background2.jpg'
	];

function initiate() {
	// Display The Website
	selectElementToStyle('html, body').setStyle({
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
	if (checkIfVisible('taglineP')) {
		selectElementToStyle('#taglineP').setStyle({
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
	checkIfVisible = function(elementId) {
		var element_id = document.getElementById(elementId),
			element_top,
			element_bottom,
			window_inner_height = window.innerHeight;

		if (element_id != null) {
			element_top = element_id.getBoundingClientRect().top,
			element_bottom = element_id.getBoundingClientRect().bottom;

			if (element_top <= window_inner_height && element_bottom >= 0) {
				// console.log('Element Id:', elementId);
				// console.log('Element Top:',element_top);
				// console.log('Element Bottom:',element_bottom);
				// console.log('Window Inner Height:',window_inner_height);

				isVisible = true;
			} else {
				isVisible = false;
			}
		} else {
			throw 'SyntaxError: element id "' + elementId + '" does not defined!';
		}

		// console.log('element id: "' + elementId + '" is visible:', isVisible);
		return isVisible;
	},
	selectElementToStyle = function(selectedElement) {
		var selected_element = document.querySelectorAll(selectedElement);

		if (selected_element.length != 0) {
			return new customSetStyle(selected_element);
		} else {
			throw 'SyntaxError: element "' + selectedElement + '" does not defined!';
		}
	},
	customSetStyle = function(selected_element) {
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