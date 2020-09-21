'use strict';

const Homey = require('homey');

class CrownstoneDriver extends Homey.Driver {
	
	onInit() {
		this.log('Crownstone driver has been inited');
		// this.cloud = Homey.app.getCloud();

		this.log(Homey.app.getUserToken());
		//[TODO: get accesstoken to work in this file]

	}
	onPairListDevices(data, callback){
		this.log("Start discovering Crownstones in cloud");

	}
}

module.exports = CrownstoneDriver;