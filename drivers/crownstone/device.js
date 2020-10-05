'use strict';

const Homey = require('homey');
let accessToken;

class CrownstoneDevice extends Homey.Device {
	
	onInit() {
		this.log('MyDevice has been inited');
		this.log('Name:', this.getName());
		this.log('Class:', this.getClass());
		console.log(this.getData().id);
		this.registerCapabilityListener('onoff', this.onCapabilityOnoff.bind(this));
		this.cloud = Homey.app.getCloud();
		accessToken = Homey.app.getUserToken(function(token){accessToken = token;});
	}

	//Switch the Crownstone
	async onCapabilityOnoff( value, opts ) {
		this.log("Change state to " + value);
		if(value){
			await this.cloud.crownstone(this.getData().id).turnOn()
		} else if(!value){
			await this.cloud.crownstone(this.getData().id).turnOff()
		}
		//todo: handle errors
	}

	// this method is called when the Device is added
	onAdded() {
		this.log(this.getName() + " has been added.");
	}

	// this method is called when the Device is deleted
	onDeleted() {
		this.log(this.getName() + " has been deleted.");
	}

}

module.exports = CrownstoneDevice;