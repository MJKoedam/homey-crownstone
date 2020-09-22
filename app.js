'use strict';

const Homey = require('homey');
let cloudLib = require("crownstone-cloud")
let cloud = new cloudLib.CrownstoneCloud();
let userToken;

async function login(email, password){
	await cloud.login(email, password);
	let userData = await cloud.me();
	userToken = userData.rest.tokenStore.accessToken;
	console.log("Accesstoken is now defined.");
	console.log("Token: " + userToken);
}

function retrieveAccessToken(callback){
	if(typeof userToken !== "undefined") {
		callback();
	} else {
		setTimeout(function(){
			retrieveAccessToken(callback);}, 50);
	}
}

class CrownstoneApp extends Homey.App {

	onInit() {
		this.log(`App ${Homey.app.manifest.name.en} is running...`);
		this.email = Homey.ManagerSettings.get("email");
		this.password = Homey.ManagerSettings.get("password");
		login(this.email, this.password).catch((e) => { console.log("There was a problem making a connection with the cloud:", e); });

		Homey.ManagerSettings.on('set', function(){
			this.log("Credentials were changed. Creating new cloud instance..");
			this.email = Homey.ManagerSettings.get("email");
			this.password = Homey.ManagerSettings.get("password");
			login(this.email, this.password).catch((e) => { console.log("There was a problem making a connection with the cloud:", e); });
		});
	}

	getUserToken(callback) {
		retrieveAccessToken(function(){
			callback(userToken);
		});
	}
	getCloud(){
		return cloud;
	}
}

module.exports = CrownstoneApp;