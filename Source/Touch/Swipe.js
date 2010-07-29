/*
---

name: Swipe

description: Provides a custom swipe event for touch devices

authors: Christopher Beloch (@C_BHole), Christoph Pojer (@cpojer), Ian Collins (@3n)

license: MIT-style license.

requires: [Core/Element.Events, Browser.Features.Touch]

provides: Swipe

...
*/

if (Browser.Features.Touch) (function(){

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

})();