/*
---

name: Touch

description: Provides a replacement for click events on mobile devices

authors: Christoph Pojer (@cpojer)

license: MIT-style license.

requires: [Core/Element.Event, Browser.Features.Touch]

provides: Touch

...
*/

if (Browser.Features.Touch) (function(){

var name = 'click';
var preventDefault = function(event){
	event.preventDefault();
};

delete Element.NativeEvents[name];

Element.Events[name] = {

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
		this.addEvent('touchstart', preventDefault);
	},

	onRemove: function(){
		var events = this.retrieve('events');
		if (events && events[name] && !events[name].keys.length)
			this.removeEvent('touchstart', preventDefault);
	}
	
};

})();