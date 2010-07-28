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

Element.Events.swipe = {
	onAdd: function(fn){
		Element.Events.swipe.startX, 
		Element.Events.swipe.startY, 
		Element.Events.swipe.active = false;
		
		Element.Events.swipe.minDistance = 50; // minimal distance to swipe
		
		touchStart = function(event){
			Element.Events.swipe.active = true;
			Element.Events.swipe.startX = event.event.touches[0].pageX;
			Element.Events.swipe.startY = event.event.touches[0].pageY;
		};
		
		touchMove = function(event){
			event.preventDefault();
			endX = event.event.touches[0].pageX;
			endY = event.event.touches[0].pageY;
			
			swipeDiff = endX - Element.Events.swipe.startX;
			
			isLeftSwipe = swipeDiff < Element.Events.swipe.minDistance * -1;
			isRightSwipe = swipeDiff > Element.Events.swipe.minDistance;
			
			// ! TODO: check vertical movement to cancel swipe
			
			if (Element.Events.swipe.active && (isRightSwipe || isLeftSwipe)){
				Element.Events.swipe.active = false;
				fn.call(this, {
					'direction': isLeftSwipe ? 'left' : 'right'
				});
			}
		};
		
		this.addEvent('touchstart', touchStart);    
		this.addEvent('touchmove', touchMove);
	}
};

// Add Custom Pinch Event
Element.Events.pinch = {
	onAdd: function(fn){
		Element.Events.pinch.active = true;
		
		gestureStart = function(event){
			Element.Events.pinch.active = true;
		};
		gestureChange = function(event){
			event.preventDefault();
			
			isPinch = event.scale > 1.5 || event.scale < 0.5;
			
			if(Element.Events.pinch.active && isPinch)
			{
				Element.Events.pinch.active = false;
				
				fn.call(this, {
					"type": (event.scale > 1) ? "in" : "out",
					"factor": event.scale
				});
			}
		};
		
		this.addEvent('gesturestart', gestureStart);
		this.addEvent('gesturechange', gestureChange);
	}
}


})();