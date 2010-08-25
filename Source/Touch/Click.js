/*
---

name: Click

description: Provides a replacement for click events on mobile devices

authors: Christoph Pojer (@cpojer)

license: MIT-style license.

requires: [Touch]

provides: Click

...
*/

if (Browser.Features.Touch) (function(){

var name = 'click',
	touch = Element.Events.touch;

var preventDefault = function(event){
	event.preventDefault();
};

delete Element.NativeEvents[name];

Element.Events[name] = {
	
	base: touch.base,
	
	condition: touch.condition,
	
	// TODO DRY
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