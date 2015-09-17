// ImageUp
(function(doc, win, Module, GetElementsByTagName, IsInteger, lastResize, init, min, max, key, ref, size, sizes, width, Exports, elements, element, attribute, tagName, imageUpAttribute, imageUpAttributeSize, imageUpAttributeOrig) {
	GetElementsByTagName = doc.getElementsByTagName;
	IsInteger            = Number.isInteger;
	init                 = {
		tag:  'img',
		attr: 'src',
		ref:  '{src}'
	};
	imageUpAttribute      = 'ImageUp-';
	imageUpAttributeSize = imageUpAttribute+'siz';
	imageUpAttributeOrig = imageUpAttribute+'src';

	// upgrade images
	function ImageUp(param) {
		param = param || {};
		if (param.init) {
			init = param.init;
			return;
		}
		sizes     = [];
		tagName   = param.tag  || init.tag;
		attribute = param.attr || init.attr;
		ref       = param.ref  || init.ref;
		max       = 0;
		min       = 1e9;
		width     = screen.width;

		// get ordered size boundaries
		for(key in param) {
			if (IsInteger(key)) {
				key = parseInt(key);
				if (key > 0) {
					if (key < min) min = key;
					if (key <= width && key >= max) max = key;
				}
			}
		}

		if (width < min) return; // no changes

		elements  = GetElementsByTagName(tagName);
		for (var i = 0; i < elements.length; i++) {
			element = elements[i];
			size    = element[imageUpAttributeSize] || 0;
			if (max > size) {
				element[imageUpAttributeSize] = max; // save the size for future checks, ie reorient
				key = element[imageUpAttributeOrig] || element[attribute] || element['data-' + attribute];
				element[imageUpAttributeOrig] = key; // save for future checks
				element[attribute] = key.replace(ref, param[max]);
			}
		}
	}

	// exportable module
	if (Module && Module.exports) {
		Module.exports = ImageUp;
	} else { // make global and call
		win.ImageUp = ImageUp;
	}
})(document, window, module);
