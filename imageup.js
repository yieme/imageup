// ImageUp 1.0.2
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
			size    = element[imageUpAttributeSize] || 0;
			if (max > size) {
				element[imageUpAttributeSize] = max; // save the size for future checks, ie reorient
				key = element[imageUpAttributeOrig] || element[attribute] || element.dataset[attribute];
				if (key) {
					element[imageUpAttributeOrig] = key; // save for future checks
					key = key.replace(ref, param[max] || init[max]);
					element[attribute] = key;
					element.dataset[attribute] = key;
				}
			}
		}
		return max;
	}

	window[imageUpAttribute] = ImageUp;
})();
