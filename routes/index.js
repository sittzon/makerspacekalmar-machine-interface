const express = require('express');
const router = express.Router();
const rpio = require('rpio');

var rpioptions = {
        gpiomem: false,          /* Use /dev/mem */
        mapping: 'physical',    /* Use the P1-P40 numbering scheme */
        mock: undefined,        /* Emulate specific hardware in mock mode */
}

rpio.init(rpioptions);

var machineNames = ['Svarv', 'Bandsåg', 'Bordsåg', 'CNC-fräs']
var pinsPhysical = [15,16,18,19];
var pinsTimeLeft = [0,0,0,0];

//Decrease timers every second
setInterval(function(){
	for (i = 0; i < pinsTimeLeft.length; ++i) {
		if (pinsTimeLeft[i] > 0) {
			pinsTimeLeft[i]--;
		}
	}
},1000);

//Get machine names and pinsPhysical from DB
var getDbMachineNames = function(req, res, next) {
	console.log('MOCK: Get machine names from DB');
	next();
}

//Read tag
var readTag = function (req, res) {
	console.log('MOCK: Read tag');
	//Read tag, if authorized -> Set selectionMode to on

	//Set output pin
	// rpio.open(pinsPhysical[pinNr], rpio.OUTPUT);
	// rpio.write(pinsPhysical[pinNr], rpio.HIGH);
	// rpio.sleep(20);

	//Set timer
	// pinsTimeLeft[pinNr] = 20;
}

//Start machine and set timer
var startMachine = function (req, res, next) {
	//Set pin to high
	//TODO

	//Set timer to 60s
	var machineId = req.query.machineId;
	pinsTimeLeft[machineId] = 60;
	next();
}

var renderRoot = function (req, res, next) {
	res.render('root', {machineNames: machineNames, pinsTimeLeft: pinsTimeLeft});
}

//Start machine
router.get('/startMachine', [startMachine, renderRoot]);

//Root view, choose machine
router.get('/', [getDbMachineNames, readTag, renderRoot]);

module.exports = router;