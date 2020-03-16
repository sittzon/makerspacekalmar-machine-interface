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
var pinsPhysicalStatus = [0,0,0,0];
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
	var pinNr = req.query.pinNr;
	//Read tag, if authorized: Set correct pin and timer

	//Set output pin
	rpio.open(pinsPhysical[pinNr], rpio.OUTPUT);
	rpio.write(pinsPhysical[pinNr], rpio.HIGH);
	rpio.sleep(20);

	//Set timer
	pinsTimeLeft[pinNr] = 20;
}

//Read pinsPhysical
var readPinsPhysical = function (req, res, next) {
	console.log('Reading pinsPhysicalStatus')
	for (i = 0; i < pinsPhysical.length; ++i) {
		rpio.open(pinsPhysical[i], rpio.INPUT);
		pinsPhysicalStatus[i] = rpio.read(pinsPhysical[i]);
	}
	next();
}

//Tag swipe view
var renderSwipeTag = function (req, res, next) {
	res.render('swipeTag');
	next();
}

var renderRoot = function (req, res, next) {
	res.render('root', {machineNames: machineNames, pinStatus: pinsPhysicalStatus, pinsTimeLeft: pinsTimeLeft});
}

//Swipe tag view
router.get('/swipeTag', [renderSwipeTag, readTag]);

//Root view, choose machine
router.get('/', [getDbMachineNames, readPinsPhysical, renderRoot]);

module.exports = router;