/*
---

name: Touch

description: Provides a replacement for click events on mobile devices

authors: Christoph Pojer (@cpojer)

license: MIT-style license.

requires: [Core/Element.Events, Browser.Features.Touch]

provides: Touch

...
*/

if (Browser.Features.Touch) (function(){

delete Element.NativeEvents.click;

var key = 'touch:count';
var preventDefault = function(event){
	event.preventDefault();
};

Element.Events.click = {

	base: 'touchend',

	condition: function(event){
		if (event.targetTouches.length != 0) return false;

		var touch = event.changedTouches[0],
			target = document.elementFromPoint(touch.clientX, touch.clientY);

		do {
			if (target == this) return true;
		} while ((target = target.parentNode) && target);

		return false;
	},

	onAdd: function(){
		this.store(key, this.retrieve(key, 0) + 1);
		this.addEvent('touchstart', preventDefault);
	},

	onRemove: function(){
		var count = this.retrieve(key, 0);
		this.store(key, --count);

		if (count <= 0) this.removeEvent('touchstart', preventDefault);
	}
	
};

})();