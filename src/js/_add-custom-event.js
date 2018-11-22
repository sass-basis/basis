'use strict';

export default function addCustomEvent(element, eventName) {
	let event;
	try {
		event = new CustomEvent(eventName);
	} catch(e) {
		event = document.createEvent('CustomEvent');
		event.initCustomEvent(eventName, false, false, null);
	}
	element.dispatchEvent(event);
};
