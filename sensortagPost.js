// JavaScript source code
'use strict';
var async = require('async');
var SensorTag = require('sensortag');

// Timeout Variables
// Discovering is limited to timeoutVar
var timeoutVar = 60000;
var timeoutID;
var timeoutCleared = true;

// Duplicates allowed -> Reconnect possible
SensorTag.SCAN_DUPLICATES = true;

// For each discovered Tag
function onDiscover(sensorTag) {
  console.log('discovered: ' + sensorTag.uuid + ', type = ' + sensorTag.type);
  stopTimed();

  sensorTag.once('disconnect', function () {
    console.log('Disconnected.');

    if (timeoutCleared) {
      scanTimed();
    }
  });

  sensorTag.connectAndSetup(function () {
    console.log('Connect and setup');
	sensorTag.connectAndSetUp(enableAccelMe);
    sensorTag.readDeviceName(function (error, deviceName) {
      console.log('\tUUID = ' + sensorTag.uuid);
    });
    scanTimed();
  });

  function enableAccelMe() {		// attempt to enable the accelerometer
     console.log('enableAccelerometer');
	sensorTag.setAccelerometerPeriod(250);
     // when you enable the accelerometer, start accelerometer notifications:
     sensorTag.enableAccelerometer(notifyMe);
   }

	function notifyMe() {
   	sensorTag.notifyAccelerometer(listenForAcc);   	// start the accelerometer listener
   }

   // When you get an accelermeter change, print it out:
	function listenForAcc() {
		sensorTag.on('accelerometerChange', function(x, y, z) {
//		console.log(sensorTag.id);
//	     console.log('\tx = %d G', x.toFixed(1));
//	     console.log('\ty = %d G', y.toFixed(1));
//	     console.log('\tz = %d G', z.toFixed(1));
//			 console.log();
var sqrt = require("math-sqrt");
var abs = require("math-abs");
var x = x.toFixed(1);
var y = y.toFixed(1);
var z = z.toFixed(1);
var Acceleration = sqrt(abs(x*x) + abs(y*x) + abs(z*z));
var reset = 1;
if (Acceleration > 0.99 && Acceleration < 1.01) {
	reset = 0;
} 
if (reset == 0) {
console.log("test");
if (Acceleration > 1.3) {

//console.log(sensorTag.id);

var id = sensorTag.id
var sourceIdTag = "text"
	if (id === "b0b448bd0804") {
		sourceIdTag = "SRCID-A";
		console.log(sourceIdTag);
	} else if (id === "b0b448b84905") {
		sourceIdTag = "SCRID-B";
		console.log(sourceIdTag);
	} else if (id === "b0b448bf7282") {
		sourceIdTag = "SCRID-C";
		console.log(sourceIdTag);
	} else if (id === "b0b448beca85") {
		sourceIdTag = "SCRID-D";
		console.log(sourceIdTag);
	} else if (id === "b0b448b85b01") {
		sourceIdTag = "SCRID-E";
		console.log(sourceIdTag);
	} else if (id === "") {
		sourceIdTag = "SCRID-F";
		console.log(sourceIdTag);
	}


console.log(Acceleration);
reset = 1;



const querystring = require('querystring');
const https = require('https');
 
const postData = "{ \"interaction\": \"SAVE\", \"sourceId\": \""+sourceIdTag+"\" }";
 
const options = {
  hostname: 'gateway.-------.com',
  port: 443,
  path: '/prod/',
  method: 'POST',
  headers: {
    'x-api-key': '----------------',
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};
 
const req = https.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
});
 
req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});
 
// write data to request body
console.log(postData);
req.write(postData);
req.end();

}  
}
	   });

	}
}

// Start timed discovering
function scanTimed() {
  console.log('Start discovering');
  timeoutCleared = false;
  SensorTag.discoverAll(onDiscover);
  timeoutID = setTimeout(function () {
    stopTimed();
  }, timeoutVar);
}

//Stop timer and discovering
function stopTimed() {
  SensorTag.stopDiscoverAll(onDiscover);
  timeoutCleared = true;
  console.log('Stop discovering');
  clearTimeout(timeoutID);
}

// Start discovering


scanTimed();
