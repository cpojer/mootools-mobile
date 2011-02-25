Mobile
======

Makes your web applications more touching. Provides custom events and useful browser information for mobile web (application) development. On iOS it provides a touch event handler that automatically replaces all your click handlers with touch events to overcome the ~300ms click delay. Requires MooTools Core 1.3.

![Screenshot](http://cpojer.net/Logo/mobile.png)

This Plugin is part of MooTools [PowerTools!](http://cpojer.net/PowerTools).

* [Build PowerTools!](http://cpojer.net/PowerTools)
* [Fork PowerTools!](https://github.com/cpojer/PowerTools)

Build
-----

Build via [Packager](http://github.com/kamicane/packager), requires [MooTools Core](http://github.com/mootools/mootools-core) and [MooTools Custom Event](http://github.com/cpojer/mootools-custom-event) to be registered to Packager already

	packager register /path/to/mobile
	packager build Mobile/* > mobile.js

To build this plugin without external dependencies use

	packager build Mobile/* +use-only Mobile > mobile.js

Supported Devices
-----------------

Tested and supported are the following devices:

* **iOS**
  * **iPhone 4** with iOS 4.0.2
  * **iPad** with iOS 3.2.2
  * **iPod Touch 2g** with iOS 4.0.1

* **Android** (see Notes)
  * **HTC Magic** with Android 2.2 (Cyanogenmod6): Android Browser, Dolfin HD
  * **Motorola Droid / Milestone** with Android 2.1: Android Browser
  * **Nexus One** with Android 2.2 (Cyanogenmod6): Android Browser
  * **HTC Desire** with Android 2.2: Android Browser
  * **Samsung Galaxy S** with Android 2.1: Android Browser

* Notes (Android)
  * Multitouch in the browser is currently not available on (most?) Android phones.
  * The custom pinch event will not work if the browser has pinch-to-zoom (See Cyanogenmod). It does work on more recent Android models.
  * Dolphin HD slides to the right/left which can be disabled in the settings. Swipe does not work if this setting is enabled. Pinch does not work yet even though the browser has multitouch support. A fix will may be added in the future.
  *  TODO try to fix: Not all Android devices prevent text-selection for the touchhold event.

Note: no other mobile browsers support touch events currently.

How To Use
----------

If you include Touch/Click.js (and dependencies) into your application, all click events will automatically be replaced with touch events.

	myElement.addEvent('click', function(event){
		// on iOS the click handler has been replaced with touchend
		
		// doSomething
	}):

For more information see the included Demo.

Touch Custom Event
------------------

The replacement for click events is optional. If you choose to include Touch/Touch.js (and dependencies) without Click.js, your click event listeners will stay untouched and you get a custom 'touch' event instead.

	myElement.addEvent('touch', function(event){
		// Now this only does work on devices with touch support
	});

The requirement for the touch and click events to fire is to start and end the touch on the same element.

Swipe Custom Event
------------------

The file Touch/Swipe.js provides a custom swipe event for your elements. Only works for 'left' and 'right' as moving up and down is reserved for scrolling.

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

Touchhold Custom Event
----------------------

The file Touch/Touchhold.js provides a custom touchhold event for your elements

	myElement.addEvent('touchhold', function(event){
		// Touchhold fired
	});

Additionally there is delay option for touchhold events

	myElement.store('touchhold:delay', 1000); // (defaults to 750) the amount of time in ms to wait until the touchhold event gets fired

Browser Information
-------------------

To support "touchhold" and "swipe" on desktop devices without touch input you can include Desktop/Mouse.js. It maps mouse* events to touch* events.

To execute code on browsers with touch events available use Browser/Features.Touch.js

	if (Browser.Features.Touch){
		// This browser has touch events!
	}

Note that Chrome 5 reports to support touch events. This behavior has been fixed in Chrome 6 at least when no touch input devices are available. The "iOSTouch" property is only true on more sophisticated platforms such as mobile safari. This property is useful to detect whether click events should be replaced with touch events on iOS. You shouldn't need to access this property, but you may find it useful.

	if (Browser.Features.iOSTouch){
		// This browser has touch events 
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

For elements with touch events use

	#myElement {
		-webkit-user-select: none;
	}

In addition to that, because the code uses "document.elementFromPoint", it is wise to set pointer-events to none for elements within click handler elements. Usually "a *" as a selector is sufficient, but it should be applied to any overlaying elements that might get in your way.

	a * {
		pointer-events: none;
	}

Also, to prevent moving the whole page in iOS you can add this script

	document.addEvent('touchmove', function(event){
		event.preventDefault();
	});

ToDo
----

* Click overwrite should probably pass a fake click event (?)
* Add useful Android information
* Add webOS support and add useful webOS information