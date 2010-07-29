/*
---

name: Pinch

description: Provides a custom pinch event for touch devices

authors: Christopher Beloch (@C_BHole), Christoph Pojer (@cpojer), Ian Collins (@3n)

license: MIT-style license.

requires: [Core/Element.Events, Browser.Features.Touch]

provides: Pinch

...
*/

if (Browser.Features.Touch) (function(){

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
};

})();