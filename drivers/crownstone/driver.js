'use strict';

const Homey = require('homey');
let accessToken;

async function getCurrentLocation(cloud, existingDevices, callback){
	let devices = [];
	cloud.setAccessToken(accessToken);
	let userReference = await cloud.me();
	let userLocation = await userReference.currentLocation();
	if(userLocation.length > 0){
		if(userLocation[0]['inSpheres'].length > 0){
			let sphereId = userLocation[0]['inSpheres'][0]['sphereId'];	// get sphere closest to the user
			let allCs = await cloud.sphere(sphereId).crownstones();
			for (let i = 0; i < allCs.length; i++){
				console.log('Crownstone ' + i + ' with ID: ' + allCs[i].id + ' and name: ' + allCs[i].name);

				/**
				 * The next piece code is temporarily required to prevent a bug on the Homey which lets you add devices multiple times.
				 */
				let duplicate = false;
				for (let j = 0; j < existingDevices.length; j++){
					if(existingDevices[j].getData().id == allCs[i].id){
						duplicate = true;
						console.log(allCs[i].name + ' already exists!');
					}
				}
				if(!duplicate){
					let device = {};
					device['name'] = allCs[i].name;
					device['data'] = allCs[i];
					devices.push(device);
				}
			}
		} else {
			this.log('No sphere found')
		}
	} else {
		this.log('No userlocation found');
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
		getCurrentLocation(this.cloud, this.getDevices(), function(devices){
			callback(null, devices);
		}).catch((e) => { console.log('There was a problem looking for Crownstones in the cloud:', e); });
	}
}

module.exports = CrownstoneDriver;