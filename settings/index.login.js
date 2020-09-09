let cloudLib = require("crownstone-cloud")
let cloud = new cloudLib.CrownstoneCloud();

const crownstoneEmailAddress = "martjankoedam42@gmail.com";
const crownstonePassword     = "CrownstoneIntern";

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}



async function run() {
    await cloud.login(crownstoneEmailAddress, crownstonePassword)

    let allCsData = await cloud.crownstones().data();

    let testCrownStone = cloud.crownstoneById(allCsData[1]["id"]);

    await testCrownStone.turnOn();
    sleep(5000);
    await testCrownStone.turnOff();
}
run().catch((e) => { console.log("There was a problem running the code:", e); });