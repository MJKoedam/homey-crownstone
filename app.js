'use strict';

const Homey = require('homey');
let cloudLib = require("crownstone-cloud")
let cloud = new cloudLib.CrownstoneCloud();

async function login(email, password){
	await cloud.login(email, password);
	console.log(await cloud.me().data());

	// let idFilter = '5f4f69a6145e6e0004f60f0d';
	// let dataFromId = await cloud.crownstone(idFilter).data();
	// let light = cloud.crownstone('5f4f69a6145e6e0004f60f0d');
	// await light.turnOn();
	// sleep(5000);
	// await light.turnOff();
}

class MyApp extends Homey.App {

	onInit() {
		this.log(`App ${Homey.app.manifest.name.en} is running...`);

		this.email = Homey.ManagerSettings.get("email");
		this.password = Homey.ManagerSettings.get("password");

		Homey.ManagerSettings.on('set', function(){
			this.log("App Settings Were Changed! New credentials!");
			this.email = Homey.ManagerSettings.get("email");
			this.password = Homey.ManagerSettings.get("password");
			login(this.email, this.password).catch((e) => { console.log("There was a problem running this code:", e); });
		});

		login(this.email, this.password).catch((e) => { console.log("There was a problem running this code:", e); });
	}

}

function sleep(milliseconds) {
	const date = Date.now();
	let currentDate = null;
	do {
		currentDate = Date.now();
	} while (currentDate - date < milliseconds);
}

module.exports = MyApp;