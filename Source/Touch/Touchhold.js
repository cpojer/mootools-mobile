/*
---

name: Touchhold

description: Provides a custom touchhold event for touch devices

authors: Christoph Pojer (@cpojer)

license: MIT-style license.

requires: [Core/Element.Event, Browser.Features.Touch]

provides: Touchhold

...
*/

if (Browser.Features.Touch) (function(){

var name = 'touchhold',
	delayKey = name + ':delay',
	timer;

var clear = function(e){
	clearTimeout(timer);
};

var events = {

	touchstart: function(event){
		if (event.touches.length > 1){
			clear();
			return;
		}
		
		timer = (function(){
			this.fireEvent(name, event);
		}).delay(this.retrieve(delayKey) || 750, this);
	},

	touchmove: clear,
	touchcancel: clear,
	touchend: clear

};

Element.Events[name] = {

	onAdd: function(){
		this.addEvents(events);
	},

	onRemove: function(){
		var events = this.retrieve('events');
		if (events && events[name] && !events[name].keys.length)
			this.removeEvents(events);
	}

};

})();