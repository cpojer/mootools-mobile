/*
---

name: Pinch

description: Provides a custom pinch event for touch devices

authors: Christopher Beloch (@C_BHole), Christoph Pojer (@cpojer)

license: MIT-style license.

requires: [Core/Element.Event, Browser.Features.Touch]

provides: Pinch

...
*/

if (Browser.Features.Touch) (function(){

var name = 'pinch',
	thresholdKey = name + ':threshold';

var events = {

	gesturechange: function(event){
		event.preventDefault();

		var threshold = this.retrieve(thresholdKey, 0.5);
		if (event.scale < (1 + threshold) && event.scale > (1 - threshold))
			return;

		event.pinch = (event.scale > 1) ? 'in' : 'out';
		this.fireEvent(name, event);
	}

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