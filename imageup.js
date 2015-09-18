// ImageUp 1.1.2
(function(lastResize, init, min, max, key, ref, size, sizes, width, Exports, elements, element, attribute, tagName, imageUpAttribute, imageUpAttributeSize, imageUpAttributeOrig) {
	init                 = {};
	imageUpAttribute     = 'ImageUp';
	imageUpAttributeSize = imageUpAttribute+'Siz';
	imageUpAttributeOrig = imageUpAttribute+'Src';

	// upgrade images
	function ImageUp(param) {
		param = param || {};
		if (param.init) {
			init = param;
			return;
		}
		sizes     = [];
		tagName   = param.tag  || init.tag  || 'img';
		attribute = param.attr || init.attr || 'src';
		ref       = param.ref  || init.ref  || '{src}';
		max       = 0;
		min       = 1e9;
		width     = screen.width;

		// Find size boundaries
		function FindMinMax(obj) {
			for(key in obj) {
				key = parseInt(key);
				if (key) {
					if (key > 0) {
						if (key < min) min = key;
						if (key <= width && key >= max) max = key;
					}
				}
			}
		}
		FindMinMax(init);
		FindMinMax(param);

		if (width < min) return; // no changes

		elements  = document.getElementsByTagName(tagName);
		for (var i = 0; i < elements.length; i++) {
			element = elements[i];
			key = element[imageUpAttributeOrig] || element[attribute] || element.dataset[attribute];
			if (key) {
				element[imageUpAttributeOrig] = key; // save for future checks
				key = key.replace(ref, param[max] || init[max]);
				if (key != element[imageUpAttributeOrig]) { // only apply when changes are made, enables change groups
					element[attribute] = key;
					element.dataset[attribute] = key;
					if (init.debug || param.debug) {
						width = (element.id) ? '#' + element.id : ''; // reuse width field
						console.log(tagName + width + '.' + attribute + ' ' + key);
					}
				}
			}
		}
		return max;
	}

	window[imageUpAttribute] = ImageUp;
})();
