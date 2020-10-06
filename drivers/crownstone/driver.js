'use strict';

const Homey = require('homey');
let accessToken;

async function getCurrentLocation(cloud, callback){
	let devices = [];
	cloud.setAccessToken(accessToken);
	let userReference = await cloud.me();
	let userLocation = await userReference.currentLocation();
	if(userLocation.length > 0){
		if(userLocation[0]['inSpheres'].length > 0){
			let sphereId = userLocation[0]['inSpheres'][0]['sphereId'];
			let allCs = await cloud.sphere(sphereId).crownstones();
			for (let i = 0; i < allCs.length; i++){
				console.log('Crownstone ' + i + ' with ID: ' + allCs[i].id + ' and name: ' + allCs[i].name);
					let device = {};
					device['name'] = allCs[i].name;
					device['data'] = allCs[i];
					devices.push(device);
			}
		}
	}
	callback(devices);
}

class CrownstoneDriver extends Homey.Driver {
	
	onInit() {
		this.log('Crownstone driver has been inited');
		this.cloud = Homey.app.getCloud();
		accessToken = Homey.app.getUserToken(function(token){accessToken = token});	//? can it be simplified?
	}
	onPairListDevices(data, callback){
		this.log('Start discovering Crownstones in cloud');
		let value = getCurrentLocation(this.cloud, function(devices){
			callback(null, devices);
		}).catch((e) => { console.log('There was a problem looking for Crownstones in the cloud:', e); });
	}
}

module.exports = CrownstoneDriver;