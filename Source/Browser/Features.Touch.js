/*
---

name: Browser.Features.Touch

description: Checks whether the used Browser has touch events

authors: Christoph Pojer (@cpojer)

license: MIT-style license.

requires: [Core/Browser]

provides: Browser.Features.Touch

...
*/

Browser.Features.Touch = (function(){
	var hasTouch = false;
	var handler = function(){
		document.html.removeEventListener('cantouch', handler, true);
		hasTouch = true;
	};

	try {
		document.html.addEventListener('cantouch', handler, true);
		var event = document.createEvent('TouchEvent');
		event.initTouchEvent('cantouch');
		// Chrome 5 thinks it has touch events
		document.html.dispatchEvent(event); // thanks @jdalton
		return hasTouch;
	} catch (exception){}

	handler(); // Remove event again
	return false;
})();