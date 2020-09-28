'use strict';

const Homey = require('homey');

class MyDevice extends Homey.Device {
	
	onInit() {
		this.log('MyDevice has been inited');
		this.log('Name:', this.getName());
		this.log('Class:', this.getClass());

		this.registerCapabilityListener('onoff', this.onCapabilityOnoff.bind(this));
	}

	async onCapabilityOnoff( value, opts ) {

		// ... set value to real device, e.g.
		// await setMyDeviceState({ on: value });

		// or, throw an error
		// throw new Error('Switching the device failed!');
	}

}