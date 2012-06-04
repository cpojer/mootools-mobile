/*
---

name: Mouse

description: Maps mouse events to their touch counterparts

authors: Christoph Pojer (@cpojer)

license: MIT-style license.

requires: [Custom-Event/Element.defineCustomEvent, Browser.Features.Touch]

provides: Mouse

...
*/

if (!Browser.Features.Touch) (function(){

var down = false;
var condition = function(event, type){
	if (type == 'touchstart') down = true;
	else if (type == 'touchend') down = false;
	else if (type == 'touchmove' && !down) return false;

	event.targetTouches = [];
	event.changedTouches = event.touches = [{
		pageX: event.page.x, pageY: event.page.y,
		clientX: event.client.x, clientY: event.client.y
	}];

	return true;
};

Element.defineCustomEvent('touchstart', {

	base: 'mousedown',
	condition: condition

}).defineCustomEvent('touchmove', {

	base: 'mousemove',
	condition: condition

}).defineCustomEvent('touchend', {

	base: 'mouseup',
	condition: condition

});

document.addEvent('mouseup', function() {
	down = false;
});

})();
