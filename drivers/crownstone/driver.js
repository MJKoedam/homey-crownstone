'use strict';

const Homey = require('homey');

class CrownstoneDriver extends Homey.Driver {
	
	onInit() {
		this.log('Crownstone driver has been inited');
	}
	
}

module.exports = CrownstoneDriver;