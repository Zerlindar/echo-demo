/*!
 *  Echo v1.4.0
 *  Lazy-loading with data-* attributes, offsets and throttle options
 *  Project: https://github.com/toddmotto/echo
 *  by Todd Motto: http://toddmotto.com
 *  Copyright. MIT licensed.
 */
window.Echo = (function(window, document, undefined) {
	'use strict';

	var store = [],
	offset,
	throttle,
	poll;
    /*判断图片是否位于页面的可视区域*/
	var _inView = function(el) {
		var coords = el.getBoundingClientRect();
		return ((coords.top >= 0 && coords.left >= 0 && coords.top) <= (window.innerHeight || document.documentElement.clientHeight) + parseInt(offset));
	};
    /*当图片处于页面的可视区域后加载图片*/
	var _pollImages = function() {
		for (var i = store.length; i--;) {
			var self = store[i];
			if (_inView(self)) {
				self.src = self.getAttribute('data-echo');
				store.splice(i, 1);
			}
		}
	};

	var _throttle = function() {
		clearTimeout(poll);
		poll = setTimeout(_pollImages, throttle);
	};

	var init = function(obj) {
		var nodes = document.querySelectorAll('[data-echo]');
		var opts = obj || {};
		offset = opts.offset || 0;
		throttle = opts.throttle || 250;

		for (var i = 0; i < nodes.length; i++) {
			store.push(nodes[i]);
		}

		_throttle();

		if (document.addEventListener) {
			window.addEventListener('scroll', _throttle, false);
		} else {
			window.attachEvent('onscroll', _throttle);
		}
	};

	return {
		init: init,
		render: _throttle
	};

})(window, document);