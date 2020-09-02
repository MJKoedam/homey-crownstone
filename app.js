'use strict';

const Homey = require('homey');

class MyApp extends Homey.App {
	
	onInit() {
		this.log('The Crownstone app beta from M-J is running...');
	}
	
}

module.exports = MyApp;