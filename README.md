Mobile
======

Makes your web applications more touching. Provides a touch event handler that automatically replaces all your click handlers with touch listeners to overcome the click delay on iOS. Requires MooTools Core 1.3.

Build
-----

Build via [Packager](http://github.com/kamicane/packager), requires [MooTools Core](http://github.com/mootools/mootools-core) to be registered to Packager already

	./packager register /path/to/mobile
	./packager build Mobile/* > mobile.js

How To Use
----------

If you include Touch/Touch.js (and dependencies) into your application, all click events will automatically be replaced with touch events.

	myElement.addEvent('click', function(event){
		// on iOS the click handler has been replaced with touchend
		
		// doSomething
	}):

For more information see the included Demo.

Swipe Custom Event
------------------

The file Touch/Swipe.js provides a custom swipe event for your elements

	myElement.addEvent('swipe', function(event){
		event.direction // either 'left' or 'right'

		event.start // {x: Number, y: Number} where the swipe started
		event.end // {x: Number, y: Number} where the swipe ended
	});

Additionally there are some options for swipe events

	myElement.store('swipe:distance', 20); // (defaults to 50) amount of pixels to be moved until swipe is being fired
	myElement.store('swipe:cancelVertical', true); // (defaults to false) Whether to cancel swipes if the user moved vertically

Pinch Custom Event
------------------

The file Touch/Pinch.js provides a custom pinch event for your elements

	myElement.addEvent('pinch', function(event){
		event.pinch // Either 'in' or 'out'
	});

Additionally there is a threshold option for pinch events

	myElement.store('pinch:threshold', 0.4); // (defaults to 0.5) the amount of scaling to be done to fire the pinch event

Browser Information
-------------------

To execute code on browsers with touch events available use Browser/Features.Touch.js

	if (Browser.Features.Touch){
		// This browser definitely has touch events!
	}

Access useful information about the browser environment via Browser/Mobile.js

	Browser.Device // Object added to Browser
	
	Browser.Device.name // ipad / iphone / ipod OR other
	
	Browser.Device.ipad // true if on ipad
	Browser.Device.iphone // true if on iphone
	Browser.Device.ipod // true if on ipod
	
	Browser.hasHighResolution // true on iPhone 4
	
	Browser.isMobile // True on any platform that is not Windows / Linux / Mac

Tips
----

For an optimal experience use the following CSS Styles

	body {
		-webkit-tap-highlight-color: transparent;
	}

In addition to that, because the code uses "document.elementFromPoint", it is wise to set pointer-events to none for elements within click handler elements. Usually "a *" as a selector is sufficient, but it should be applied to any overlaying elements that might get in your way.

	a * {
		pointer-events: none;
	}

ToDo
----

* Click overwrite should probably pass a fake click event (?)
* Add Android support and add useful Android information
* Add webOS support and add useful webOS information
* Remove Chrome 5 fix once Chrome 5 is dead (end of 2010?).