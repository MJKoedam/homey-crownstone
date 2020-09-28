'use strict';

const Homey = require('homey');
let accessToken;

async function getCurrentLocation(cloud, callback){
	let devices = [];

	cloud.setAccessToken(accessToken);
	let userReference = await cloud.me();
	console.log(userReference);
	let userLocation = await userReference.currentLocation();
	console.log(userLocation);
	if(userLocation.length > 0){
		if(userLocation[0]['inSpheres'].length > 0){
			let sphereId = userLocation[0]['inSpheres'][0]['sphereId'];
			// console.log(sphereId);
			let allCs = await cloud.sphere(sphereId).crownstones();

			for (let i = 0; i < allCs.length; i++){
				console.log("This is Crownstone " + i + " with ID: " + allCs[i].id + " and name: " + allCs[i].name);
					let device = {};
					device["name"] = allCs[i].name;
					device["data"] = allCs[i];
					devices.push(device);
			}

			//return devices;
			// callback(devices)
		}
	}
	console.log("Time to callback the devices: " + devices);
	callback(devices);
}

class CrownstoneDriver extends Homey.Driver {
	
	onInit() {
		this.log('Crownstone driver has been inited');
		this.cloud = Homey.app.getCloud();
		accessToken = Homey.app.getUserToken(function(token){accessToken = token});	//? can it be simplified?
	}

	onPairListDevices(data, callback){

		let testing = [];
		let finished = false;
		this.log("Start discovering Crownstones in cloud");

		let value = getCurrentLocation(this.cloud, function(devices){
			console.log("getCurrentLocation has returned");
			callback(null, devices);
		});
	}
}

module.exports = CrownstoneDriver;