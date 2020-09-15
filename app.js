'use strict';

const Homey = require('homey');
let cloudLib = require("crownstone-cloud")
let cloud = new cloudLib.CrownstoneCloud();

async function login(CrownstoneUsername, CrownstonePassword){
	await cloud.login(CrownstoneUsername, CrownstonePassword);
	console.log(await cloud.me().data());

	let idFilter = '5f4f69a6145e6e0004f60f0d';
	let dataFromId = await cloud.crownstone(idFilter).data();
	let leds = cloud.crownstone('5f4f69a6145e6e0004f60f0d');
	await leds.turnOn();
	sleep(5000);
	await leds.turnOff();
}

function sleep(milliseconds) {
	const date = Date.now();
	let currentDate = null;
	do {
		currentDate = Date.now();
	} while (currentDate - date < milliseconds);
}

class MyApp extends Homey.App {
	
	onInit() {
		this.log(`App ${Homey.app.manifest.name.en} is running...`);

		this.email = Homey.ManagerSettings.get("email");
		this.password = Homey.ManagerSettings.get("password");

		login(this.email, this.password).catch((e) => { console.log("There was a problem running this code:", e); });
	}

}

module.exports = MyApp;