/*
---

name: Swipe

description: Provides a custom swipe event for touch devices

authors: Christopher Beloch (@C_BHole), Christoph Pojer (@cpojer), Ian Collins (@3n)

license: MIT-style license.

requires: [Core/Element.Event, Browser.Features.Touch]

provides: Swipe

...
*/

if (Browser.Features.Touch) (function(){

var name = 'swipe',
	distanceKey = name + ':distance',
	cancelKey = name + ':cancelVertical',
	dflt = 50;

var start = {},
	active;

var events = {

	touchstart: function(event){
		if (event.touches.length > 1) return;

		var touch = event.targetTouches[0];
		active = true;
		start = {
			x: touch.pageX,
			y: touch.pageY
		};
	},
	
	touchmove: function(event){
		event.preventDefault();

		if (!active) return;
		
		var touch = event.changedTouches[0];
		var end = {
			x: touch.pageX,
			y: touch.pageY
		};

		if (this.retrieve(cancelKey) && Math.abs(start.y - end.y) > Math.abs(start.x - end.x)){
			active = false;
			return;
		}
		var distance = this.retrieve(distanceKey, dflt),
			diff = end.x - start.x,
			isLeftSwipe = diff < -distance,
			isRightSwipe = diff > distance;

		if (!isRightSwipe && !isLeftSwipe)
			return;
		
		active = false;
		event.direction = (isLeftSwipe ? 'left' : 'right');
		event.start = start;
		event.end = end;
		
		this.triggerEvent(name, event);
	}

};

Element.defineCustomEvent(name, {

	onSetup: function(){
		this.addEvents(events);
	},

	onTeardown: function(){
		this.removeEvents(events);
	}

});

})();