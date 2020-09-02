'use strict';

const Homey = require('homey');

class MyDriver extends Homey.Driver {
	
	onInit() {
		this.log('Crownstone driver has been inited');
	}
	
}

module.exports = MyDriver;